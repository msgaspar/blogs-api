const rescue = require('express-rescue');
const categoriesService = require('../services/categoriesService');

const create = rescue(async (request, response) => {
  const { name } = request.body;
  const category = await categoriesService.create({ name });
  response.status(201).send(category);
});

module.exports = { create };
