const jwt = require('jsonwebtoken');
const axios = require('axios');
const jwkToPem = require('jwk-to-pem');

let pemsCache = null;

const getPems = async () => {
  if (pemsCache) return pemsCache;

  const url = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_POOL_ID}/.well-known/jwks.json`;

  const { data } = await axios.get(url);

  const pems = {};
  data.keys.array.forEach((key) => {
    pems[key.kid] = jwkToPem(key);
  });

  pemsCache = pems;
  return pems;
};

module.exports = async function auth(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const pems = await getPems();
    const pem = pems[decoded.header.kid];

    if (!pem) {
      return res.status(401).json({ message: 'Invalid token signature' });
    }

    jwt.verify(token, pem, (err, payload) => {
      if (err) {
        return res.status(401).json({ message: 'Token verification failed' });
      }

      req.user = payload;
      next();
    });
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res
      .status(500)
      .json({ message: 'Authorization error', error: err.message });
  }
};
