const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const v4 = require("uuid");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.Stripe_Secret_key);
const Payment = require("./../models/paymentModels");
exports.addPayment = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const token = await stripe.tokens.create({
    card: {
      number: req.body.cardNumber,
      exp_month: 5,
      exp_year: 2023,
      cvc: req.body.cvc,
    },
  });

  const check = await stripe.charges
    .create({
      amount: req.body.amount * 100,
      source: token.id,
      currency: "usd",
    })
    .then(async function () {
      console.log("Charge Successful");
      var today = new Date();
      let ExpireDate = today.getTime() + 86400000 * 30;
      if (req.body.packageType === "BASIC") {
        ExpireDate = today.getTime() + 86400000 * 30;
      } else if (req.body.packageType === "STANDARD") {
        ExpireDate = today.getTime() + 86400000 * 60;
      } else {
        ExpireDate = today.getTime() + 86400000 * 90;
      }

      await Payment.create({
        packageType: req.body.packageType,
        UserId: req.user.id,
        Date: today,
        ExpireDate: ExpireDate,
      });
      res.send(200, "Successfully purchased items");
    })
    .catch(function (e) {
      console.log("Charge Fail");
      console.log(e);
      res.send(400, "Charge Fail");
    });
});
exports.checkPayment = catchAsync(async (req, res, next) => {
  const data = new Date();
  const reasult = await Payment.findOne({ UserId: req.user.id }).sort({
    Date: -1,
  });

  const available =
    reasult.ExpireDate.getTime() - data.getTime() > 0 ? true : false;

  // .sort({ date_register: -1 })
  const user=req.user;
  const reponce = {
    user,
    packageType: reasult.packageType,
    Date: reasult.Date,
    ExpireDate: reasult.ExpireDate,
    available: available,
  };
  res.send(200, reponce);
});
