import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import session from 'express-session';
import Promise from 'bluebird';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import router from './routes';

// Create the mongo connection to store session data
// const MongoStore = require('connect-mongo')(session);
// Create express app
const app = express();

dotenv.config({ silent: process.env.NODE_ENV === 'production' });
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.Promise = Promise;
mongoose.connect(
  process.env.MONGO_URI || 'mongodb://localhost/shopping',
  { useMongoClient: true },
  console.log('connected to mongoDB')
);

// use routes for api
app.use('/api', router);

// connect static files
app.use(express.static(path.join(__dirname, 'public')));

// any routes will display these static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = process.env.PORT || 3002;

app.listen(port);
