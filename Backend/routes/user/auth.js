const express = require('express');
const { signUp, signIn,signout, ValidateEmail} = require('../../controller/User/user_auth');
const router = express.Router();
const {check} = require('express-validator');


router.post('/user/auth/signup',[
    check("name","name should be at least 3 Characters").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should be at least 3 char").isLength({min:3})
],signUp);
router.post('/user/auth/signin',[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min:1})
],signIn);

router.get('/auth/signout',signout);
router.get('/user/verify/:id/:token',ValidateEmail);

module.exports = router;
