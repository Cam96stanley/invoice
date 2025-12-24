const authService = require('../services/auth');

exports.signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const result = await authService.signup({ email, password, name });
    res.status(201).json({
      message: 'User signed up successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.confirmSignup = async (req, res) => {
  const { email, code } = req.body;

  try {
    const result = await authService.confirmSignup({ email, code });
    res.status(200).json({
      message: 'User confirmed and saved to DB',
      data: result,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authService.login({ email, password });
    res.status(200).json({ message: 'Login successful', data: result });
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'You are not logged in' });
    }

    const result = await authService.logout({ refreshToken });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error logging out', error: err });
  }
};
