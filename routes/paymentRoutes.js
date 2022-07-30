const express = require("express");
const multer = require("multer");
const paymentController = require("../controllers/paymentController");
const authController = require('./../controllers/authController');

const router = express.Router();
console.clear()
// const upload = multer({ dest: "/" });
router.route("/addPayment")
    // .post(authController.protect,paymentController.addPayment)
    .post(authController.protect,paymentController.addPayment)
router.route("/checkPayment")
    .post(authController.protect,paymentController.checkPayment)
//172.17.240.1
module.exports = router; 
    