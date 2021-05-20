const { serverError } = require('../constants/constants');

const errorHandler = ((err, req, res) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? serverError
        : message,
    });
});

module.exports = errorHandler;
