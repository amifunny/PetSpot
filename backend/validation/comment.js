const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateComment(data) {
  let errors = {};

  if (isEmpty(data.text)) {
    errors.text = "Text field is required";
  } 
  
  return {
    errors,
    isValid: isEmpty(errors)
  }

}