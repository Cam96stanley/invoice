const userService = require('../services/user');

exports.findAllUsers = async (req, res) => {
  try {
    const response = await userService.findAll();
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const cognitoSub = req.user.sub;

    const user = await userService.getMe(cognitoSub);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
