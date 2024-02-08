const { check } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

exports.getRecordValidator = 
[
  check("id").isMongoId().withMessage("invalid Record id format"),
  validationMiddleware
]

exports.createRecordValidator = 
[
  check("name").isString().withMessage("invalid datatype name should be string"),
  check("name").notEmpty().withMessage("name is required"),
  check("name").isLength({min: 3, max : 32}).withMessage("name should be from 3 to 32 chars"),
  check("description").isString().withMessage("invalid datatype description should be string"),
  check("description").notEmpty().withMessage("description is required"),
  check("description").isLength({min: 10, max : 200}).withMessage("name should be from 3 to 32 chars"),
  validationMiddleware
]

exports.updateRecordValidator = 
[
  check("id").isMongoId().withMessage("invalid Record id format"),

  validationMiddleware
]


exports.deleteRecordValidator = 
[
  check("id").isMongoId().withMessage("invalid Record id format"),
  validationMiddleware
]

