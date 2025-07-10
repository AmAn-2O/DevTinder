const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body; // <-- add password

  if (!firstName || !lastName) {
    throw new Error("Name is not Valid");
  } else if (firstName.length < 4 || firstName.length > 50) {
    // <-- fix length check
    throw new Error("Name should be between 4 to 50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

module.exports = { validateSignUpData };
