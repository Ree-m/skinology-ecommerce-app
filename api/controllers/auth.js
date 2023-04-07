const express = require("express");
const app = express();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });

// To hash a password

const salt = bcrypt.genSaltSync(10);
const secret = process.env.secret;

app.use(cookieParser());

exports.postSignup = async (req, res) => {
  const { username, email, password } = req.body;

  const userInfo = new User({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, salt),
  });
  try {
    const userInfoToSave = await userInfo.save();
    res.status(200).json(userInfoToSave);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: "Username or email already exists." });
    } else {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }
};

exports.postLogin = async (req, res) => {
  const { username, email, password } = req.body;
  const userInfo = await User.findOne({ username, email }).exec();

  if (!userInfo) {
    // User not found
    return res.status(400).json({ message: "Invalid login credentials." });
  }
  console.log("trying to login", secret, userInfo);
  const passOk = await bcrypt.compare(password, userInfo.password);

  if (passOk) {
    // logged in
    jwt.sign(
      { username, email, id: userInfo._id },
      secret,
      {},
      (err, token) => {
        //this token gets used in /profile
        if (err) throw err;
        console.log("Token:", token);
        console.log("API_DOMAIN:", process.env.API_DOMAIN);

        res.cookie("token", token, { domain: "https://skinology-ecommerce-app-api.onrender.com" }).json({
          id: userInfo._id,
          username,
          email,
        }); //'token' is set to token from the parameter
      }
    );
  } else {
    // not logged in
    res.status(400).json("wrong credentials,auth");
  }
};

exports.getProfile = (req, res) => {
  jwt.verify(req.cookies.token, secret, {}, (error, userInfo) => {
    if (error) {
      console.log(error);
      return res.status(401).json({ message: "Invalid token" });
    }
    res.json(userInfo);
  });
};

exports.postLogout = (req, res) => {
  console.log("logging out")
  console.log("API_DOMAIN:", process.env.API_DOMAIN);
  res.cookie("token", "", { domain: process.env.API_DOMAIN }).json("ok"); //sets "token" to empty/invalid
};
