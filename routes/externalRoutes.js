const express = require("express");
const multer = require("multer");
const externalController = require("../controllers/externalController");

const router = express.Router();
console.clear()
// const upload = multer({ dest: "/" });exercisedb
router.route("/searchFood")
    .post(externalController.searchFood)
router.route("/exercisedb")
    .post(externalController.exercisedb)

//172.17.240.1
module.exports = router; 
    