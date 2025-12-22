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
