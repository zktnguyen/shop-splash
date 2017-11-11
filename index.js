import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import session from 'express-session';
import Promise from 'bluebird';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Create the mongo connection to store session data
// const MongoStore = require('connect-mongo')(session);
// Create express app
const app = express();

dotenv.config();
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
// connect static files
app.use(express.static(path.join(__dirname, 'public')));

// get api
app.get('/api', (req, res) => {
  res.json({ success: true, data: 'Hello there!' });
});

// any routes will display these static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = process.env.PORT;

app.listen(port);
