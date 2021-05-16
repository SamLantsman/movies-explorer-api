const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const {
  createMovie, getMoviesInfo, deleteSavedMovie
} = require('../controllers/movies');

 
router.get('/movies', getMoviesInfo);

router.post('/movies', createMovie);

router.delete('/movies/:movieId', deleteSavedMovie);

module.exports = router;
