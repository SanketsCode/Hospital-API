
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const Hospital = require('../../models/hospital');
const {expressjwt:expressJwt} = require('express-jwt');



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


module.exports = {isHospitalAuthenticated,isHospitalSignedIn,Hospital_SignIn,Hospital_SignUp,getHospital};