const mongoose = require('mongoose');

const user_send_appointment = new mongoose.Schema({
    Patient_name:{
        type:String,
        required:true
    },
    Patient_Contact : {
        type: Number,
        maxlength:10,
        required:true
    },
    Patient_Disease:{
        type:String,
        required:true
    },
    Patient_status: {
        type: String,
        default: "Normal",
        enum: ["Emergency","Accident","Normal"]
    },
},{timestamps:true});

module.exports = mongoose.model("User_Send_Appointment", user_send_appointment);