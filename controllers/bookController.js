const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Book = require("./../models/bookModels");
const sendEmail = require("../utils/email");
const jwt = require("jsonwebtoken");
const Episode = require("../models/episodeModels");
const bcrypt = require("bcrypt");
const Comments = require("../models/commentModels");
const User = require("../models/useModels");
const saveImage = async (req, res, next) => {
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
exports.addEpisode = catchAsync(async (req, res, next) => {
  const newEpisode = await Episode.create({
    book_id: req.body.book_id,
    title: req.body.title,
    description: req.body.description,
    part: req.body.part,
    selectDate: req.body.selectDate,
    publishingType: req.body.publishingType,
    paidType: req.body.paidType,
    audioUrl: req.body.audioUrl,
  });
  res.status(200).json({ status: "success", book: newEpisode });
});
exports.addComment = catchAsync(async (req, res, next) => {
  const addComment = await Comments.create({
    episode_id: req.body.episode_id,
    publisher_id: req.user.id,
    comment: req.body.comment,
    // data: req.body.data,
  });
  res.status(200).json({ status: "success", book: addComment });
});
exports.getAllBook = catchAsync(async (req, res, next) => {
  // const check = await User.findById("62e94032e156719f693c98a2")
  console.log("====================================================")
  // console.log(check)
  const check = await Book.aggregate([
    // {
    //   $match:
    //   {
    //     title: "title"
    //   },
    // },
    {
      $lookup: {
        from: 'Episode',
        localField: '_id',
        foreignField: 'book_id',
        as: 'Episode'
      },
    }

    // $group: { _id: '$name' }      // $lookup: {
    //   from: "Book", // collection to join
    //   localField: "_id",//field from the input documents
    //   foreignField: "publisher_id",//field from the documents of the "from" collection
    //   as: "Book"// output array field
    // }

    // },

  ])
  console.log(check)
  console.log("====================================================")
  res.status(200).json({ status: "success", book: check });
});
