const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const passportLocal = require("passport-local").Strategy;
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcryptjs");
const flash = require("express-flash"); //if password is short,email is invalid,or not confirmed,flash gives us an error message
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
// routes
const mainRoutes = require("./routes/main");
const cartRoutes = require("./routes/cart");

// models
const User = require("./models/User");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(cors({ credentials: true, origin: process.env.ALLOWED_ORIGINS }));

// Connect to DataBase
mongoose.connect(process.env.DB_STRING, console.log("DB is connected"));

// Body Parsing,get data from req.body
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // dont save session if unmodified
    saveUninitialized: false, //dont  create session until something stored
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //for errors

// Setup Routes
app.use("/", mainRoutes);
app.use("/cart", cartRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server has started");
});
