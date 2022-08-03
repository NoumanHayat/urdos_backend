const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const CommentsSchema = new mongoose.Schema({
    episode_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Episode",
        required: [true, "must be a valid episode id"],
    },
    publisher_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "must be a valid user id"],
    },
    comment: {
        type: String,
        required: [true, "Please enter comment!"],
    }, 
    date:{
        type:Date,
        default: new Date(),
    }
},{ collection: 'Comments'});

const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
