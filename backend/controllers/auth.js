const authService = require('../services/auth');

exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

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
  try {
    const { email, code } = req.body;

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
  try {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });
    res.status(200).json({ message: 'Login successful', data: result });
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ error: err.message });
  }
};

exports.refresh = (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    const tokens = authService.refresh(refreshToken);

    return res.status(200).json({
      message: 'Token refreshed successfully',
      ...tokens,
    });
  } catch (err) {
    console.error('Error refreshing token:', err);
    return res.status(500).json({
      message: 'Failed to refresh token',
      error: err.message || err,
    });
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
