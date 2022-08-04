const express = require('express');
const { getPerticularAppointment, getAppointmentDetails } = require('../../controller/Hospital/hospital');
const { MoveToHistory, MoveToHistoryByRemove, sendAppointment } = require('../../controller/User/manage_appoinment');
const { getHospitalById, getHospitalsByDists, getAllHospitals, getHospital, seeHospitalByDist, getAllAppointmentsUsers, getRunningAppointments, seePerticularAppointment } = require('../../controller/User/showing_data');
const { getUserById, forgot_password, getUser, updateUserProfile } = require('../../controller/User/users');
const { isAuthenticated,isSignedIn } = require('../../controller/User/user_auth');
const router = express.Router();

//Params
router.param("userId",getUserById);
router.param("hospitalId",getHospitalById);
router.param("appointmentId",getPerticularAppointment);
router.param("dist",getHospitalsByDists);
//Request

//get hospitals 
router.get('/hospitals',getAllHospitals);

// specific hospital details
router.get('/hospitals/:hospitalId',getHospital);


//sorting appointments based on districts
router.get('/hospitals/dist/:dist',seeHospitalByDist);

//get pending appointment list
router.get('/user/:userId/pending_appointments',isSignedIn,isAuthenticated,getAllAppointmentsUsers);

//delete data in pending state by user
router.get('/user/:userId/:appointmentId/remove',isSignedIn,isAuthenticated,MoveToHistoryByRemove);


//retrive running appoinments list
router.get('/user/:userId/running_appointments',isSignedIn,isAuthenticated,getRunningAppointments);
router.get('/user/:userId/running_appointments/:appointmentId',isSignedIn,isAuthenticated,getPerticularAppointment,seePerticularAppointment)

//get a perticular appointment details for testing
router.get('/user/:userId/:appointmentId',getPerticularAppointment,getAppointmentDetails);

//save appointment to history
//saving successfull appointment
router.get('/user/:userId/running_appointments/:appointmentId/success',isSignedIn,isAuthenticated,getPerticularAppointment,MoveToHistory);

//remove running appointment
// router.get('/user/:userId/running_appointments/:appointmentId/remove',isSignedIn,isAuthenticated,getPerticularAppointment,MoveToHistoryByRemove);


//get user for profile details
router.get ('/users/:userId',isSignedIn,isAuthenticated,getUser);


//sending appointments
router.post('/hospitals/:hospitalId',isSignedIn,isAuthenticated,sendAppointment);

//updating profile
router.put('/users/:userId/profile',isSignedIn,isAuthenticated,updateUserProfile);

//updating password
router.post('/user/forgot_password/:userId',isSignedIn,isAuthenticated,forgot_password);


module.exports = router;