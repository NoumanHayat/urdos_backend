const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  packageType: {
    type: String,
    Required: true,
    Default: "Trial",
  },
  UserId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Meal must belong to a user"],
  },
  Date: {
    type: Date,
    required: [true, "Please provide a date"],
  },
  ExpireDate: {
    type: Date,
    required: [true, "Please provide a date"],
  },
});
const Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;
 