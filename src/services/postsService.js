const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');
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

const listAll = async () =>
  BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });

  if (!post) throw new AppError(404, 'Post does not exist');

  return post;
};

module.exports = { create, listAll, getById };
