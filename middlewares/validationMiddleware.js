const { validationResult } = require("express-validator");

// @desc Finds the validation errors in this request and wraps them in an object with hany function
const validatorMiddleware = (req, res, next) => {
  // catch error if happend from validation layer
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validatorMiddleware;
