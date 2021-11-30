const rescue = require('express-rescue');
const { decode } = require('../utils/jwt');
const { getByEmail } = require('../services/usersService');
const { AppError } = require('../errors/AppError');

const authMiddleware = rescue(async (request, _response, next) => {
  const token = request.headers.authorization;

  if (!token) {
    throw new AppError(401, 'Token not found');
  }

  let user;
  try {
    const decoded = decode(token);
    user = await getByEmail(decoded.data.email);
  } catch (err) {
    throw new AppError(401, 'Expired or invalid token');
  }

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  request.user = user;

  next();
});

module.exports = { authMiddleware };
