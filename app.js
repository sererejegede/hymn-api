const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes/index');

// Cross Origin Resource Sharing
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
  if (req.header === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE')
    return res.status(200).json({});
  }
  next();
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/hymns', routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || 'Internal Server Error'
  })
});

module.exports = app;