const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { checkURL } = require('../constants/constants');
const {
  createMovie, getMoviesInfo, deleteSavedMovie,
} = require('../controllers/movies');

router.get('/movies', getMoviesInfo);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(4).max(56),
    director: Joi.string().required().min(1).max(747),
    duration: Joi.number().required().integer().min(1)
      .max(500),
    year: Joi.number().required().integer().min(1800)
      .max(2021),
    description: Joi.string().required().min(1).max(1000),
    image: Joi.string().required().pattern(checkURL),
    trailer: Joi.string().required().pattern(checkURL),
    thumbnail: Joi.string().required().pattern(checkURL),
    nameRU: Joi.string().required().min(4).max(56),
    nameEN: Joi.string().required().min(4).max(56),
    movieId: Joi.string().required().hex(),
  }),
}), createMovie);

router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteSavedMovie);

module.exports = router;
