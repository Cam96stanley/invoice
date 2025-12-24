require('dotenv').config();
const {
  SignUpCommand,
  ConfirmSignUpCommand,
  AdminGetUserCommand,
  InitiateAuthCommand,
  RevokeTokenCommand,
} = require('@aws-sdk/client-cognito-identity-provider');
const cognitoClient = require('../config/cognito');
const { User } = require('../models/Associations');

exports.signup = async ({ email, password, name }) => {
  const params = {
    ClientId: process.env.AWS_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'name', Value: name },
    ],
  };

  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    return response;
  } catch (err) {
    console.error('Error signing up:', err);
    throw err;
  }
};

exports.confirmSignup = async ({ email, code }) => {
  const confirmParams = {
    ClientId: process.env.AWS_CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
  };

  try {
    await cognitoClient.send(new ConfirmSignUpCommand(confirmParams));

    const getUserParams = {
      Username: email,
      UserPoolId: process.env.AWS_POOL_ID,
    };
    const userData = await cognitoClient.send(
      new AdminGetUserCommand(getUserParams)
    );

    const nameAttr = userData.UserAttributes.find(
      (attr) => attr.Name === 'name'
    );
    const name = nameAttr ? nameAttr.Value : email.split('@')[0];

    const newUser = await User.create({ email, name });

    return newUser;
  } catch (err) {
    console.error('Error confirming signup:', err);
    throw err;
  }
};

exports.login = async ({ email, password }) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.AWS_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await cognitoClient.send(command);

    const user = await User.findOne({ where: { email } });

    return {
      cognito: response,
      user,
    };
  } catch (err) {
    console.error('Error logging in:', err);
    throw err;
  }
};

exports.refresh = async ({ refreshToken }) => {
  const command = new InitiateAuthCommand({
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: process.env.AWS_CLIENT_ID,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  });

  return await cognito.send(command);
};

exports.logout = async ({ refreshToken }) => {
  try {
    const command = new RevokeTokenCommand({
      ClientId: process.env.AWS_CLIENT_ID,
      Token: refreshToken,
    });

    await cognito.send(command);

    return { message: 'Logged out successfully' };
  } catch (err) {
    console.error('Error logging out:', err);
    throw err;
  }
};
