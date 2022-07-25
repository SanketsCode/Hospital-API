const Hospital = require('../models/hospital');
const User = require('../models/user');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Appointment = require('../models/Appointment');


//getting all hospital details
const getAllHospitals = async (req,res) => {
    let hospitals = await Hospital.find({});
    res.status(200).json(hospitals);
}

//get a perticular hospital details
const getHospitalById = (req,res,next,id) => {
    Hospital.findById(id)
    .exec((err,hospital) => {
        if(err){
            return res.status(400).json({
                error : "Product not found"
            });

        }
        req.hospital = hospital;
        next();
    })
}


const getHospital = (req,res) => {
    return res.json(req.hospital);
}


//get user details by ID
const getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "No user was found in DB"
        });
      }
      req.profile = user;
      next();
    });
  };

  const getUser = (req,res) => {

    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
}


//sending request from user to hospital for appointment
const sendAppointment = (req,res) => {
    const {Patient_Name,Patient_Disease,Patient_Contact} = req.body;
     
    if(!Patient_Name || !Patient_Contact || !Patient_Disease){
        return res.status(400).json({
            error:"All Fields are Required!"
        })
    }

    const appointment = new Appointment({
        hospital_id:req.hospital._id,
        Hospital_Name: req.hospital.name,
        Hospital_Contact:req.hospital.contact_no,
        Hospital_Address:req.hospital.address,
        user_id:req.auth._id,
        Patient_Name,
        Patient_Disease,
        Patient_Contact
    });


    appointment.save((err,Appointment) => {
        if(err || !Appointment){
            return res.status(400).json({
                error:"Something went Wrong"
            });
        }

        res.status(200).json(Appointment);
    });


}


// Changing appointment status
const ChangeToSuccess = (req,res,id) => {

}

//changing to rejected
const ChangeToReject = (req,res,next,id) => {

}

//get all appointments in details
const getAllAppointments = (req,res) => {
     let All_Appointments = Appointment.find({user_id:{$in:req.auth._id},},(err,appointment) =>{ 
        if(err ||  !appointment){
            return res.status(400).json({
                error : "No Data found"
            });
        }
        res.status(200).json(appointment);
     });
}






module.exports = {getAllHospitals,getHospitalById,getHospital,sendAppointment,getUser,getUserById,ChangeToSuccess,ChangeToReject,getAllAppointments};
