const express = require('express');
const { createUser, login, userprofile, logout } = require('../controller/userController');

const router = express.Router();

router.route('/signup').post(createUser);
router.route('/login').post(login);
router.route('/user/').get(userprofile);
router.route('/logout').get(logout);





module.exports = router;