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
    // console.log(appointment);
    if (err) {
      res.status(400).json({
        error: "Appointment not found",
      });
    }
    req.appointment = appointment;
    next();
  });
};

//see a perticular appointment
exports.getAppointmentDetails = (req, res) => {
  // console.log(req.appointment);
  return res.json(req.appointment);
};

//getting all appointments pending phase
exports.getPendingAppointments = (req, res) => {
  Appointment.find(
    { hospital_id: { $in: req.auth._id } },
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
exports.ChangeAppointmentToRunning = (req, res) => {

Appointment.findByIdAndUpdate(req.appointment._id,{Appointment_Status:"Running"},(err,appointment) => {
    if(err){
        return res.status(400).json({
            error:"Error While Updating Status"
        });
    }


    res.status(200).json({msg:"Updated Successfully"})

})

};
