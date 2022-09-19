const express = require('express');
const { isHospitalSignedIn, isHospitalAuthenticated } = require('../../controllers/Hospital/auth');
const { getHospitalById, getPerticularAppointment, getPendingAppointment, getAppointmentDetails, changeAppointmentStatus, getAllRunningAppointments, updateHospitalProfile, forgot_password } = require('../../controllers/Hospital/hospital');
const Router = express.Router();

//params
Router.param('hospitalId',getHospitalById);
Router.param('appointmentId',getPerticularAppointment);



//Creating routes for getting the data
Router.get('/pending_appointments',isHospitalSignedIn,isHospitalAuthenticated,getPendingAppointment);
Router.get('/pending_appointments/:appointmentId',isHospitalSignedIn,isHospitalAuthenticated,getAppointmentDetails);
Router.get('/running_appointments',isHospitalSignedIn,isHospitalAuthenticated,getAllRunningAppointments);




//Profile Edit 
Router.put('/profile',isHospitalSignedIn,isHospitalAuthenticated,updateHospitalProfile);

Router.post('/:hospitalId/forgot_password',isHospitalSignedIn,isHospitalAuthenticated,forgot_password);
//changing the appointment status
Router.post('/pending_appoinment/:appointmentId/status',isHospitalSignedIn,isHospitalAuthenticated,changeAppointmentStatus);

module.exports = Router;
