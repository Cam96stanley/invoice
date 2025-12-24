const { User } = require('../models/Associations');

exports.findAll = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.getMe = async (cognitoSub) => {
  try {
    const user = await User.findOne({
      where: { id: cognitoSub },
      include: [
        {
          association: 'invoices',
          include: 'items',
        },
      ],
    });
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
