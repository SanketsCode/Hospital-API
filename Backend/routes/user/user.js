const express = require('express');
const { getPerticularAppointment} = require('../../controllers/Hospital/hospital');
const { getAllHospitals, getHospitalById, getHospital, sendAppointment, getAllAppointments, seePerticularAppoinment, getRunningAppointments, MoveToHistoryByRemove, MoveToHistory } = require('../../controllers/User/manage_appointments');
const { getUserById, getUser, updateUserProfile, forgot_password } = require('../../controllers/User/users');
const { isSignedIn, isAuthenticated } = require('../../controllers/User/user_auth');
const Router = express.Router();


//Params
Router.param("userId",getUserById)
Router.param("hospitalId",getHospitalById);
Router.param("appointmentId",getPerticularAppointment);



//User Profile Routes
Router.get('/users/:userId',isSignedIn,isAuthenticated,getUser);
Router.put('/users/:userId/profile',isSignedIn,isAuthenticated,updateUserProfile);
Router.put('/users/:userId/forgot_password',isSignedIn,isAuthenticated,forgot_password);

//NO Auth Required
Router.get('/hospitals',getAllHospitals);
Router.get('/hospitals/:hospitalId',getHospital);

//hospitals sort by its district


//Appointment sending
Router.post('/hospitals/:hospitalId',isSignedIn,isAuthenticated,sendAppointment);

//See Pending Appointments
Router.get('/users/:userId/pending_appointments',isSignedIn,isAuthenticated,getAllAppointments);

//see the perticular appointment
Router.get('/user/:userId/:appointmentId',seePerticularAppoinment);


//Retrive Running Appointment
Router.get('/user/:userId/running_appointments',isSignedIn,isAuthenticated,getRunningAppointments);

//delete the appointment
Router.get('/user/:userId/:appointmentId/remove',isSignedIn,isAuthenticated,MoveToHistoryByRemove);
//Move to History After its Successfull
Router.get('/user/:userId/:appointmentId/success',isSignedIn,isAuthenticated,MoveToHistory);




module.exports = Router;