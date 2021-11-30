const { Router } = require('express');

const usersController = require('./controllers/usersController');
const categoriesController = require('./controllers/categoriesController');
const postsController = require('./controllers/postsController');
const { authMiddleware } = require('./middlewares/auth');

const router = Router();

router.post('/user', usersController.create);
router.post('/login', usersController.login);
router.get('/user', authMiddleware, usersController.list);
router.get('/user/:id', authMiddleware, usersController.getById);
router.post('/categories', authMiddleware, categoriesController.create);
router.get('/categories', authMiddleware, categoriesController.list);
router.post('/post', authMiddleware, postsController.create);
router.get('/post', authMiddleware, postsController.list);
router.get('/post/search', authMiddleware, postsController.search);
router.get('/post/:id', authMiddleware, postsController.getById);
router.put('/post/:id', authMiddleware, postsController.update);
router.delete('/post/:id', authMiddleware, postsController.deletePost);
router.delete('/user/me', authMiddleware, usersController.deleteUser);

module.exports = router;
