const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { UserRouter } = require('../routes/users.routes');
const ErrorHandler = require('../middlewares/error.middlewares');

module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('tiny'));
  app.use(helmet());
  app.use(cors());

  //start of routes
  app.use('/api/users', UserRouter);

  app.use(ErrorHandler);

  //end of routes
  app.get('/', (req, res) => res.send({ error: false, message: 'SERVER IS LIVE!', result: null }));
  app.get('*', (req, res) => res.status(404).send({ error: true, message: 'Route not Found!', result: null }));
};

console.log('🛣️  Routes setup completed');
