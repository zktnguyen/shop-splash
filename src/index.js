import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import Promise from 'bluebird';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import favicon from 'serve-favicon';

import router from './routes';
import cartController from './controllers/cartController';

// Create the mongo connection to store session data
const MongoStore = require('connect-mongo')(session);
// Create express app
const app = express();

dotenv.config({ silent: process.env.NODE_ENV === 'production' });
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '../src/public/favicon.ico')));

mongoose.Promise = Promise;
mongoose.connect(
  process.env.MONGO_URI ||
    'mongodb://kim:thisisnothidden@ds064198.mlab.com:64198/shop',
  { useMongoClient: true },
  () => console.log('connected to mongoDB')
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
// Set up session to connect cookie to mongoDB
app.use(
  session({
    secret: 'secretkeyyy',
    saveUninitialized: false,
    resave: false,
    cookie: { maAge: 1000 * 60 * 60 * 24 * 2 },
    store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
    // ttl: 2 days * 24 hours * 60 minutes * 60 seconds
  })
);

// use routes for api
app.post('/api/cart', cartController.post);
app.get('/api/cart', cartController.get);
app.use('/api', router);

// connect static files
app.use(express.static(path.join(__dirname, '../client/public')));

// any routes will display these static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

const port = process.env.PORT || 3002;

app.listen(port);
