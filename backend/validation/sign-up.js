const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSignupInput(data) {
  
  let errors = {};

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (isEmpty(data.handle)) {
    errors.handle = "Username is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };

};