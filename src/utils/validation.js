const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not Valid");
  } else if (firstName.length < 4 || firstName > 50) {
    throw new Error("Name should be betweetn 4 to 50 words");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

module.exports = { validateSignUpData };
