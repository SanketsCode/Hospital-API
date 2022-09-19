const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const { Hospital_Signup,ValidationEmail,Hospital_SignIn } = require('../../controllers/Hospital/auth');
const { signout } = require('../../controllers/User/user_auth');


router.post('/hospital/auth/signup',[
    check('name',"Name Should be 3 Length Long").isLength({min:3}),
    check('email',"Email is Required").isEmail(),
    check('password',"Password Must be 3 Charater Long").isLength({min:3})
],Hospital_Signup);

router.post('/hospital/auth/signin',[
    check('email',"Email is Required").isEmail(),
    check('password',"Password Must be 3 Charater Long").isLength({min:3}),
],Hospital_SignIn)

router.get('/auth/signout',signout);
router.get('/hospital/verify/:id/:token',ValidationEmail);

module.exports = router;