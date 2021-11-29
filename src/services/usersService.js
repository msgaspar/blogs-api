const jwt = require('jsonwebtoken');
const { User } = require('../models');

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
  const user = await User.create({ displayName, email, password, image });
  
  return generateToken(user.email);
};

const login = async ({ email, _password }) => {
  const user = await User.findOne({ where: { email } });
  return generateToken(user.email);
};

module.exports = { create, login };