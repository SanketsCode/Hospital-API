const Hospital = require('../../models/hospital');
const User = require('../../models/user');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Appointment = require('../../models/Appointment');


//getting all hospital details
const getAllHospitals = async (req,res) => {
    let hospitals = await Hospital.find({});
    let secure_hospitals = [];
    hospitals.forEach(hospital => {
        const {name,email,contact_no,address,Images,_id} = hospital;
        secure_hospitals.push({_id,name,email,contact_no,address,Images})
    });
    res.status(200).json(secure_hospitals);
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
    req.hospital.salt = undefined;
    req.hospital.encry_password = undefined;
    req.hospital.updatedAt = undefined;
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
    // console.log(req.auth._id,req.hospital._id);
    // return res.status(200).json({msg:"check"})
    
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

    // const prev_appointment = req.hospital.Appointments_Pending;


    // adding appointment to Hospital db
    // Hospital.findByIdAndUpdate(
    //     {_id:req.hospital._id},
    //     {$set:{Appointments_Pending:[...prev_appointment,appointment]}},
    //     (err,appointments) => {

    //         if(err || !appointments){
    //             return res.status(400).json({
    //                 error:"Cannot Able to add Appointments in HospitalDB"
    //             });
    //         }
    //     }   
    // )

//     //adding data to users db
//    User.findByIdAndUpdate(
//         {_id:req.auth._id},
//         {$set:{Appointments_Pending:[...prev_appointment,appointment]}},
//         (err,appointments) => {

//             if(err){
//                 console.log(err,appointments);
//                 return res.status(400).json({
//                     error:"Cannot Able to add Appointments in UserDB"
//                 });
//             }

//             res.status(200).json(appointments);
//         }   
//     )

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
const getAllAppointmentsUsers = (req,res) => {
   Appointment.find({user_id:{$in:req.profile._id},},(err,appointment) =>{ 
        if(err ||  !appointment){
            return res.status(400).json({
                error : "No Data found"
            });
        }
        res.status(200).json(appointment);
     });
}






module.exports = {getAllHospitals,getHospitalById,getHospital,sendAppointment,getUser,getUserById,ChangeToSuccess,ChangeToReject,getAllAppointmentsUsers};
