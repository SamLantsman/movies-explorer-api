const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');
const { userSchemaEmailMessage, userSchemaEmailDefaultName, userSchemaLoginMessage } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: userSchemaEmailMessage,
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: userSchemaEmailDefaultName,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(userSchemaLoginMessage));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(userSchemaLoginMessage));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
