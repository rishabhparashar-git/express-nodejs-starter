require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//initiating SERVERR
require('./startup/index.startup')(app);
