const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const sendEmail = require("../utils/email");
const bcrypt = require("bcrypt");
const User = require("./../models/useModels");
const Testimonial = require("./../models/testimonialModels");
const saveImage = async (req, res, next) => {
}

exports.addTestimonial = catchAsync(async (req, res, next) => {

    const newTestimonial = await Testimonial.create({
        name: req.body.name,
        testimonial: req.body.testimonial,
        image: req.body.image,
    });
    res.status(200).json({ status: "success", testimonial: newTestimonial });
});
exports.getTestimonial = catchAsync(async (req, res, next) => {

    const allTestimonial = await Testimonial.find();
    res.status(200).json({ status: "success", testimonial: allTestimonial });
});