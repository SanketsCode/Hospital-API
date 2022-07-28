const User = require("../models/user");
const Hospital = require('../models/hospital');
const Appointment = require('../models/Appointment');


//create an appointment to send to hospital
const CreateAppoinment = (req,res) => {

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

//after receive appointment hospital can change its status
const changeStatusAppointment = (req,res) => {
        
}

//move to userHistory
const moveUserHistory = (req,res) => {

}

//move to hospital
const moveHospitalHistory = (req,res) => {

}


module.exports = {CreateAppoinment,changeStatusAppointment,moveUserHistory,moveHospitalHistory};

