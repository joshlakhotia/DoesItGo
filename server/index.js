const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./config/config");

const logger = require('morgan');

//////////////MIDDLEWARE////////////////
app.use(cors());
app.use(express.json()); //req.body
app.use(logger('dev')); //USE MORGAN

//////////////SECURITY/////////////////
app.disable('x-powered-by');

//////////////ROUTES///////////////////

//CREATE LAUNCH//
app.post("/launches", async (req, res) => {
  try {

    const { 
      name, //NOTNULL
      description, 
      launch_types, 
      cliff_launch, 
      hiking_time,
      city, //NOTNULL
      state, //NOTNULL
      country, //NOTNULL
      coordinates,
      wind_limit,
      launch_direction,
      slope,
      elevation_ft,
      elevation_m,
      flyable_alt_f,
      flyable_alt_m 
    } = req.body;

    const newLaunch = await pool.query(
      "INSERT INTO launch (name, description, launch_types, cliff_launch, hiking_time) VALUES ($1, $2, $3, $4, $5)",
      [
        name, 
        description, 
        launch_types, 
        cliff_launch, 
        hiking_time
      ]
    );

    const newLaunchLocation = await pool.query(
      "INSERT INTO launch_location (city, state, country, coordinates) VALUES ($1, $2, $3, $4)",
      [
        city,
        state,
        country,
        coordinates
      ]
    );

    const newLaunchTechInfo = await pool.query(
      "INSERT INTO launch_technical_info (wind_limit, launch_direction, slope, elevation_ft, elevation_m, flyable_alt_f, flyable_alt_m) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        wind_limit,
        launch_direction,
        slope,
        elevation_ft,
        elevation_m,
        flyable_alt_f,
        flyable_alt_m
      ]
    );

    res.json(newLaunch, newLaunchLocation, newLaunchTechInfo);

  } catch(err) {
    console.log(err.message);
  }
});

//GET ALL LAUNCHES//

//GET LAUNCHES BY STATE//

//GET LAUNCHES BY COUNTRY//

//UPDATE LAUNCH//

//DELETE LAUNCH//

app.listen(5000, ()=> {
  console.log("server has started on port 5000");
});