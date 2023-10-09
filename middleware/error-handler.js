const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  // custom error
  let customError = {
    //set defaults
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }
  // *** DUPLICATE EMAIL ERROR ***
  if (err.code && err.code === 11000) {
    customError.msg = `${Object.keys(err.keyValue)} already in use`;
    customError.statusCode = 400;
  }
  // *** VALIDATION ERROR ***
  if (err.name === "ValidationError") {
    console.log(Object.values(err.errors));
    // get all values for the errors key in error object
    // iterate through values we missing and take the message, then join back to the string
    customError.msg = Object.values(err.errors)
      .map((item) => {
        return item.message;
      })
      .join(",");
    customError.statusCode = 400;
  }
  //  *** CAST ERROR ***
  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
