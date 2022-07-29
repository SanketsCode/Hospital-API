const express = require('express');
const { getPerticularAppointment } = require('../../controller/Hospital/hospital');
const { getUserById, getAllHospitals, getHospitalById, sendAppointment, getHospital,getUser, getAllAppointmentsUsers, getRunningAppointments, MoveToHistory, seePerticularAppointment } = require('../../controller/User/users');
const { isAuthenticated,isSignedIn } = require('../../controller/User/user_auth');
const router = express.Router();

//Params
router.param("userId",getUserById);
router.param("hospitalId",getHospitalById);
router.param('appointmentId',getPerticularAppointment);

//Request

//get hospitals and specific hospital details
router.get('/hospitals',getAllHospitals);
router.get('/hospitals/:hospitalId',getHospital);

//get pending appointment list
router.get('/user/:userId/pending_appointments',isSignedIn,isAuthenticated,getAllAppointmentsUsers);

//retrive running appoinments list
router.get('/user/:userId/running_appointments',isSignedIn,isAuthenticated,getRunningAppointments);
router.get('/user/:userId/running_appointments/:appointmentId',isSignedIn,isAuthenticated,getPerticularAppointment,seePerticularAppointment)

//save appointment to history

//saving successfull appointment
router.get('/user/:userId/running_appointments/:appointmentId/success',isSignedIn,isAuthenticated,getPerticularAppointment,MoveToHistory);


//get user for profile details
router.get ('/users/:userId',isSignedIn,isAuthenticated,getUser);


//post requests


//sending appointments
router.post('/hospitals/:hospitalId',isSignedIn,isAuthenticated,sendAppointment);


module.exports = router;