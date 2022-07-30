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


//get hospital by district
const getHospitalsByDists = async (req,res,next,dist) => {
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
const seeHospitalByDist = (req,res) => {
    res.status(200).json(req.sortedHospitals);
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
                error:"Problem With Saving data in Appointment"
            });
        }

        res.status(200).json(Appointment);
    });


}


// get Running appointments
const getRunningAppointments = (req,res) => {
    Appointment.find({user_id:req.profile._id,Appointment_Status:"Running"},(err,appointment) => {
        if(err ||  !appointment){
            return res.status(400).json({
                error : "No Data found"
            });
        }
        res.status(200).json(appointment);
    })
}

const seePerticularAppointment = (req,res) => {
    if(req.appointment.user_id != req.auth._id){
        return res.status(400).json({
            error:"Invalid Appointments"
        });
    }
    res.status(200).json(req.appointment);
}

//move to History with Success
const MoveToHistory = (req,res) => {
    Appointment.findOneAndUpdate({_id:req.appointment._id,user_id:req.auth._id},{$set:{Appointment_Status:"Successfull"}}).exec((err,hospital) => {
        if(err || !hospital){
            return res.status(400).json({
                error:"Not getting Appointment Data in MoveToHistory"
            })
        }   

        const {Hospital_Name,Hospital_Contact,Hospital_Address,Patient_Name,Patient_Contact,Patient_Disease} = hospital;
        let HistoryAppointment = {
            Hospital_Name,
            Hospital_Contact,
            Hospital_Address,
            Date: new Date(Date.now()).toString()
        }

        let HistoryAppointment_hospital = {
            Patient_Name,
            Patient_Contact,
            Patient_Disease,
            Date: new Date(Date.now()).toString()
        }

        Hospital.findByIdAndUpdate(hospital.hospital_id,{$push:{Appointments_history:HistoryAppointment_hospital}}).exec((err,data) => {
            if(err || !data){
                return res.status(400).json({
                    error:"Your Data is Not Saving on History Hospital"
                })
            }
        })

        User.findByIdAndUpdate(req.auth._id,{$push:{Appointments_history:HistoryAppointment}}).exec((err,data) => {
            if(err || !data){
                return res.status(400).json({
                    error:"Your Data is Not Saving on History Users"
                })
            }

            

            
        })

    })

    Appointment.findOneAndDelete({_id:req.appointment._id,user_id:req.auth._id}).exec((err,data) => {
        if(err || !data){
            return res.status(400).json({
                error:"Your Data not deleted from Appointment"
            })
        }

        res.status(200).json({
            msg:"Your Data saved Successfully"
        })
    });
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




//updating profile

const updateUserProfile = (req,res) => {
    // task 1
    // retrive all values 
    const {name,Phone_no,Profile_photo} = req.body;

    //task 2
    //get all updated values
    if(!name || !Phone_no){
        return res.status(400).json({ error: "Need All Required Fields" });
    }

    //task 3
    //save updated values
    User.findOneAndUpdate({_id:req.profile._id},{name,Phone_no,Profile_photo},{new:true}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({ error: "Updating User is Failed" });
        }
        res.status(200).json(user);
    })

    
}



module.exports = {getAllHospitals,getHospitalById,getHospital,sendAppointment,getUser,getUserById,MoveToHistory,getAllAppointmentsUsers,getRunningAppointments,seePerticularAppointment,updateUserProfile,getHospitalsByDists,seeHospitalByDist};
