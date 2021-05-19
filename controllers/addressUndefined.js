const { UndefinedAddress } = require('../constants/constants');

const NotFoundError = require('../errors/not-fount-err');

const displayUndefinedAddress = (req, resm, next) => {
  next(new NotFoundError(UndefinedAddress));
};

module.exports = displayUndefinedAddress;
