/**
 * Author: Professor Krasso
 * Date: 7 August 2024
 * File: app.js
 * Description: Application setup. Autogenerated using Express generator.
 */

// require statements
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { notFoundHandler, errorHandler } = require('./error-handler');

// Importing the index router
const indexRouter = require('./routes/index');

// Variable declaration for the express app
let app = express();

// Mongoose Connection
const connectionString = 'mongodb+srv://ims_admin:s3cret@bellevueuniversity.swhfl.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity';

const dbName = 'ims';

//function to connect to mongodb database
async function connectToDatabase(){
  try{
    await mongoose.connect(connectionString, {
      dbName: dbName,
    });
    console.log(`connection to the ${dbName} database was successful`);
  } catch(err){
    console.error(`MongoDb connection err: ${err}`);
  }
}

connectToDatabase(); //Call the function to connect to the database

// CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // This allows all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed request methods
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allowed headers
  next();
});

// Express app configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routing configuration
app.use('/api', indexRouter);

// Use the error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Export the app
module.exports = app;
