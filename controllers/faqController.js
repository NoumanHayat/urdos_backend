const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const sendEmail = require("../utils/email");
const bcrypt = require("bcrypt");
const User = require("./../models/useModels");
const FAQ = require("./../models/faqModels");
const saveImage = async (req, res, next) => {
}

exports.addFaq = catchAsync(async (req, res, next) => {

    const newFaq = await FAQ.create({
        question: req.body.question,
        solution: req.body.solution,
    });
    res.status(200).json({ status: "success", Faq: newFaq });
});
exports.getFaq = catchAsync(async (req, res, next) => {

    const allFaq = await FAQ.find();
    res.status(200).json({ status: "success", Faq: allFaq });
}); 