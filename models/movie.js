const mongoose = require('mongoose');
const {
  checkURL, movieSchemaImageMessage, movieSchemaTrailerMessage, movieSchemaThumbnailMessage,
} = require('../constants/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 56,
  },
  director: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 747,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 500,
  },
  year: {
    type: Number,
    required: true,
    min: 1800,
    max: 2021,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return checkURL.test(v);
      },
      message: movieSchemaImageMessage,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return checkURL.test(v);
      },
      message: movieSchemaTrailerMessage,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return checkURL.test(v);
      },
      message: movieSchemaThumbnailMessage,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    require: true,
    type: String,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
