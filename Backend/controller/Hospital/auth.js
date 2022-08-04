
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const Hospital = require('../../models/hospital');
const {expressjwt:expressJwt} = require('express-jwt');
const Token = require('../../models/token');
const crypto = require('crypto');
const sendEmail = require('../Email_Varification/email_verify');



//sign up controller for hospital
const Hospital_SignUp = async (req,res) => {
   try{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return  res.status(400).json({error:errors.array()[0].msg});
    }
    
    let hospital = new Hospital(req.body);
    hospital.save((err,hospital) => {
        if(err || !hospital){
            return res.status(400).json({
                error:"Please fill all fields or Email Already Exists"
            });
        }
        hospital = hospital;
    });

    let token = await new Token({
        userId: hospital._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
  
      const message = `Hello ${hospital.name} \n Please Use these varification Link \n ${process.env.BASE_URL}/hospital/verify/${hospital.id}/${token.token}`;
      const result = await sendEmail(hospital.email, "Verify Email", message);

      if(result){
          return res.status(200).json({
            msg:"Email Send Successfully Check Your mail"
          })
      }else{
        return res.status(400).json({
            msg:"Email Unsuccessfull Try after some time!"
          })
      }
   }catch(err){
    console.log(err);
    return res.status(400).send("An error occured");
   }
}

const ValidateEmail = async (req,res) => {
    try {
        const hospital = await Hospital.findOne({ _id: req.params.id });
        if (!hospital) return res.status(400).send("Invalid link");
    
        const token = await Token.findOne({
          userId: hospital._id,
          token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link");
    
        await hospital.updateOne({verified: true });
        await Token.findByIdAndRemove(token._id);
    
        res.status(200).json({
            msg:"Email Verified Successfully"
        });
      } catch (error) {
        console.log(error);
        res.status(400).send("An error occured Please try After some time");
      }
}

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
        
        if(!hospital.verified){
            return res.status(401).json({
                error:"Confirm Email Varification"
            })
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


const getHospital = (req,res) => {
    req.hospital.salt = undefined;
    req.hospital.encry_password = undefined;
    req.hospital.updatedAt = undefined;
    return res.json(req.hospital);
}

//protected routes
const isHospitalSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    userProperty : "auth"
})

//checking for authication for hospital
const isHospitalAuthenticated = (req,res,next) => {   
    let checker = req.auth;
    if(!checker){
        return res.status(403).json({
            error :"Access denide"
        })
    }
    next();
}


module.exports = {isHospitalAuthenticated,isHospitalSignedIn,Hospital_SignIn,Hospital_SignUp,getHospital,ValidateEmail};