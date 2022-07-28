const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const {expressjwt:expressJwt} = require('express-jwt');


const signUp = (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({error:errors.array()[0].msg});
    }

    const user = new User(req.body);
    user.save((err,user) => { 
        if(err){
            return res.status(400).json({
                error:"Invalid data Please fill Again"
            });
        }
        res.json({
            name:user.name,
            email:user.email,
            id:user._id
        });
    })
}

const signIn = (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({error:errors.array()[0].msg});
    }

    const {email,password} = req.body;

    User.findOne({email},(err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User Email does not exists"
            })
        }

        if(!user.autheticate(password)){
            return res.status(401).json({
                error:"Email and Password do not match"
            })
        }

        //create token
        const token = jwt.sign({_id:user._id},process.env.SECRET)
        //put token in Cookie
        res.cookie("token",token,{expire:new Date() + 9999});

        //send response to front end
        const {_id,name,email,role} = user;
        return res.json({token,user:{_id,name,email,role}});

    })
}

const signout = (req,res) => {
    res.clearCookie("token");
    return res.json({
        msg : "User sign out successfully"
    })
}

//Protected Routes
const isSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    userProperty : "auth"
})

//custom middlewares
const isAuthenticated = (req,res,next) => {
    console.log(req.profile,req.auth);
    // let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    let checker = req.auth._id;
    if(!checker){
        return res.status(403).json({
            error :"Access denide"
        })
    }
    next();
}

//No admin required

const isAdmin = (req,res,next) => {
    if(req.profile.role ===  0){
        return res.status(403).json({
            error :"You are not Admin, Access denide"
        })
    }
    next();
}



module.exports = {signout,signUp,signIn,isSignedIn,isAuthenticated,isAdmin}