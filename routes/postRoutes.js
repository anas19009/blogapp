

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const  authenticateUser  = require('../middleware/authentication');

router.post('/', authenticateUser, postController.createPost);
router.get('/', authenticateUser, postController.getAllPosts);
router.get('/:id', authenticateUser, postController.findPostByTitle);
router.put('/:id', authenticateUser, postController.updatePost);
router.delete('/:id', authenticateUser, postController.deletePost);

module.exports = router;
