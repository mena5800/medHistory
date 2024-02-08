const express = require("express");

const {createAppointment, getAppointment, getAppointments, updateAppointment,prepareUpdateObjectAppointment, deleteAppointment } = require("../services/appointmentService");
const {loginRequired} = require("../middlewares/authMiddleware");

const { getAppointmentValidator, createAppointmentValidator,updateAppointmentValidator, deleteAppointmentValidator } = require("../utils/validators/appointmentValidator")


// access params of another routes mergeparams: true
const router = express.Router({ mergeParams : true});



router.route("/appointments").post(loginRequired, createAppointmentValidator, createAppointment).get(loginRequired, getAppointments)
router.route("/appointments/:id").get(loginRequired, getAppointmentValidator, getAppointment).put(loginRequired, updateAppointmentValidator, prepareUpdateObjectAppointment, updateAppointment).delete(loginRequired,deleteAppointmentValidator, deleteAppointment)


module.exports = router;
