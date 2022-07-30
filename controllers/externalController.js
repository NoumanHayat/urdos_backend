const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const v4 = require("uuid");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const fetch = require("fetch").fetchUrl;
exports.searchFood = catchAsync(async (req, res, next) => {
  const response = await axios.post(
    `https://trackapi.nutritionix.com/v2/natural/nutrients`,
    {
      query: "pizza",
    },
    {
      headers: {
        Connection: "keep-alive",
        "Content-Type": "application/json",
        "x-app-id": "0c77ef17",
        "x-app-key": "9d318186320499a030ae51573a28f342",
      },
    }
  );
  console.log(response.data.foods[0]);
  res.send(200, response.data.foods[0]);
});
exports.exercisedb = catchAsync(async (req, res, next) => {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises",
    headers: {
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      "X-RapidAPI-Key": "fa2b0918fcmsh7fee6645c618c82p1da69djsnab5407aca4c4",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      // const jsonData = response.data.json();
      // destructure the response and create a new object with the same properties
      const newData = response.data.map(({ id, name }) => ({
        item: name,
        id,
      }));
      const responseData =newData.slice(0, 104)
      res.send(200, responseData);
    })
    .catch(function (error) {
      console.error(error);
    });
});
