const express = require('express');
const { getPosts, createPost } = require('../controllers/postController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, getPosts);
router.post('/', authenticate, createPost);

module.exports = router;
