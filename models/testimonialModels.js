const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],

    },
    testimonial: {
        type: String,
        required: [true, "Please provide testimonial"],

    },
    image: {
        type: String,
        required: [true, "Please provide image url"],

    },
}, { collection: 'Testimonial' });

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;