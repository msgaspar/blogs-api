const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');
const { AppError } = require('../errors/AppError');
const { validateUpdatePostInputs } = require('../utils/validation');

const includeOptions = [
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
];

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
    include: includeOptions,
  });

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: includeOptions,
  });

  if (!post) throw new AppError(404, 'Post does not exist');

  return post;
};

const update = async ({ title, content, categoryIds, userId, postId }) => {
  validateUpdatePostInputs({ title, content, categoryIds });

  const findPost = await BlogPost.findByPk(postId);
  if (!findPost) throw new AppError(404, 'Post not found');
  if (findPost.userId !== userId) throw new AppError(401, 'Unauthorized user');

  await BlogPost.update({ title, content }, { where: { id: postId } });
  return getById(postId);
};

const deletePost = async ({ postId, userId }) => {
  const findPost = await BlogPost.findByPk(postId);
  if (!findPost) throw new AppError(404, 'Post does not exist');
  if (findPost.userId !== userId) throw new AppError(401, 'Unauthorized user');

  await BlogPost.destroy({ where: { id: postId } });
};

const search = async ({ searchText }) =>
  BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.substring]: searchText } },
        { content: { [Op.substring]: searchText } },
      ],
    },
    include: includeOptions,
  });

module.exports = { create, listAll, getById, update, deletePost, search };
