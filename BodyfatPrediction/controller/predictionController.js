const SimpleLinearRegression = require("ml-regression-simple-linear");
const input = [
  85.2, 83, 87.9, 86.4, 94.4, 90.7, 82.5, 88.6, 83.6, 90.9, 88.5, 101.8, 91.6, 92.8, 96.4, 96.4, 100, 97.5, 100.5, 89.6, 80, 76.4, 95.9, 76.3, 98.8,
  79.7, 73.9, 88.7, 74.6, 88.7, 79.1, 100.5, 115.6, 113.1, 100.9, 98.8, 148.1, 108.1, 126.2, 83.5, 104.3, 104.3, 76, 111.2, 84.5, 79.5, 81.5, 73.7,
  86.7, 77.9, 83.4, 82, 70.4, 79.6, 77.6, 104.2, 100, 99.8, 104.8, 105.3, 98.3, 102.4, 105.5, 99.7, 100.3, 94.7, 83.9, 86.6, 78.4, 84.6, 82.9, 91.5,
  82.8, 78.8, 76, 83.3, 98.6, 95.4, 97.8, 89, 95.8, 99.8, 95, 81.8, 88.1, 89.7, 94.9, 86.5, 90.9, 86, 95.6, 97.5, 83.1, 88.8, 91.6, 99.2, 88.2, 93.2,
  86.7, 92, 94, 89.2, 98.6, 95.5, 102.8, 88.7, 95, 101.6, 90.6, 105, 87.3, 89.6, 92.4, 86.6, 92.3, 95, 92.4, 87.5, 99.2, 98.1, 83.3, 86.1, 84.1, 90,
  90, 92.1, 89.9, 87, 93.5, 90.3, 78, 90.1, 89.4, 87.2, 101.1, 86.1, 99.8, 98.6, 106.6, 93.1, 88.5, 93, 77.1, 85.3, 99.1, 100.5, 76.5, 81.9, 91, 77.6,
  102.9, 72.8, 88.2, 106.8, 105, 100.1, 76.6, 90.8, 83.5, 95.6, 92.4, 81.2, 92.1, 106, 83.4, 95.1, 100.4, 90.8, 115.9, 75, 90.4, 81.9, 90.3, 108.8,
  79.4, 83.2, 110.3, 92.7, 104.5, 69.4, 104.6, 90.3, 86.8, 90.4, 83.7, 109.3, 98.9, 101.2, 83.6, 98, 80.6, 113.7, 105.7, 85.6, 94.1, 96.6, 89.7, 86,
  78, 89.7, 103.1, 89.1, 85.7, 113.9, 93.9, 101.3, 89.2, 83.9, 79.4, 84.4, 89.7, 96.3, 104, 97.6, 122.1, 81.1, 87.6, 88.7, 81.5, 110.4, 91.8, 100,
  82.8, 87.6, 78.2, 96.7, 95.3, 91.1, 86.4, 93, 89.4, 96.7, 94.9, 95.6, 98.2, 88.1, 113.8, 82.8, 93.3, 100.5, 79.7, 109, 113.4, 106.1, 107.6, 84.3,
  83.6, 118, 105, 111.5, 101.3, 108.5,
];
const output = [
  12.3, 6.1, 25.3, 20.9, 10.4, 28.7, 4.1, 19.2, 12.4, 11.7, 7.8, 20.8, 22.1, 20.9, 29, 21.2, 7.1, 22.9, 19.1, 16, 16.5, 17.7, 3.7, 15.2, 7.9, 15.6,
  22.9, 8.8, 11.9, 5.7, 11.8, 21.3, 32.3, 40.1, 24.2, 28.4, 35.2, 32.6, 34.5, 32.9, 31.6, 14, 3.7, 13.9, 10.8, 7.7, 13.6, 4, 32, 10.2, 8, 6.6, 5.6,
  22.6, 20.4, 28, 6.3, 31.5, 24.6, 3.9, 26.1, 25.8, 30.7, 30, 32.3, 29.8, 6.3, 21.5, 12.9, 24.3, 13.8, 13.5, 11.8, 18.5, 8.8, 22.2, 21.5, 18.8, 31.4,
  26.8, 18.4, 8.5, 27, 8.8, 26.6, 23.1, 8.3, 14.9, 14.1, 18.2, 8.5, 20.5, 24.9, 9, 27, 9.6, 17.4, 22.2, 21.2, 20.4, 20.1, 22.3, 25.4, 18, 11.3, 18.3,
  17.3, 19.7, 17.8, 28, 19.3, 21.4, 22.1, 16.7, 21.3, 20.1, 25.8, 26.7, 13.9, 25.3, 14.7, 16, 18.1, 17.5, 27.2, 27.9, 13.8, 17.4, 18.1, 14.9, 20.8,
  22.7, 23.6, 24.4, 26.1, 21.8, 29.4, 27.1, 20.4, 24.9, 22.4, 9.4, 18.3, 10.3, 14.2, 29.6, 19.2, 23.3, 25.2, 9.4, 19.6, 16.5, 10.1, 21, 17.3, 5.3,
  31.2, 22.5, 10, 12.5, 9.4, 14.6, 15.1, 19.2, 13, 27.3, 34.3, 21.8, 20.3, 3, 0.7, 16.5, 25.3, 20.5, 9.9, 16.9, 22.5, 29.9, 16.9, 26.6, 0, 11.5, 12.1,
  17.5, 13.1, 20.5, 20.4, 24.4, 23.6, 8.6, 38.1, 24.7, 11.4, 15.9, 22.8, 17.7, 25.5, 23.6, 6.6, 12.2, 28.7, 22, 22.1, 34.8, 6, 16.6, 32.8, 9.6, 32.9,
  10.8, 27.2, 7.1, 18.7, 19.5, 19.5, 47.5, 24.5, 13.6, 15, 7.5, 12.4, 26, 11.5, 5.2, 10.9, 14.8, 25.2, 12.5, 14.9, 10.6, 17, 16.1, 15.4, 18.6, 26.7,
  27.3, 25.8, 29.9, 12.4, 17, 24.8, 35, 30.4, 15.2, 32.6, 11, 30.2, 29.3, 26, 33.6, 31.9, 29,
];

const regression = new SimpleLinearRegression(input, output);
//enter waist in cms.
const predictBodyFat = (waistInCm) => {
  return regression.predict(waistInCm);
};
module.exports = predictBodyFat;