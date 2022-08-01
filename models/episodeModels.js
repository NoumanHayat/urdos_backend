const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const episodeSchema = new mongoose.Schema({
    title: {
        unique: true,
        required: [true, "Please enter title!"],
    },
    description: { type: String },
    part: { type: String },
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
    audioUrl:{
        type: String,
        required: [true, "Please provide audioUrl "],
    }
}); 

const Episode = mongoose.model("Episode", episodeSchema);

module.exports = Episode;
