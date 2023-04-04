const express = require('express');
const { createBlog, getAllBlogs } = require('../controller/blogController');
const { isAuthenticated } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.route('/createblog').post(isAuthenticated,upload.single("file"),createBlog);
router.route('/getAllBlogs').get(isAuthenticated,getAllBlogs);

module.exports = router;