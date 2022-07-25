const express = require('express');
const { isSignedIn, isAuthenticated } = require('../controller/auth');
const { getAllHospitals, getHospitalById, getHospital, sendAppointment, getUserById, getUser, ChangeToSuccess, getAllAppointments } = require('../controller/users');
const router = express.Router();


//params
router.param("hospitalId",getHospitalById);
router.param("userId",getUserById);


//routes
router.get('/hospitals',getAllHospitals);
router.get('/hospitals/:hospitalId',getHospital);
router.post('/hospitals/:hospitalId',isSignedIn,isAuthenticated,sendAppointment);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/user/:userId/appointments",isSignedIn,isAuthenticated,getAllAppointments);



module.exports = router;
