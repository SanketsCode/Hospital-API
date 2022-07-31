const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const {expressjwt:expressJwt} = require('express-jwt');
const Token = require('../../models/token');
const sendEmail = require('../Email_Varification/email_varify');
const crypto = require('crypto');


const signUp = async (req,res) => {

   try{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({error:errors.array()[0].msg});
    }

    let user = new User(req.body);
    user.save((err,user) => { 
        if(err){
            return res.status(400).json({
                error:"Invalid data or Check Email Already Exists!"
            });
        }
        
        user = user;
    })

    let token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
  
      const message = `Hello User \n Please Use these varification Link \n ${process.env.BASE_URL}/user/verify/${user.id}/${token.token}`;
      const result = await sendEmail(user.email, "Verify Email", message);

      if(result){
          res.status(200).json({
            msg:"Email Send Successfully Check Your mail"
          })
      }else{
        res.status(400).json({
            msg:"Email Unsuccessfull Try after some time!"
          })
      }


   }catch(err){
    console.log(err);
    res.status(400).send("An error occured");
   }
}

const ValidateEmail = async (req,res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send("Invalid link");
    
        const token = await Token.findOne({
          userId: user._id,
          token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link");
    
        await User.updateOne({ _id: user._id, verified: true });
        await Token.findByIdAndRemove(token._id);
    
        res.status(200).json({
            msg:"Email Verified Successfully"
        });
      } catch (error) {
        res.status(400).send("An error occured Please try After some time");
      }
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
        if(!user.verified){
            return res.status(401).json({
                error:"Confirm Email Varification"
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



module.exports = {signout,signUp,signIn,isSignedIn,isAuthenticated,isAdmin,ValidateEmail};