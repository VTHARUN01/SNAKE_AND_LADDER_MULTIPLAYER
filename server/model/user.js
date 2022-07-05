const mongoose = require("mongoose");
// email validation through regexp
var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// User Schema
let userSchema = mongoose.Schema({
  username: {
    unique: true,
    required: "Username is Required",
    type: String,
  },
  email: {
    required: "Email address is required",
    type: String,
    unique: true,
    vallidate: [validateEmail, "Fill valid Email Address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Fill valid Email Address",
    ],
  },
  password: {
    required: "Password can't be Empty",
    type: String,
  },
});

let User = mongoose.model("User", userSchema);

module.exports = User;
