//   const {
//     user_id,
//     hospital_id,
//     _id,
//     Hospital_Name,
//     Hospital_Contact,
//     Hospital_Address,
//     Patient_Name,
//     Patient_Contact,
//     Patient_Disease,
//   } = req.appointment;


  //getting previous appontments of user
//   let user = User.findById(user_id);
//   console.log(user);
//   if (!user) {
//     return res.status(400).json({
//       error:
//         "Something goes wrong with user connection Running Appointment Change",
//     });
//   }

//   let Running_Appointment_user = user.Appointments_Running;

//   //getting previous appointment of hospital

// Hospital.findById(req.auth._id).exec((err, myhospital) => {
//     if (err || !hospital) {
//         return res.status(400).json({
//             error:
//               "Something goes wrong with hospital connection Running Appointment Change",
//           });
//     }
//     return myhospital;
// });



//   if (!hospital) {
//     return res.status(400).json({
//       error:
//         "Something goes wrong with hospital connection Running Appointment Change",
//     });
//   }

//   let Running_Appointment_hospital = hospital.Appointments_Running;

// console.log(Running_Appointment_hospital);

//create appointment for user

//   let appointment = {
//     _id,
//     Hospital_Name,
//     Hospital_Contact,
//     Hospital_Address,
//     Patient_Name,
//     Patient_Contact,
//     Patient_Disease,
//     Appointment_Status: "Running",
//   };

//   User.findByIdAndUpdate(
//     { user_id },
//     {
//       $set: {
//         Appointments_Running: [...Running_Appointment_user, appointment],
//       },
//     }
//   ).exec((err,user) => {
//     if(err){
//         return res.status(400).json({
//             error:"Problem with Changing Appointment status in userDB"
//         })
//     } 
//   });



//   Hospital.findByIdAndUpdate({_id:req.auth._id},{
//     $set:{
//         Appointments_Running:[...Running_Appointment_hospital,{
//             Patient_Name,
//             Patient_Disease,
//             Patient_Contact,
//             Date:Date.now()
//         }]
//     }
//   }).exec((err,hospital) => {
//     if(err){
//         return res.status(400).json({
//             error:"Problem with Changing Appointment   status in HospitalDB"
//         })
//     }
//   });

//   Appointment.findByIdAndRemove(_id);