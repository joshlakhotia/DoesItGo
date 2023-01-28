const express = require('express');
const app = express();
const cors = require('cors');

const logger = require('morgan');
const launchRoute = require('./routes/Launches');

//////////////MIDDLEWARE////////////////

app.use(cors());
app.use(express.json()); //req.body
app.use(logger('dev')); //USE MORGAN

//////////////ROUTE/////////////////////

app.use('/launches', launchRoute);

//////////////SECURITY/////////////////

app.disable('x-powered-by');

///////LISTEN ON SPECIFIED PORT/////////

app.listen(5000, ()=> {
  console.log("server has started on port 5000");
});