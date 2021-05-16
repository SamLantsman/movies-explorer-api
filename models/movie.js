const mongoose = require('mongoose');

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
    min:  1,
    max: 500,
  },
  year: {
    type: Number,
    required: true,
    min:  1800,
    max: 2021,
  },
  description: {
    type: String,
    required: true,
    // minlength: 1,
    // maxlength: 747,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
        return regex.test(v);
      },
      message: 'Неверный формат ссылки на картику, попробуйте еще разок',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
        return regex.test(v);
      },
      message: 'Неверный формат ссылки на картику, попробуйте еще разок',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
        return regex.test(v);
      },
      message: 'Неверный формат ссылки на картику, попробуйте еще разок',
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
