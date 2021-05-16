require('dotenv').config();

const { DB_URL} = process.env;

const mongoUrl = process.env.NODE_ENV === 'production' ? DB_URL : 'dev-url'
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(`mongodb://localhost:27017/${mongoUrl}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
  useUnifiedTopology: true 
})
  .then(() => { console.log('База Mongoose подключилась'); });

  const usersRouter = require('./routes/users');
  const moviesRouter = require('./routes/movies');
  const { createUser, login } = require('./controllers/users');


  const { PORT = 3001 } = process.env;

  app.use(bodyParser.json());

  app.use(requestLogger);

  const options = {
    origin: [
      'http://localhost:3000',
      'http://api.sams.domain.students.nomoredomains.icu',
      'http://sams.domain.students.nomoredomains.icu',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    reflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
    credentials: true,
    useUnifiedTopology: true,
  };

  app.use('*', cors(options));

  app.post('/signup', celebrate({
    body: Joi.object().keys({
      password: Joi.string().required().min(1).max(30),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    }),
  }), createUser);

  app.post('/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required().min(1).max(30),
    }),
  }), login);

  app.use(auth);

  app.use('/', usersRouter);
  app.use('/', moviesRouter);

  app.use(errorLogger);

  app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

   
  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT} port`);
  });

