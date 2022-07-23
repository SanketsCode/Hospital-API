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
      enum: ["Pending","Successfull","Running"]
        
    }

});

module.exports = mongoose.model("Appointment", Appoinment_Schema);