const catchAsync = require("../utils/catchAsync");

exports.getHomepage = catchAsync(async (req, res, next) => {
  console.log("Homepage");

  res.status(200).send("Homepage");
});
