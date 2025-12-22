require('dotenv').config();
const { SignUpCommand } = require('@aws-sdk/client-cognito-identity-provider');
const cognitoClient = require('../config/cognito');

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
