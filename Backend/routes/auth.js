const express = require('express');
const {check} = require('express-validator');
const { Hospital_SignUp, Hospital_SignIn, signout, User_SignUp, User_SignIn } = require('../controller/auth');
const router = express.Router();


//hospital auth routes
router.post('/hospital/auth/signup',[
    check("name","name should be at least 3 Characters").isLength({min:6}),
    check("email","email is required").isEmail(),
    check("password","password should be at least 3 char").isLength({min:6})
],Hospital_SignUp);


router.post('/hospital/auth/signin',[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min:1})
],Hospital_SignIn);

//User auth routes
router.post('/user/auth/signup',[
    check("name","name should be at least 3 Characters").isLength({min:6}),
    check("email","email is required").isEmail(),
    check("password","password should be at least 3 char").isLength({min:6})
],User_SignUp);


router.post('/user/auth/signin',[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min:1})
],User_SignIn);


//sign out route
router.get('/auth/signout',signout);


module.exports = router;