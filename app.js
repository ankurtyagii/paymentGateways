/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');

const app = express();

const logger = require('./logger');
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/payment', routes);

app.listen(process.env.SERVER_PORT, async () => {
  try {
    logger.info('Server listening at port number 3000');
  } catch (error) {
    logger.error(error);
  }
});
