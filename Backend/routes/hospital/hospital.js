const express = require('express');
const { isHospitalSignedIn, isHospitalAuthenticated } = require('../../controller/Hospital/auth');
const { getPendingAppointments, getHospitalById, getPerticularAppointment, getAppointmentDetails, getRunningAppointments, ChangeAppointmentStatus } = require('../../controller/Hospital/hospital');
const router = express.Router();

//params
router.param('hospitalId',getHospitalById);
router.param('appointmentId',getPerticularAppointment);


//creating route for getting all data
router.get('/pending_appointments',isHospitalSignedIn,isHospitalAuthenticated,getPendingAppointments);
router.get('/pending_appointments/:appointmentId',isHospitalSignedIn,isHospitalAuthenticated,getAppointmentDetails);
router.post('/pending_appointments/:appointmentId/status',isHospitalSignedIn,isHospitalAuthenticated,ChangeAppointmentStatus);
router.get('/running_appointments',isHospitalSignedIn,isHospitalAuthenticated,getRunningAppointments);

module.exports = router;