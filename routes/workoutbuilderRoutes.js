const express = require("express");
const multer = require("multer");
const workoutbuilder = require("../controllers/workoutbuilderController");
const authController = require("./../controllers/authController");

const router = express.Router();
console.clear();
// const upload = multer({ dest: "/" });
router
  .route("/addWorkout")
  .post(authController.protect, workoutbuilder.addWorkout);
router
  .route("/generateWorkout")
  .post(authController.protect, workoutbuilder.generateWorkout);
router
  .route("/logWorkout")
  .post(authController.protect, workoutbuilder.logWorkout);
router
  .route("/getWorkout")
  .post(authController.protect, workoutbuilder.getWorkout);
router
  .route("/plansCard")
  .post(authController.protect, workoutbuilder.plansCard);
router
  .route("/recomendations")
  .post(authController.protect, workoutbuilder.recomendations);

//172.17.240.1
module.exports = router;
