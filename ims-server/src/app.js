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
const createInventoryItemRoute = require('./routes/inventory/create-inventory-item');


// Variable declaration for the express app
const app = express();

// Mongoose Connection
const connectionString = 'mongodb+srv://ims_admin:s3cret@bellevueuniversity.swhfl.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity';
const dbName = 'ims';

/*
beforeAll(async () =>{
  await connectToDatabase();
}); //Call the function to connect to the database when testing*/


// CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
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

app.use('/api/inventory', createInventoryItemRoute); // Add this line for inventory item routes


// Use the error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Function to connect to MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect(connectionString, { dbName: dbName });
    console.log(`Connection to the ${dbName} database was successful`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
}

connectToDatabase();//Call the function to connect to the database when running server

// Export the app
module.exports = app;
