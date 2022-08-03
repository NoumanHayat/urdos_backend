const express = require("express");
const multer = require("multer");
const testimonialController = require("./../controllers/testimonialController");
const authController = require("./../controllers/authController");
const router = express.Router();
console.clear()
router.route("/addTestimonial")
    .post( testimonialController.addTestimonial)
router.route("/getTestimonial")
    .get( testimonialController.getTestimonial)

module.exports = router;  