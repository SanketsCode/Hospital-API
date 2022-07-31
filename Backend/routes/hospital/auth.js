
const express = require('express');
const {check} = require('express-validator');
const { Hospital_SignIn, Hospital_SignUp, ValidateEmail } = require('../../controller/Hospital/auth');
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

router.get('/hospital/verify/:id/:token',ValidateEmail);

module.exports = router;