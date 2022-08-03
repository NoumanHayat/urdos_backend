const express = require("express");
const faqController = require("./../controllers/faqController");
const router = express.Router();
console.clear()
router.route("/addFaq")
    .post( faqController.addFaq)
router.route("/getFaq")
    .get( faqController.getFaq)

module.exports = router;   