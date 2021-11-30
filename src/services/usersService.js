const { AppError } = require('../errors/AppError');
const {
  validatePassword,
  validateEmail,
  validateDisplayName,
} = require('../utils/validation');
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

const listAll = async () =>
  User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });

const getByEmail = async (email) => {
  const { dataValues } = await User.findOne({ where: { email } });
  return dataValues;
};

const getById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  if (!user) {
    throw new AppError(404, 'User does not exist');
  }
  return user;
};

const deleteUser = (id) => User.destroy({ where: { id } });

module.exports = { create, login, listAll, getByEmail, getById, deleteUser };
