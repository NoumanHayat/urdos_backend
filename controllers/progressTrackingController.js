const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const dailyWeight = require("./../models/dailyWeight");
const scModels = require("./../models/scModels");
const meals = require("./../models/calModels");

exports.getWeight = catchAsync(async (req, res, next) => {
  const response = await dailyWeight.find({ UserId: req.user.id }).sort({
    Date: -1,
  });

  // var resp = Array(response.length);
  // for (var i = 0; i < response.length; i++) {
  //   const d=response[i].Date.getMonth()+"-"+response[i].Date.getDate();
  //   resp[i] = {
  //     weight: response[i].weight,
  //     Date: response[i].Date.toUTCString(),
  //     bodyFatPercentage: response[i].bodyFatPercentage,
  //     _id: response[i].bodyFatPercentage,
  //   };
  // }
  console.log("=============================================");
  console.log(response);
  var countDaily = 1;
  const DailyWeight = response.filter((e) => {
    var today = new Date();
    let newtoday = today.getTime() % 86400000;
    let newttoday = today.getTime() - (newtoday + countDaily * 86400000);
    if (e.Date.getTime() < newttoday && countDaily > 8) {
    } else {
      countDaily = countDaily + 1;

      return e;
    }
  });

  var countWeekly = 0;
  var today = new Date();
  let todaysTime = today.getTime() % 86400000;
  const WeeklyWeight = response.filter((e) => {
    let weekStart = today.getTime() - todaysTime - countWeekly * 6 * 86400000;
    if (e.Date.getTime() <= weekStart && countWeekly < 8) {
      countWeekly = countWeekly + 1;
      return e;
    } else {
    }
  });
  //=======================================================================
  var countmonthly = 0;

  const monthlyWeight = response.filter((e) => {
    let monthlyStart =
      today.getTime() - todaysTime - countmonthly * 30 * 86400000;
    if (e.Date.getTime() <= monthlyStart && countmonthly < 8) {
      countmonthly = countmonthly + 1;
      return e;
    } else {
    }
  });

  var DailyLabel = new Array();
  var DailyData = new Array();

  var weeklyLabel = new Array();
  var weeklyData = new Array();

  var MonthlyLabel = new Array();
  var MonthlyData = new Array();
  try {
    for (let i = 0; i < 7; i++) {
      DailyLabel[i] =
        DailyWeight[i].Date.getDate() + "-" + DailyWeight[i].Date.getMonth();
      DailyData[i] = DailyWeight[i].weight;

      //=================================================
      weeklyLabel[i] =
        WeeklyWeight[i].Date.getDate() + "-" + WeeklyWeight[i].Date.getMonth();
      weeklyData[i] = WeeklyWeight[i].weight;
      //=================================================
      MonthlyLabel[i] =
        monthlyWeight[i].Date.getDate() +
        "-" +
        monthlyWeight[i].Date.getMonth();
      MonthlyData[i] = monthlyWeight[i].weight;
    }
  } catch (e) {
    console.log(e);
  }
  const detail = {
    DailyLabel,
    weeklyLabel,
    MonthlyLabel,
    DailyData,
    weeklyData,
    MonthlyData,
  };
  res.send(200, detail);
});
exports.getBodyFatPercentage = catchAsync(async (req, res, next) => {
  const response = await dailyWeight.find({ UserId: req.user.id }).sort({
    Date: -1,
  });
  var countDaily = 1;
  const DailyWeight = response.filter((e) => {
    var today = new Date();
    let newtoday = today.getTime() % 86400000;
    let newttoday = today.getTime() - (newtoday + countDaily * 86400000);
    if (e.Date.getTime() < newttoday && countDaily > 8) {
    } else {
      countDaily = countDaily + 1;

      return e;
    }
  });

  var countWeekly = 0;
  var today = new Date();
  let todaysTime = today.getTime() % 86400000;
  const WeeklyWeight = response.filter((e) => {
    let weekStart = today.getTime() - todaysTime - countWeekly * 6 * 86400000;
    if (e.Date.getTime() <= weekStart && countWeekly < 8) {
      countWeekly = countWeekly + 1;
      return e;
    } else {
    }
  });
  //=======================================================================
  var countmonthly = 0;

  const monthlyWeight = response.filter((e) => {
    let monthlyStart =
      today.getTime() - todaysTime - countmonthly * 30 * 86400000;
    if (e.Date.getTime() <= monthlyStart && countmonthly < 8) {
      countmonthly = countmonthly + 1;
      return e;
    } else {
    }
  });

  var DailyLabel = new Array();
  var DailyData = new Array();

  var weeklyLabel = new Array();
  var weeklyData = new Array();

  var MonthlyLabel = new Array();
  var MonthlyData = new Array();
  try {
    for (let i = 0; i < 7; i++) {
      DailyLabel[i] =
        DailyWeight[i].Date.getDate() + "-" + DailyWeight[i].Date.getMonth();
      DailyData[i] = DailyWeight[i].bodyFatPercentage;

      //=================================================
      weeklyLabel[i] =
        WeeklyWeight[i].Date.getDate() + "-" + WeeklyWeight[i].Date.getMonth();
      weeklyData[i] = WeeklyWeight[i].bodyFatPercentage;
      //=================================================
      MonthlyLabel[i] =
        monthlyWeight[i].Date.getDate() +
        "-" +
        monthlyWeight[i].Date.getMonth();
      MonthlyData[i] = monthlyWeight[i].bodyFatPercentage;
    }
  } catch (e) {
    console.log(e);
  }

  const detail = {
    DailyLabel,
    weeklyLabel,
    MonthlyLabel,
    DailyData,
    weeklyData,
    MonthlyData,
  };
  res.send(200, detail);
});
exports.getMaintenanceCalories = catchAsync(async (req, res, next) => {
  const MaintenanceCalories = await scModels
    .find({ UserId: req.user.id })
    .sort({
      Date: -1,
    });

  console.log(MaintenanceCalories);
  // let response = new Array();
  // let count = 0;
  // MaintenanceCalories.forEach((e) => {
  //   let result = e.Calories;

  //   //  +
  //   // ((e.Calories * 0.45) / 4) +
  //   // ((e.Calories * 0.6) / 4) +
  //   // ((e.Calories * 0.2) / 9);

  //   response[count] = result;
  //   count++;
  // });

  var weeklyLabel = new Array();
  var MonthlyLabel = new Array();

  var weeklyData = new Array();
  var MonthlyData = new Array();

  //===========================================================
  var countWeekly = 0;
  var today = new Date();
  let todaysTime = today.getTime() % 86400000;
  const WeeklyMaintenanceCalories = MaintenanceCalories.filter((e) => {
    let weekStart = today.getTime() - todaysTime - countWeekly * 6 * 86400000;
    if (e.Date.getTime() <= weekStart && countWeekly < 8) {
      countWeekly = countWeekly + 1;
      return e;
    } else {
    }
  });
  var count = 0;
  WeeklyMaintenanceCalories.forEach((e) => {
    weeklyLabel[count] = e.Date.getDate() + "-" + e.Date.getMonth();
    weeklyData[count] = e.Calories;
    count++;
  });

  //=================================================================

  var countmonthly = 0;

  const monthlyMaintenanceCalories = MaintenanceCalories.filter((e) => {
    let monthlyStart =
      today.getTime() - todaysTime - countmonthly * 30 * 86400000;
    if (e.Date.getTime() <= monthlyStart && countmonthly < 8) {
      countmonthly = countmonthly + 1;
      return e;
    } else {
    }
  });

  count = 0;
  monthlyMaintenanceCalories.forEach((e) => {
    MonthlyLabel[count] = e.Date.getDate() + "-" + e.Date.getMonth();
    MonthlyData[count] = e.Calories;
    count++;
  });
   const detail = {
      weeklyLabel,
      MonthlyLabel,
      weeklyData,
      MonthlyData,
    };


  res.send(200, detail);
});
exports.getCalories = catchAsync(async (req, res, next) => {
  const meal = await meals.find({ UserId: req.user.id }).sort({
    Date: -1,
  });

  // const detail =

  let dailyValue = new Array();
  let dailyLabel = new Array();
  let weeklyValue = [0, 0, 0, 0, 0, 0, 0];
  let weeklyLabel = ["", "", "", "", "", "", ""];
  let monthlyValue = [0, 0, 0, 0, 0, 0, 0];
  let monthlyLabel = ["", "", "", "", "", "", ""];

  let check = 0;
  let sum = meal[0].Calories;

  for (let i = 1; i < meal.length; ++i) {
    if (meal[i].Date.getDate() === meal[i - 1].Date.getDate()) {
      sum = sum + meal[i].Calories;
    } else {
      dailyValue[check] = sum;
      dailyLabel[check] =
        meal[i - 1].Date.getDate() + "-" + meal[i - 1].Date.getMonth();
      sum = meal[i].Calories;
      check++;
    }
  }
  dailyValue = dailyValue.slice(0, 6);
  dailyLabel = dailyLabel.slice(0, 6);
  //===================================================================================
  let today = new Date();
  let todaysTime = today.getTime() % 86400000;
  let newDay = today.getTime() + -todaysTime;

  let count = 0;
  let weekEnd = newDay;
  let weekStart = newDay - 7 * 86400000;

  const week1 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week1.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Calories;
  });

  let tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week2 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week2.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Calories;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week3 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week3.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Calories;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week4 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week4.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Calories;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week5 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week5.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Calories;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week6 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week6.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Calories;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week7 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week7.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Calories;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================================================================================================
  //================================================================================================================
  //================================================================================================================
  count = 0;
  monthEnd = newDay;
  monthStart = newDay - 30 * 86400000;

  const month1 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month1.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Calories;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month2 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month2.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Calories;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month3 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month3.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Calories;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month4 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month4.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Calories;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month5 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month5.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Calories;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month6 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month6.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Calories;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month7 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month7.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Calories;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //=============================================================================================

  const detail = {
    DailyLabel: dailyLabel,
    weeklyLabel: weeklyLabel,
    MonthlyLabel: monthlyLabel,
    DailyData: dailyValue,
    weeklyData: weeklyValue,
    MonthlyData: monthlyValue,
  };

  res.send(detail);
});
exports.getProtein = catchAsync(async (req, res, next) => {
  const meal = await meals.find({ UserId: req.user.id }).sort({
    Date: -1,
  });

  // const detail =

  let dailyValue = new Array();
  let dailyLabel = new Array();
  let weeklyValue = [0, 0, 0, 0, 0, 0, 0];
  let weeklyLabel = ["", "", "", "", "", "", ""];
  let monthlyValue = [0, 0, 0, 0, 0, 0, 0];
  let monthlyLabel = ["", "", "", "", "", "", ""];

  let check = 0;
  let sum = meal[0].Protein;

  for (let i = 1; i < meal.length; i++) {
    if (meal[i].Date.getDate() === meal[i - 1].Date.getDate()) {
      sum = sum + meal[i].Protein;
    } else {
      dailyValue[check] = sum;
      dailyLabel[check] =
        meal[i - 1].Date.getDate() + "-" + meal[i - 1].Date.getMonth();
      sum = meal[i].Protein;
      check++;
    }
  }
  dailyValue = dailyValue.slice(0, 6);
  dailyLabel = dailyLabel.slice(0, 6);
  //===================================================================================
  let today = new Date();
  let todaysTime = today.getTime() % 86400000;
  let newDay = today.getTime() + -todaysTime;

  let count = 0;
  let weekEnd = newDay;
  let weekStart = newDay - 7 * 86400000;

  const week1 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week1.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Protein;
  });

  let tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week2 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week2.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Protein;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week3 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week3.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Protein;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week4 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week4.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Protein;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week5 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week5.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Protein;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week6 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week6.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Protein;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week7 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week7.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Protein;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================================================================================================
  //================================================================================================================
  //================================================================================================================
  count = 0;
  monthEnd = newDay;
  monthStart = newDay - 30 * 86400000;

  const month1 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month1.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Protein;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month2 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month2.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Protein;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month3 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month3.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Protein;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month4 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month4.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Protein;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month5 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month5.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Protein;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month6 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month6.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Protein;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month7 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month7.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Protein;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //=============================================================================================

  const detail = {
    DailyLabel: dailyLabel,
    weeklyLabel: weeklyLabel,
    MonthlyLabel: monthlyLabel,
    DailyData: dailyValue,
    weeklyData: weeklyValue,
    MonthlyData: monthlyValue,
  };

  res.send(detail);
});
exports.getCarbs = catchAsync(async (req, res, next) => {
  const meal = await meals.find({ UserId: req.user.id }).sort({
    Date: -1,
  });

  // const detail =

  let dailyValue = new Array();
  let dailyLabel = new Array();
  let weeklyValue = [0, 0, 0, 0, 0, 0, 0];
  let weeklyLabel = ["", "", "", "", "", "", ""];
  let monthlyValue = [0, 0, 0, 0, 0, 0, 0];
  let monthlyLabel = ["", "", "", "", "", "", ""];

  let check = 0;
  let sum = meal[0].Carbs;

  for (let i = 1; i < meal.length; i++) {
    if (meal[i].Date.getDate() === meal[i - 1].Date.getDate()) {
      sum = sum + meal[i].Carbs;
    } else {
      dailyValue[check] = sum;
      dailyLabel[check] =
        meal[i - 1].Date.getDate() + "-" + meal[i - 1].Date.getMonth();
      sum = meal[i].Carbs;
      check++;
    }
  }
  dailyValue = dailyValue.slice(0, 6);
  dailyLabel = dailyLabel.slice(0, 6);
  //===================================================================================
  let today = new Date();
  let todaysTime = today.getTime() % 86400000;
  let newDay = today.getTime() + -todaysTime;

  let count = 0;
  let weekEnd = newDay;
  let weekStart = newDay - 7 * 86400000;

  const week1 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week1.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Carbs;
  });

  let tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week2 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week2.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Carbs;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week3 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week3.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Carbs;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week4 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week4.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Carbs;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week5 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week5.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Carbs;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week6 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week6.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Carbs;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week7 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week7.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Carbs;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================================================================================================
  //================================================================================================================
  //================================================================================================================
  count = 0;
  monthEnd = newDay;
  monthStart = newDay - 30 * 86400000;

  const month1 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month1.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Carbs;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month2 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month2.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Carbs;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month3 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month3.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Carbs;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month4 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month4.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Carbs;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month5 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month5.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Carbs;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month6 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month6.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Carbs;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month7 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month7.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Carbs;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //=============================================================================================

  const detail = {
    DailyLabel: dailyLabel,
    weeklyLabel: weeklyLabel,
    MonthlyLabel: monthlyLabel,
    DailyData: dailyValue,
    weeklyData: weeklyValue,
    MonthlyData: monthlyValue,
  };

  res.send(detail);
});
exports.getFats = catchAsync(async (req, res, next) => {
  const meal = await meals.find({ UserId: req.user.id }).sort({
    Date: -1,
  });

  // const detail =

  let dailyValue = new Array();
  let dailyLabel = new Array();
  let weeklyValue = [0, 0, 0, 0, 0, 0, 0];
  let weeklyLabel = ["", "", "", "", "", "", ""];
  let monthlyValue = [0, 0, 0, 0, 0, 0, 0];
  let monthlyLabel = ["", "", "", "", "", "", ""];

  let check = 0;
  let sum = meal[0].Fats;

  for (let i = 1; i < meal.length; i++) {
    if (meal[i].Date.getDate() === meal[i - 1].Date.getDate()) {
      sum = sum + meal[i].Fats;
    } else {
      dailyValue[check] = sum;
      dailyLabel[check] =
        meal[i - 1].Date.getDate() + "-" + meal[i - 1].Date.getMonth();
      sum = meal[i].Fats;
      check++;
    }
  }
  dailyValue = dailyValue.slice(0, 6);
  dailyLabel = dailyLabel.slice(0, 6);
  //===================================================================================
  let today = new Date();
  let todaysTime = today.getTime() % 86400000;
  let newDay = today.getTime() + -todaysTime;

  let count = 0;
  let weekEnd = newDay;
  let weekStart = newDay - 7 * 86400000;

  const week1 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week1.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Fats;
  });

  let tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week2 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week2.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Fats;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week3 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week3.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Fats;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week4 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week4.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Fats;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week5 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week5.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Fats;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week6 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week6.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Fats;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================
  count = count + 1;
  weekEnd = weekEnd - 7 * 86400000;
  weekStart = weekStart - 7 * 86400000;

  const week7 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: weekStart } },
        { Date: { $lte: weekEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  week7.forEach((e) => {
    weeklyValue[count] = weeklyValue[count] + e.Fats;
  });
  tempDate = new Date(weekEnd);

  weeklyLabel[count] = tempDate.getDate() + "-" + tempDate.getMonth();
  //===========================================================================================================================
  //================================================================================================================
  //================================================================================================================
  count = 0;
  monthEnd = newDay;
  monthStart = newDay - 30 * 86400000;

  const month1 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month1.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Fats;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month2 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month2.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Fats;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month3 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month3.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Fats;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month4 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month4.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Fats;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month5 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month5.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Fats;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month6 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month6.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Fats;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //==========================================================================================================================
  count = count + 1;
  monthEnd = monthEnd - 30 * 86400000;
  monthStart = monthStart - 30 * 86400000;

  const month7 = await meals
    .find({
      $and: [
        { UserId: req.user.id },
        { Date: { $gte: monthStart } },
        { Date: { $lte: monthEnd } },
      ],
    })
    .sort({
      Date: -1,
    });

  month7.forEach((e) => {
    monthlyValue[count] = monthlyValue[count] + e.Fats;
  });

  tempDate = new Date(monthEnd);
  monthlyLabel[count] = tempDate.getMonth() + "-" + tempDate.getUTCFullYear();
  //=============================================================================================

  const detail = {
    DailyLabel: dailyLabel,
    weeklyLabel: weeklyLabel,
    MonthlyLabel: monthlyLabel,
    DailyData: dailyValue,
    weeklyData: weeklyValue,
    MonthlyData: monthlyValue,
  };

  res.send(detail);
});
