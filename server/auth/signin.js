const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  await User.findOne({ email: req.body.email })
    .then((user) => {
      const passwordIsValid = bcryptjs.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) return res.status(500).send("Invalid Password");
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
      return res.status(200).send({ _id: user._id, token: token });
    })

    .catch((e) => {
      console.log(e);
      return res.status(500).send({ message: e });
    });
};

module.exports = signin;
