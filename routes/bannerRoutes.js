const express = require("express");
const BannerController = require("./../controllers/bannerController");
const router = express.Router();
console.clear()
router.route("/addBanner")
    .post( BannerController.addBanner)
router.route("/getBanner")
    .get( BannerController.getBanner)
module.exports = router;   