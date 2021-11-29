const rescue = require('express-rescue');
const usersService = require('../services/usersService');

const create = rescue(async (request, response) => {
  const { displayName, email, password, image } = request.body;
  const token = await usersService.create({ displayName, email, password, image });
  response.status(201).send({ token });
});

const login = rescue(async (request, response) => {
  const { email, password } = request.body;
  const token = await usersService.login({ email, password });
  response.status(200).json({ token });
});

module.exports = { create, login };