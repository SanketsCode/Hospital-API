const Hospital = require('../../models/hospital');
const User = require('../../models/user');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Appointment = require('../../models/Appointment');


//sending request from user to hospital for appointment
exports.sendAppointment = (req,res) => {
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





//move to History with Success
exports.MoveToHistory = (req,res) => {
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
            Appointment_Status:"Success",
            Date: new Date(Date.now()).toString()
        }

        let HistoryAppointment_hospital = {
            Patient_Name,
            Patient_Contact,
            Patient_Disease,
            Appointment_Status:"Success",
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



//Move to History with Reject
exports.MoveToHistoryByRemove = (req,res) => {
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
            Appointment_Status:"Rejected",
            Date: new Date(Date.now()).toString()
        }

        let HistoryAppointment_hospital = {
            Patient_Name,
            Patient_Contact,
            Patient_Disease,
            Appointment_Status:"Rejected",
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