const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Please provide question"],

    },
    solution: {
        type: String,
        required: [true, "Please provide solution"],

    },
    
}, { collection: 'Faq' });

const Faq = mongoose.model("Faq", faqSchema);

module.exports = Faq;