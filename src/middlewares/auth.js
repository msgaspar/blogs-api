const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { getByEmail } = require('../services/usersService');
const { AppError } = require('../errors/AppError');

const jwtSecret = 'EF8D6AC8B1F8129D7770F94D71749D85';

const authMiddleware = rescue(async (request, _response, next) => {
  const token = request.headers.authorization;

  if (!token) {
    throw new AppError(401, 'Token not found');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new AppError(401, 'Expired or invalid token');
  }

  console.log(decoded);

  const user = await getByEmail(decoded.data.email);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  request.user = user;

  next();
});

module.exports = { authMiddleware };
