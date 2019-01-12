const express = require("express");
const router = express.Router();
const passport = require("passport");

//Appointment Model
const { Appointment, Slot } = require("../../models/Appointment");
const Profile = require("../../models/Profile");
// @route   GET api/appointments
// @desc    Get appointments
// @access  public
router.get("/", (req, res) => {
  Appointment.find()
    .sort({ date: -1 })
    .then(appointments => res.json(appointments))
    .catch(err =>
      res
        .status(404)
        .json({ noappointmentsfound: "No appointment found with that ID" })
    );
});

// @route   GET api/appointments/:id
// @desc    Get appointments by id
// @access  public
router.get("/:id", (req, res) => {
  Appointment.findById(req.params.id)
    .then(appointment => res.json(appointment))
    .catch(err =>
      res
        .status(404)
        .json({ noappointmentfound: "No appointment found with that ID" })
    );
});

// @route   POST api/appointments
// @desc    Create appointment
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Creates a new record from a submitted form
    var newappointment = new Appointment({
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      slot_time_from: req.body.slot_time_from,
      slot_time_to: req.body.slot_time_to,
      slot_date: req.body.slot_date,
      user: req.user.id
    });

    newappointment.save().then(appointment => res.json(appointment));
  }
);

// @route   DELETE api/appointments/:id
// @desc    Delete appointment
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Appointment.findById(req.params.id)
        .then(appointment => {
          //Check for appointment owner
          if (appointment.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          //Delete
          appointment.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ appointmentnotfound: "No appointment found" })
        );
    });
  }
);

module.exports = router;
