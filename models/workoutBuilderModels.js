const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const workoutbuilderSchema = new mongoose.Schema({
  WorkoutType: [
    {
      UserId: String,
      Type: {
        type: String,
        enum: ["PowerLifting", "BodyBuilding", "BodyWeight", "CrossFit","Custom"],
        Default: "BodyBuilding",
      },
      workoutName: String,
      targetMuscle: String,

      intensity: {
        type: String,
        enum: ["Mild", "Moderate", "Intense","Custom"],
        Default: "Mild",
      },
    },
  ],
  Exercise: [
    {
      name: {
        type: String,
        required: [true, "Please provide name"],
      },
      sets: {
        type: Number,
        required: [true, "Please provide Sets"],
      },
      reps: {
        type: Number,
        required: [true, "Please provide Reps"],
      },
    },
  ],
  Date: {
    type: Date,
    Default: new Date(),
  },
});

const workoutbuilder = mongoose.model("workoutbuilder", workoutbuilderSchema);

module.exports = workoutbuilder;
