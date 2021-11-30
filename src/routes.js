const { Router } = require('express');

const usersController = require('./controllers/usersController');
const { authMiddleware } = require('./middlewares/auth');

const router = Router();

router.post('/user', usersController.create);
router.post('/login', usersController.login);
router.get('/user', authMiddleware, usersController.list);
router.get('/user/:id', () => {});
router.post('/categories', () => {});
router.get('/categories', () => {});
router.post('/post', () => {});
router.get('/post', () => {});
router.get('/post/:id', () => {});
router.put('/post/:id', () => {});
router.delete('/post/:id', () => {});
router.delete('/user/me', () => {});
router.get('/post/search', () => {});

module.exports = router;
