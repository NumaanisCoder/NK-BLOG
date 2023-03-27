const express = require('express');
const { homecontent } = require('../controller/blogController');
const { createUser, login, userprofile, logout } = require('../controller/userController');

const router = express.Router();

router.route('/').post(homecontent);
router.route('/signup').post(createUser);
router.route('/login').post(login);
router.route('/user/:id').get(userprofile);
router.route('/logout').get(logout);





module.exports = router;