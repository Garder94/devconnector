const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slotSchema = new Schema({
  slot_time_from: {
    type: String,
    required: true
  },
  slot_time_to: {
    type: String,
    required: true
  },
  slot_date: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Slot = mongoose.model("Slot", slotSchema);

const appointmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  avatar: {
    type: String
  },
  email: {
    type: String
  },
  slot_time_from: {
    type: String,
    required: true
  },
  slot_time_to: {
    type: String,
    required: true
  },
  slot_date: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = {
  Appointment,
  Slot
};
