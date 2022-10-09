const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const socketSchema = new mongoose.Schema({
  Tranding:[String],
  Suggested:[String],
},{ collection: 'Socket'});

const socket = mongoose.model("Socket", socketSchema);

module.exports = socket;
