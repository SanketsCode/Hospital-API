const Hospital = require('../../models/hospital');
const User = require('../../models/user');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Appointment = require('../../models/Appointment');


//getting all hospital details
exports.getAllHospitals = async (req,res) => {
    let hospitals = await Hospital.find({});
    let secure_hospitals = [];
    hospitals.forEach(hospital => {
        const {name,email,contact_no,address,Images,_id} = hospital;
        secure_hospitals.push({_id,name,email,contact_no,address,Images})
    });
    res.status(200).json(secure_hospitals);
}

//get hospital by district
exports.getHospitalsByDists = async (req,res,next,dist) => {
    let hospitals = await Hospital.find({});
    let SortedHospitals = [];
    hospitals.forEach(hospital => {
        const {name,email,contact_no,address,Images,_id,district,state} = hospital;

        if(district.toLowerCase() === dist.toLowerCase()){
            SortedHospitals.push({name,email,contact_no,address,Images,_id,district,state});
        }   
        
    })
    if(!SortedHospitals || SortedHospitals.length === 0){
        return res.status(200).json({
            error:"No Hospital found!"
        })
    }
    req.sortedHospitals = SortedHospitals;
    next();
}

//show hospitals
exports.seeHospitalByDist = (req,res) => {
    res.status(200).json(req.sortedHospitals);
}



//get a perticular hospital details
exports.getHospitalById = (req,res,next,id) => {
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




exports.getHospital = (req,res) => {
    req.hospital.salt = undefined;
    req.hospital.encry_password = undefined;
    req.hospital.updatedAt = undefined;
    return res.json(req.hospital);
}


// get Running appointments
exports.getRunningAppointments = (req,res) => {
    Appointment.find({user_id:req.profile._id,Appointment_Status:"Running"},(err,appointment) => {
        if(err ||  !appointment){
            return res.status(400).json({
                error : "No Data found"
            });
        }
        res.status(200).json(appointment);
    })
}

exports.seePerticularAppointment = (req,res) => {
    if(req.appointment.user_id != req.auth._id){
        return res.status(400).json({
            error:"Invalid Appointments"
        });
    }
    res.status(200).json(req.appointment);
}



//get all appointments in details
exports.getAllAppointmentsUsers = (req,res) => {
   Appointment.find({user_id:{$in:req.profile._id},},(err,appointment) =>{ 
        if(err ||  !appointment){
            return res.status(400).json({
                error : "No Data found"
            });
        }
        res.status(200).json(appointment);
     });
}

