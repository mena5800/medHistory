// appointment.model.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  startDateTime: { type: Date, required: true },
  location: { type: String },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
