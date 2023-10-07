const { BadRequestError } = require("../errors");
const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  // *** hash password in here or in mongoose middleware in User model ***

  // const { name, email, password } = req.body;
  // // hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  // const tempUser = {
  //   name,
  //   email,
  //   password: hashedPassword,
  // };

  // create new user, if hashing password here then in create use tempUser object
  const user = await UserModel.create({ ...req.body });
  //  *** generate token here or using mongoose instance method in user model ***
  // const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", {
  //   expiresIn: "30d",
  // });
  const token = user.createJWT();
  //send back token
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = { register, login };
