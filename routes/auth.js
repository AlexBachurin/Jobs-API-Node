const express = require("express");

const authrouter = express.Router();
const { login, register } = require("../controllers/auth");

authrouter.post("/login", login);
authrouter.post("/register", register);

module.exports = authrouter;
