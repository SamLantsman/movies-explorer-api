const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const NotFoundError = require('../errors/not-fount-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-err');
const {
  createUserBadRequest, createUserConflict, loginUnauthorised, getUserNotFoundId, getUserNotFound,
  updateUserNotFound, updateUserBadRequest, updateUserConflict,
} = require('../constants/constants');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => UserModel.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      data:
      {
        email: user.email,
        _id: user._id,
        name: user.name,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(createUserBadRequest));
      } else if (err.name === 'MongoError') {
        next(new ConflictError(createUserConflict));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError(loginUnauthorised));
    });
};

const getUserInfo = (req, res, next) => UserModel.findById(req.user._id)
  .orFail(() => new NotFoundError(getUserNotFoundId))
  .then((user) => {
    if (user.length === 0) {
      throw new NotFoundError(getUserNotFound);
    } res.send(user);
  })
  .catch((err) => {
    next(err);
  });

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user._id;
  UserModel.findByIdAndUpdate(id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError(updateUserNotFound))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.reason === null) {
        next(new BadRequestError(updateUserBadRequest));
      } else if (err.name === 'MongoError') {
        next(new ConflictError(updateUserConflict));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser, login, getUserInfo, updateUserInfo,
};
