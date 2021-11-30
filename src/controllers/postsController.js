const rescue = require('express-rescue');
const postsService = require('../services/postsService');

const create = rescue(async (request, response) => {
  const { title, content, categoryIds } = request.body;
  const { id } = request.user;
  const post = await postsService.create({ title, content, categoryIds, userId: id });
  response.status(201).send(post);
});

const list = rescue(async (_request, response) => {
  const posts = await postsService.listAll();
  response.status(200).json(posts);
});

const getById = rescue(async (request, response) => {
  const { id } = request.params;
  const post = await postsService.getById(id);
  response.status(200).json(post);
});

const update = rescue(async (request, response) => {
  const { title, content, categoryIds } = request.body;
  const { id: postId } = request.params;
  const { id: userId } = request.user;
  const updatedPost = await postsService.update({
    title,
    content,
    categoryIds,
    postId,
    userId,
  });
  response.status(200).json(updatedPost);
});

const deletePost = rescue(async (request, response) => {
  const { id: postId } = request.params;
  const { id: userId } = request.user;
  await postsService.deletePost({ postId, userId });
  response.status(204).send();
});

const search = rescue(async (request, response) => {
  const { q } = request.query;
  const results = await postsService.search({ searchText: q });
  response.status(200).json(results);
});

module.exports = { create, list, getById, update, deletePost, search };
