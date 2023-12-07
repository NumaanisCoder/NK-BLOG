const express = require('express');
const { createUser, login, userprofile, logout, loginByToken, sendOtp, VerifyUser, updateUserPassword, verify_otp, resendOTPFunc } = require('../controller/userController');

const router = express.Router();

// router.route('/').post(homecontent);
router.route('/signup').post(createUser);
router.route('/login').post(login);
router.route('/user/:id').get(userprofile);
router.route('/logout').get(logout);
router.route('/userbytoken/:token').get(loginByToken);
router.route('/user/verify/:token').get(VerifyUser);
router.route('/user/updatepassword/:token').post(updateUserPassword);
router.route('/verifyotp/:Emailtoken').post(verify_otp);
router.route('/resendotp/:Emailtoken').post(resendOTPFunc);
router.route('/user/resetpassword').post(sendOtp); 

module.exports = router;