const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Book = require("./../models/bookModels");
const sendEmail = require("../utils/email");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saveImage =async (req, res, next) => {
}
exports.createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create({
    publisher_id: req.user.id,
    title: req.body.title,
    writer: req.body.writer,
    writerDescription: req.body.writerDescription,
    voiceover: req.body.voiceover,
    description: req.body.description,
    type: req.body.type,
    paidType: req.body.paidType,
    publishingType: req.body.publishingType,
    profile: req.body.profile,
  });  
  res.status(200).json({ status: "success", book: newBook });
});  