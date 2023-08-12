const express = require("express");
const app = express();

exports.getHealthCheck=async(req,res)=>{
    return res.json("OK")
  }