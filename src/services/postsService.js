const { Op } = require('sequelize');
const { BlogPost, Category } = require('../models');
const { AppError } = require('../errors/AppError');

const create = async ({ title, content, categoryIds, userId }) => {
  const props = { title, content, categoryIds };
  Object.entries(props).forEach(([key, value]) => {
    if (!value) {
      throw new AppError(400, `"${key}" is required`);
    }
  });

  const findCategories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  if (findCategories.length < categoryIds.length) {
    throw new AppError(400, '"categoryIds" not found');
  }

  const { id } = await BlogPost.create({ title, content, userId });
  return { id, title, content, userId };
};

module.exports = { create };
