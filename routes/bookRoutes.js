const express = require("express");
const multer = require("multer");
const bookController = require("./../controllers/bookController");
const authController = require("./../controllers/authController");
//  const authController = require('./../controllers/authController');
const router = express.Router();
console.clear()
// const upload = multer({ dest: "/" });
router.route("/create")
    .post(authController.protect,bookController.createBook)
//172.17.240.1
module.exports = router;