const User = require("../model/user");
const bcryptjs = require("bcryptjs");

const register = async (req, res) => {
  let size;
  await User.find({})
    .then((user) => {
      size = user.length;
    })
    .catch((e) => console.log("ERROR"));
  await User.create({
    // id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    password: bcryptjs.hashSync(req.body.password, parseInt(process.env.ITR)),
  })
    .then(() => {
      return res.status(200).send("User Registered Succesfully");
    })
    .catch((e) => {
      return res.status(500).send({ message: e });
    });
};

module.exports = register;
