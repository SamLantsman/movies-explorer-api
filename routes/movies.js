const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const {
  createMovie, getMoviesInfo, deleteSavedMovie,
} = require('../controllers/movies');

router.get('/movies', getMoviesInfo);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(4).max(56),
    director: Joi.string().required().min(1).max(747),
    duration: Joi.number().integer().min(1).max(500),
    year: Joi.number().integer().min(1800).max(2021),
    description: Joi.string().required().min(1).max(1000),
    image: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
    trailer: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
    thubmnail: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
    nameRU: Joi.string().required().min(4).max(56),
    nameEN: Joi.string().required().min(4).max(56),
    movieId: Joi.string().hex().length(24),
  }),
}), createMovie);

router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteSavedMovie);

module.exports = router;
