require('dotenv').config();

const { DB_URL } = process.env;

const mongoUrl = process.env.NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/bitfilmsdb';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
  useUnifiedTopology: true,
});

const allRouters = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3001 } = process.env;

app.use(bodyParser.json());

app.use(requestLogger);

const options = {
  origin: [
    'http://localhost:3000',
    'http://api.sams.domain.students.nomoredomains.rocks',
    'http://sams.domain.students.nomoredomains.rocks',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  reflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
  useUnifiedTopology: true,
};

app.use('*', cors(options));

app.use('/', allRouters);

app.use(errorLogger);

app.use(errors());

app.use('*', errorHandler);

app.listen(PORT, () => {});
