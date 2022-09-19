const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const { signUp, ValidateEmail, signIn, signout } = require('../../controllers/User/user_auth');

router.post('/user/auth/signup',[
    check('name',"Name Should be 3 Length Long").isLength({min:3}),
    check('email',"Email is Required").isEmail(),
    check('password',"Password Must be 3 Charater Long").isLength({min:3}),
    check("Phone_no","Phone no is Required")
],signUp);

router.post('/user/auth/signin',[
    check('email',"Email is Required").isEmail(),
    check('password',"Password Must be 3 Charater Long").isLength({min:3}),
],signIn)

router.get('/auth/signout',signout);
router.get('/user/verify/:id/:token',ValidateEmail);

module.exports = router;