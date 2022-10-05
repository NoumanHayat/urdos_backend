const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const sendEmail = require("../utils/email");
const bcrypt = require("bcrypt");
const Banner = require("./../models/BannerModels");
const saveImage = async (req, res, next) => {
}

exports.addBanner = catchAsync(async (req, res, next) => {

    const newBanner = await Banner.create({
        time: req.body.time,
        description: req.body.description,
        image: req.body.image,
    });
    res.status(200).json({ status: "success", Banner: newBanner });
});
exports.getBanner = catchAsync(async (req, res, next) => {
    const allBanner = await Banner.find();
    res.status(200).json({ status: "success", Banner: allBanner });
}); 