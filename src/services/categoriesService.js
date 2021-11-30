const { AppError } = require('../errors/AppError');
const { Category } = require('../models');

const create = async ({ name }) => {
  if (!name) {
    throw new AppError(400, '"name" is required');
  }
  const { id } = await Category.create({ name });
  return { id, name };
};

const listAll = async () => Category.findAll({ attributes: ['id', 'name'] });

module.exports = { create, listAll };
