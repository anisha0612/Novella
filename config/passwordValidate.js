module.exports = {
  passwordValidate: (firstName, lastName, email, password) => {
    let errors = [];
    if (!firstName || !lastName || !email || !password) {
      errors.push({
        msg: "Fields should not be empty",
      });
    }
    if (!firstName.match(/^[a-zA-Z]{3,}$/)) {
      errors.push({
        msg: "Please enter a valid name",
      });
    }
    if (!lastName.match(/^[a-zA-Z]{3,}$/)) {
      errors.push({
        msg: "Please enter a valid name",
      });
    }
    if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{6,}$/
      )
    ) {
      errors.push({
        msg:
          "Password should be minimum 6 characters, at least 1 letter, 1 number and 1 special character",
      });
    }
    return errors;
  },
};
