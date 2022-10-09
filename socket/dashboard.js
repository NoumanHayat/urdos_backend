const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const Socket = require("./../models/socketModels");
const Book = require("./../models/bookModels");
const mongoose = require("mongoose");
let main_Function = catchAsync(async (socket, msg) => {
    console.log("Sending");
    const allIds = await Socket.find();
    console.log(allIds[0].Tranding);
    const check = await Book.aggregate([
        // {
        //     $lookup: {
        {
            $facet: {
                Tranding: [{
                    $match: {
                        _id: {
                            $in: allIds[0].Tranding.map(function (id) { return new mongoose.Types.ObjectId(id); })
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'Episode',
                        localField: '_id',
                        foreignField: 'book_id',
                        'pipeline': [{
                            '$sort': { 'part': 1 }
                        },
                        {
                            $lookup: {
                                from: 'Comments',
                                localField: '_id',
                                foreignField: 'episode_id',
                                'pipeline': [{
                                    '$sort': { 'date': 1 },
                                },
                                {
                                    $lookup: {
                                        from: 'User',
                                        localField: 'publisher_id',
                                        foreignField: '_id',
                                        'pipeline': [{
                                            $group: { "_id": "$_id", "name": { $first: "$name" }, "profile": { $first: "$profile" } }

                                        }],
                                        as: 'User'
                                    }
                                },

                                ],
                                as: 'Comments'
                            }
                        }
                        ],
                        as: 'Episode'
                    },

                }],
                Suggested: [{
                    $match: {
                        _id: {
                            $in: allIds[0].Suggested.map(function (id) { return new mongoose.Types.ObjectId(id); })
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'Episode',
                        localField: '_id',
                        foreignField: 'book_id',
                        'pipeline': [{
                            '$sort': { 'part': 1 }
                        },
                        {
                            $lookup: {
                                from: 'Comments',
                                localField: '_id',
                                foreignField: 'episode_id',
                                'pipeline': [{
                                    '$sort': { 'date': 1 },
                                },
                                {
                                    $lookup: {
                                        from: 'User',
                                        localField: 'publisher_id',
                                        foreignField: '_id',
                                        'pipeline': [{
                                            $group: { "_id": "$_id", "name": { $first: "$name" }, "profile": { $first: "$profile" } }

                                        }],
                                        as: 'User'
                                    }
                                },

                                ],
                                as: 'Comments'
                            }
                        }
                        ],
                        as: 'Episode'
                    },

                }]
            }
        }
    ])
    console.log(check)
    socket.emit("dashboard", check);
});
module.exports = main_Function;  