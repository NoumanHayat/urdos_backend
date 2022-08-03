const express = require("express");
const multer = require("multer");
const bookController = require("./../controllers/bookController");
const authController = require("./../controllers/authController");
//  const authController = require('./../controllers/authController');
const router = express.Router();
console.clear()
// const upload = multer({ dest: "/" });
router.route("/create")
    .post(authController.protect, bookController.createBook)
router.route("/addEpisode")
    .post(authController.protect, bookController.addEpisode)
router.route("/addComment")
    .post(authController.protect, bookController.addComment)
router.route("/getAllBook")
    .post(authController.protect, bookController.getAllBook)
//172.17.240.1 
module.exports = router;