const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");


const BannerSchema = new mongoose.Schema({
    time: {
        type: String,
        required: [true, "Please provide time"],

    },
    description: {
        type: String,
        required: [true, "Please provide description"],
    }, 
    image:{
        type: String,
        required: [true, "Please provide Image Url"],
    }
}, { collection: 'Banner' });

const Banner = mongoose.model("Banner", BannerSchema);

module.exports = Banner;