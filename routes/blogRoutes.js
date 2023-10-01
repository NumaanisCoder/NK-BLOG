const express = require('express');
const { createBlog, getAllBlogs, getUserBlogs, deleteUserBlog, updateUserBlog, getSingleBlog, homecontent, getSingleBlogByTitle } = require('../controller/blogController');
const { isAuthenticated } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});


const router = express.Router();

router.route('/createblog/:token').post(upload.single('image'),createBlog);
router.route('/getAllBlogs').get(isAuthenticated,getAllBlogs);
router.route('/userblogs/:token').get(getUserBlogs);
router.route('/userblogs/delete/:id').delete(deleteUserBlog);
router.route('/userblogs/update/:id').put(upload.single('image'),updateUserBlog);
router.route('/blog/:title').post(getSingleBlogByTitle); 
router.route('/blog/query').post(homecontent);

module.exports = router;