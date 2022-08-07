const mongoose = require('mongoose');

const Appoinment_Schema = mongoose.Schema({
    Hospital_Name:{
        type:String,
        required:true
    },
    Hospital_Contact:{
        type:Number,
        required:true
    },
    Hospital_Address:{
        type:String,
        required:true
    },
    hospital_id:{
        type:String,
        required:true
    },
    hospital_email:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    Patient_Name:{
        type:String,
        required:true
    },
    Patient_Contact:{
        type:Number,
        required:true
    },
    Patient_Disease:{
        type:String,
        required:true
    },
    Appointment_Status:{
        type: String,
      default: "Pending",
      enum: ["Pending","Successfull","Running","Rejected","Canceled"]
        
    }

});

module.exports = mongoose.model("Appointment", Appoinment_Schema);