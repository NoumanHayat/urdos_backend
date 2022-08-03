const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const episodeSchema = new mongoose.Schema({
    book_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Book",
        required: [true, "Meal must belong to a user"],
    },
    title: {
        type: String,
        required: [true, "Please enter title!"],
    }, 
    description: { type: String },
    part: { type: Number },
    selectDate: {
        type: Date,
        default: new Date(),
    },
    publishingType: {
        type: String,
        required: [true, "Please provide publishingType "],
    },
    paidType: {
        type: String,
        required: [true, "Please provide paidType "],
    },
    audioUrl: {
        type: String,
        required: [true, "Please provide audioUrl "],
    }
},{ collection: 'Episode'});

const Episode = mongoose.model("Episode", episodeSchema);

module.exports = Episode;
  