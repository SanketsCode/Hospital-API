const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {expressjwt:expressJwt} = require('express-jwt');
const Hospital = require('../models/hospital');
const User = require('../models/user');



//sign up controller for hospital
const Hospital_SignUp = (req,res) => {

}


//sign up controller for user
const User_SignUp = (req,res) => {

}

//sign IN

//hospital
const Hospital_SignIn = (req,res) => {

}

//user
const User_SignIn = (req,res) => {

}

//sign out for both
const signout = (req,res) => {
    res.clearCookie("token");
    return res.json({
        msg : "User sign out successfully"
    })
}


//protected routes

//checking for authication for hospital


//checking for authentication for user


