const express = require("express")
const app = express()
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const User = require('../models/User')
const jwt = require("jsonwebtoken")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")

require("dotenv").config({ path: "./config/.env" });


// To hash a password
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const secret = process.env.secret



app.use(cookieParser())

exports.postSignup = async (req, res) => {

  const { username, email, password } = req.body

  const userInfo = new User({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, salt)
  })
  try {
    const userInfoToSave = await userInfo.save()
    res.status(200).json(userInfoToSave);

  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error })
  }
}

exports.postLogin = async (req, res) => {
  const { username, email, password } = req.body
  const userInfo = await User.findOne({ username})
  console.log("trying to login", userInfo)
  const passOk = await bcrypt.compare(password, userInfo.password)

  if (passOk) {
    // logged in
    jwt.sign({ username, email,id: userInfo._id }, secret, {}, (err, token) => { //this token gets used in /profile
      if (err) throw err
      res.cookie('token', token).json({
        id: userInfo._id,
        username,
        email
      })  //'token' is set to token from the parameter
    })
  }
  else {
    // not logged in
    res.status(400).json("wrong credentials")
  }
}



exports.getProfile = (req, res) => {
  jwt.verify(req.cookies.token, secret, {}, (error, userInfo) => {
    if (error) throw error
    res.json(userInfo)
  })
}

exports.postLogout = (res, req) => {
  res.cookie("token", "").json("ok") //sets "token" to empty/invalid
}




