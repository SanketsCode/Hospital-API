const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {expressjwt:expressJwt} = require('express-jwt');
const Hospital = require('../models/hospital');
const User = require('../models/user');



//sign up controller for hospital
const Hospital_SignUp = (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({error:errors.array()[0].msg});
    }

    const hospital = new Hospital(req.body);
    hospital.save((err,hospital) => {
        if(err){
            return res.status(400).json({
                error:"Problem to Save in DB"
            });
        }

        res.json({
            name:hospital.name,
            email:hospital.email,
            address:hospital.address
        });
    })
}


//sign up controller for user
const User_SignUp = (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({error:errors.array()[0].msg});
    }

    const user = new User(req.body);
    user.save((err,user) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                error:"Problem to Save in DB"
            });
        }

        res.json({
            name:user.name,
            email:user.email,
            address:user.address
        });
    })
}

//sign IN

//hospital
const Hospital_SignIn = (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({error:errors.array()[0].msg});
    }

    const {email,password} = req.body;

    Hospital.findOne({email},(err,hospital) => {
        if(err || !hospital){
            return res.status(401).json({
                error:"Email does not exists"
            });
        }

        if(!hospital.autheticate(password)){
            return res.status(401).json({
                error:"Email and Password do not match"
            });
        }

        //create token
        const token = jwt.sign({_id:hospital._id},process.env.SECRET);
        //put token in cookie
        res.cookie("token",token,{expire:new Date() + 9999});

        //send response to front end
        const {_id,name,email} = hospital;
        return res.json({token,hospital:{_id,name,email}});

    })
}

//user
const User_SignIn = (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({error:errors.array()[0].msg});
    }

    const {email,password} = req.body;

    User.findOne({email},(err,user) => {
        if(err || !user){
            return res.status(401).json({
                error:"Email does not exists"
            });
        }

        if(!user.autheticate(password)){
            return res.status(401).json({
                error:"Email and Password do not match"
            });
        }

        //create token
        const token = jwt.sign({_id:user._id},process.env.SECRET);
        //put token in cookie
        res.cookie("token",token,{expire:new Date() + 9999});

        //send response to front end
        const {_id,name,email} = user;
        return res.json({token,user:{_id,name,email}});

    })
}

//sign out for both
const signout = (req,res) => {
    res.clearCookie("token");
    return res.json({
        msg : "User sign out successfully"
    })
}


//protected routes
const isSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    userProperty : "auth"
})

//checking for authication for hospital
const isAuthenticated = (req,res,next) => {   
    let checker = req.auth;
    if(!checker){
        return res.status(403).json({
            error :"Access denide"
        })
    }
    next();
}



//checking for authentication for user

module.exports = {signout,Hospital_SignIn,Hospital_SignUp,isSignedIn,isAuthenticated,User_SignIn,User_SignUp};
