const express = require('express');
const { homecontent } = require('../controller/blogController');
const { createUser, login, userprofile, logout, loginByToken, sendOtp, VerifyUser, updateUserPassword } = require('../controller/userController');

const router = express.Router();

// router.route('/').post(homecontent);
router.route('/signup').post(createUser);
router.route('/login').post(login);
router.route('/user/:id').get(userprofile);
router.route('/logout').get(logout);
router.route('/userbytoken/:token').get(loginByToken);
router.route('/user/resetpassword').post(sendOtp);
router.route('/user/verify/:token').get(VerifyUser);
router.route('/user/updatepassword/:token').get(updateUserPassword);






module.exports = router;