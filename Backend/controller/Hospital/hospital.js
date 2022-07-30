const User = require("../../models/user");
const Hospital = require("../../models/hospital");
const Appointment = require("../../models/Appointment");

//get a perticular hospital details
exports.getHospitalById = (req, res, next, id) => {
  Hospital.findById(id).exec((err, hospital) => {
    if (err) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    req.hospital = hospital;
    next();
  });
};

//get a perticular appointment
exports.getPerticularAppointment = (req, res, next, id) => {
  Appointment.findById(id).exec((err, appointment) => {
    if (err) {
      return res.status(400).json({
        error: "Appointment not found",
      });
    }
    req.appointment = appointment;
    next();
  });
};

//see a perticular appointment
exports.getAppointmentDetails = (req, res) => {
  return res.json(req.appointment);
};

//getting all appointments pending phase
exports.getPendingAppointments = (req, res) => {
  Appointment.find(
    { hospital_id: { $in: req.auth._id },Appointment_Status:"Pending"},
    (err, appointment) => {
      if (err || !appointment) {
        return res.status(400).json({
          error: "No Data found",
        });
      }
      res.status(200).json(appointment);
    }
  );
};


//get all Running Appointments

exports.getRunningAppointments = (req, res) => {
  Appointment.find(
    { hospital_id: { $in: req.auth._id },Appointment_Status:"Running" },
    (err, appointment) => {
      if (err || !appointment) {
        return res.status(400).json({
          error: "No Data found",
        });
      }
      res.status(200).json(appointment);
    }
  );
};

//Changing status of appointment to running
exports.ChangeAppointmentStatus = (req, res) => {

  const {status} = req.body;

  if(status == "accepted"){

    Appointment.findByIdAndUpdate(req.appointment._id,{Appointment_Status:"Running"},(err,appointment) => {
    if(err){
        return res.status(400).json({
            error:"Error While Updating Status"
        });
    }

    res.status(200).json({msg:"Updated Successfully"})

})

  }else{
  
    Appointment.findOneAndUpdate({_id:req.appointment._id,hospital_id:req.auth._id},{$set:{Appointment_Status:"Rejected"}}).exec((err,hospital) => {
      if(err || !hospital){
          return res.status(400).json({
              error:"After Rejecting Data getting Problem"
          })
      }   

      const {Hospital_Name,Hospital_Contact,Hospital_Address,Patient_Name,Patient_Contact,Patient_Disease,user_id} = hospital;
      let HistoryAppointment = {
          Hospital_Name,
          Hospital_Contact,
          Hospital_Address,
          Appointment_Status:"Rejected",
          Date: new Date(Date.now()).toString()
      }

      let HistoryAppointment_hospital = {
          Patient_Name,
          Patient_Contact,
          Patient_Disease,
          Appointment_Status:"Rejected",
          Date: new Date(Date.now()).toString()
      }

      Hospital.findByIdAndUpdate(hospital.hospital_id,{$push:{Appointments_history:HistoryAppointment_hospital}}).exec((err,data) => {
          if(err || !data){
              return res.status(400).json({
                  error:"Your Data is Not Saving on History Hospital"
              })
          }
      })

      // console.log(user_id);
      User.findOneAndUpdate({_id:user_id},{$push:{Appointments_history:HistoryAppointment}}).exec((err,data) => {  
        if(err || !data){
                return res.status(400).json({
                  error:"Your Data is Not Saving on History Users"
              })
          }
      })

  })

 
  Appointment.findOneAndDelete({_id:req.appointment._id,hospital_id:req.auth._id}).exec((err,data) => {
      if(err || !data){
          return res.status(400).json({
              error:"Your Data not deleted from Appointment"
          })
      }

      res.status(200).json({
          msg:"Your Data Deleted Successfully"
      })
  });

  }



};


exports.updateHospitalProfile = (req,res) => {
  // task 1
  // retrive all values 
  const {name,contact_no,address,Images} = req.body;

  //task 2
  //check all updated values
  if(!name || !contact_no || !address){
    return res.status(400).json({ error: "Need All Required Fields" });
  }

  let newImages = !Images ? [] : Images;


  //task 3
  //save updated values

  Hospital.findOneAndUpdate({_id:req.auth._id},{name,contact_no,address,Images : newImages},{new:true}).exec((err,hospital) => {
    if(err || !hospital){
        return res.status(400).json({ error: "Updating Hospital is Failed" });
    }
    res.status(200).json(hospital);
})
  
}