const { check } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

exports.getAppointmentValidator = 
[
  check("id").isMongoId().withMessage("invalid Appointment id format"),
  validationMiddleware
]

exports.createAppointmentValidator = 
[
  check("title").isString().withMessage("invalid datatype title should be string"),
  check("title").notEmpty().withMessage("title is required"),
  check("title").isLength({min: 3, max : 32}).withMessage("title should be from 3 to 32 chars"),
  check("description").isString().withMessage("invalid datatype description should be string"),
  check("description").notEmpty().withMessage("description is required"),
  check("description").isLength({min: 10, max : 200}).withMessage("name should be from 3 to 32 chars"),

  validationMiddleware
]

exports.updateAppointmentValidator = 
[
  check("id").isMongoId().withMessage("invalid Appointment id format"),

  validationMiddleware
]


exports.deleteAppointmentValidator = 
[
  check("id").isMongoId().withMessage("invalid Appointment id format"),
  validationMiddleware
]

