const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    reuired: [true, "Please provide email"],
    // regex for checking email
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    //unique index, if email in use we get duplicate message
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

//hash password
// use old function syntax so we save our context for "this " use
UserSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(10);
  // now it points on password in our document
  this.password = await bcryptjs.hash(this.password, salt);
  //pass to next middleware
  //next();
});

// generate token using mongoose method
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

//compare password
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatching = await bcryptjs.compare(userPassword, this.password);
  return isMatching;
};

module.exports = mongoose.model("User", UserSchema);
