const MovieModel = require('../models/movie');
const NotFoundError = require('../errors/not-fount-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-err');

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, 
  } = req.body;

 MovieModel.create({
      country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, owner: req.user._id,
    })
    .then((movie) => res.send({
      data:
      {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        _id: movie._id
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.name === 'MongoError') {
        next(new ConflictError('Фильм с таким атрибутом уже сохранен.'));
      }
      next(err);
    });
};

const getMoviesInfo = (req, res, next) => MovieModel.find({})
  .then((movies) => {
    if (movies.length === 0) {
      throw new NotFoundError('В базе нет ни одного фильма.');
    } res.send(movies);
  })
  .catch(next);

const deleteSavedMovie = (req, res, next) => {
  MovieModel.findById(req.params.movieId)
    .orFail(new BadRequestError('Нет такого фильма, попробуйте другой айди'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new BadRequestError('Чужие фильмы удалять нельзя');
      } else {
        MovieModel.deleteOne(movie)
          .then(() => res.send({ message: 'Удалил фильм, все ОК' }));
        }
    })
    .catch((err) => {
      console.log(err);
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Такого фильма нет, проверьте айди.'));
      } next(err);
  });
};
  

module.exports = {
  createMovie, getMoviesInfo, deleteSavedMovie
};