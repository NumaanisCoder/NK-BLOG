const express = require('express');
const { createBlog, getAllBlogs } = require('../controller/blogController');
const { isAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.route('/createblog').post(isAuthenticated,createBlog);
router.route('/getAllBlogs').get(isAuthenticated,getAllBlogs);

module.exports = router;