const express = require('express');
const { isHospitalSignedIn, isHospitalAuthenticated } = require('../../controller/Hospital/auth');
const { getPendingAppointments, getHospitalById, getPerticularAppointment, getAppointmentDetails, ChangeAppointmentToRunning } = require('../../controller/Hospital/hospital');
const router = express.Router();

//params
router.param('hospitalId',getHospitalById);
router.param('appointmentId',getPerticularAppointment);


//creating route for getting all data
router.get('/pending_appointments',isHospitalSignedIn,isHospitalAuthenticated,getPendingAppointments);
router.get('/pending_appointments/:appointmentId',isHospitalSignedIn,isHospitalAuthenticated,getAppointmentDetails);
router.get('/pending_appointments/:appointmentId/running',isHospitalSignedIn,isHospitalAuthenticated,ChangeAppointmentToRunning);


module.exports = router;