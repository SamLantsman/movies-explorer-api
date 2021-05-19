const MovieModel = require('../models/movie');
const NotFoundError = require('../errors/not-fount-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  createMovieBadRequest, createMovieConflict, getMovieNotFound, deleteMovieNotFound,
  deleteMovieForbidden, deleteMovieBadRequest,
} = require('../constants/constants');

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail,
    movieId,
  } = req.body;

  MovieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    owner: req.user._id,
    movieId,
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
        movieId: movie._id,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(createMovieBadRequest));
      } else if (err.name === 'MongoError') {
        next(new ConflictError(createMovieConflict));
      } else {
        next(err);
      }
    });
};

const getMoviesInfo = (req, res, next) => MovieModel.find({})
  .then((movies) => {
    if (movies.length === 0) {
      throw new NotFoundError(getMovieNotFound);
    } res.send(movies);
  })
  .catch(next);

const deleteSavedMovie = (req, res, next) => {
  MovieModel.findById(req.params.movieId)
    .orFail(new NotFoundError(deleteMovieNotFound))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(deleteMovieForbidden);
      } else {
        MovieModel.deleteOne(movie)
          .then(() => res.send({ data: movie }));
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError(deleteMovieBadRequest));
      } next(err);
    });
};

module.exports = {
  createMovie, getMoviesInfo, deleteSavedMovie,
};
