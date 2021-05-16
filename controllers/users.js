const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const NotFoundError = require('../errors/not-fount-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-err');

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
        name: name,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.name === 'MongoError') {
        next(new ConflictError('Пользовотель с таким емейлом уже зарегистрирован. Идите логиньтесь.'));
      }
      next(err);
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
    .catch((err) => {
      next(new UnauthorizedError('У вас не вышло войти. Возможно, вы не зарегистированы?'));
    });
};

const getUserInfo = (req, res, next) => UserModel.findById(req.user._id)
  .orFail(() => new NotFoundError('Пользователь по заданному id отсутствует в базе'))
  .then((user) => {
    if (user.length === 0) {
      throw new NotFoundError('Пользователей нету, сорян(');
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
      .orFail(new NotFoundError('Такого кользователя не сущесвует, попробуйте другой айди'))
      .then((user) => {
        res.send({ data: user });
      })
      .catch((err) => {
        if (err.name === 'ValidationError' || err.reason === null) {
          next(new BadRequestError('Переданы некорректные данные. Возможно, вы заполнили не все поля в теле запроса.'));
        } else if (err.name === 'MongoError') {
          next(new ConflictError('Такой емейл уже зарегистрирован в базе. Попробуйте использоват другой или залогиньтесь по указанным вами емейлом.'))
        } next(err);
      });
  };

module.exports = {
   createUser, login, getUserInfo, updateUserInfo
};