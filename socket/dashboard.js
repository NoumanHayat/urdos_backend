const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
let main_Function = catchAsync(async (socket, msg) => {
    console.log("Sending");
    socket.emit("dashboard", "message");
}); 
module.exports = main_Function; 