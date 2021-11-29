const jwt = require('jsonwebtoken');
const { AppError } = require('../errors/AppError');
const { User } = require('../models');

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email === undefined) {
    throw new AppError(400, '"email" is required');
  } 
  if (email === '') {
    throw new AppError(400, '"email" is not allowed to be empty');
  } 
  if (!regex.test(email)) {
    throw new AppError(400, '"email" must be a valid email');
  }
};

const validateDisplayName = (displayName) => {
  if (displayName.length < 8) {
    throw new AppError(400, '"displayName" length must be at least 8 characters long');
  }
};

const validatePassword = (password) => {
  if (password === undefined) {
    throw new AppError(400, '"password" is required');
  }
  if (password === '') {
    throw new AppError(400, '"password" is not allowed to be empty');
  }
  if (password.length < 6) {
    throw new AppError(400, '"password" length must be 6 characters long');
  }
};

const generateToken = (email) => {
  const jwtSecret = 'EF8D6AC8B1F8129D7770F94D71749D85';
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: email }, jwtSecret, jwtConfig);
  return token;
};

const create = async ({ displayName, email, password, image }) => {
  validateDisplayName(displayName);
  validateEmail(email);
  validatePassword(password);

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    throw new AppError(409, 'User already registered');
  }

  const user = await User.create({ displayName, email, password, image });
  
  return generateToken(user.email);
};

const login = async ({ email, password }) => {
  console.log(`${email}, ${password}`);
  validateEmail(email);
  validatePassword(password);

  const user = await User.findOne({ where: { email } });

  console.log(user);

  if (!user) {
    throw new AppError(400, 'Invalid fields');
  }

  return generateToken(user.email);
};

module.exports = { create, login };