const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const bookSchema = new mongoose.Schema({
  publisher_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Meal must belong to a user"],
  },
  title: {
    type: String,
    required: [true, "Please enter title!"],
  },
  writer: {
    type: String,
    required: [true, "Please provide writer"],
  },
  writerDescription: {
    type: String,
    required: [true, "Please provide writer Description  "],
  },
  voiceover: {
    type: String,
    required: [true, "Please provide Voiceover "],
  },
  description: {
    type: String,
    required: [true, "Please provide description "],
  },
  type: {
    type: String,
    required: [true, "Please provide type "],
  },
  paidType: {
    type: String,
    required: [true, "Please provide paidType "],
  },
  publishingType: {
    type: String,
    required: [true, "Please provide publishingType "],
  },
  profile: {
    type: String,
  }
},{ collection: 'Book'});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
