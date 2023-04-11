const express = require('express');
const { createBlog, getAllBlogs, getUserBlogs, deleteUserBlog, updateUserBlog } = require('../controller/blogController');
const { isAuthenticated } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.route('/createblog/:token').post(isAuthenticated,upload.single("file"),createBlog);
router.route('/getAllBlogs').get(isAuthenticated,getAllBlogs);
router.route('/userblogs/:token').get(getUserBlogs);
router.route('/userblogs/delete/:id').delete(deleteUserBlog);
router.route('/userblogs/update/:id').put(updateUserBlog);

module.exports = router;