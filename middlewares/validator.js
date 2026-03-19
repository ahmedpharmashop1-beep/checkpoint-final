const {check, validationResult} = require("express-validator");

exports.registerValidator = () => [
  check("firstname", "First name is required").notEmpty(),
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
];

exports.loginValidator = () => [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").notEmpty(),
];
exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({errors : errors.array()});
  }
  next();
};