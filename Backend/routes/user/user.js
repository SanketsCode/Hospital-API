const express = require('express');
const { getUserById, getAllHospitals, getHospitalById, sendAppointment, getHospital,getUser, getAllAppointmentsUsers } = require('../../controller/User/users');
const { isAuthenticated,isSignedIn } = require('../../controller/User/user_auth');
const router = express.Router();

//Params
router.param("userId",getUserById);
router.param("hospitalId",getHospitalById);

//Request

//get hospitals and specific hospital details
router.get('/hospitals',getAllHospitals);
router.get('/hospitals/:hospitalId',getHospital);

//get pending appointment list
router.get('/user/:userId/pending_appointments',isSignedIn,isAuthenticated,getAllAppointmentsUsers);

//retrive running appoinments list

//get succesfull appointments list

//get user for profile details
router.get ('/users/:userId',isSignedIn,isAuthenticated,getUser);


//post requests

//sending appointments
router.post('/hospitals/:hospitalId',isSignedIn,isAuthenticated,sendAppointment);


module.exports = router;