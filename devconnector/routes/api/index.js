const express = require("express");
const router = express.Router();
const passport = require("passport");

//Appointment Model
const { Appointment, Slot } = require("../../models/Appointment");

//Profile Model
const Profile = require("../../models/Profile");

const validateAppointmentInput = require("../../validation/appointment");

router.get("/test", (req, res) => res.json({ msg: "Appointment Works" }));

// @route   POST api/appointment/appointmentCreate
// @desc    Create appointment
// @access  Private
router.post(
  "/appointmentCreate",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /*     //const { errors, isValid } = validateAppointmentInput(req.body);
  
      //Check validation
      if (!isValid) {
        //If any errors send 400 with current error object
        return res.status(400).json(errors);
      }*/

    var newslot = new Slot({
      slot_time_from: req.body.slot_time_from,
      slot_time_to: req.body.slot_time_to,
      slot_date: req.body.slot_date,
      created_at: Date.now()
    });
    newslot.save();
    // Creates a new record from a submitted form
    var newappointment = new Appointment({
      name: req.user.name,
      email: req.user.email,
      slots: newslot._id
    });

    newappointment.save((err, saved) => {
      // Returns the saved appointment
      // after a successful save

      Appointment.find({ _id: saved._id })
        .populate("slots")
        .exec((err, appointment) => res.json(appointment));
    });
  }
);

module.exports = router;
