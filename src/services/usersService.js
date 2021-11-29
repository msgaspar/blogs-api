const { AppError } = require('../errors/AppError');
const { validatePassword, validateEmail, validateDisplayName } = require('../utils/validation');
const { generateToken } = require('../utils/jwt');
const { User } = require('../models');

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
  validateEmail(email);
  validatePassword(password);

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new AppError(400, 'Invalid fields');
  }

  return generateToken(user.email);
};

module.exports = { create, login };