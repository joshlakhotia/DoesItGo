const pool = require("../config/config");
const Launch = require("../models/LaunchModel");

//POST LAUNCH//

const createLaunch = async (req, res) => {
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
      latitude, //NOTNULL
      longitude, //NOTNULL
      wind_limit,
      launch_direction,
      slope,
      elevation_ft,
      elevation_m,
      flyable_alt_f,
      flyable_alt_m 
    } = req.body;

    await Launch.createLaunch(name, description, launch_types, cliff_launch, hiking_time);
    await Launch.createLocation(city, state, country, latitude, longitude);
    await Launch.createTechInfo(wind_limit, launch_direction, slope, elevation_ft, elevation_m, flyable_alt_f, flyable_alt_m);

    res.json("Launch Created");

  } catch(err) {
    console.log(err.message);
  }
};

//GET ALL LAUNCHES//

const getAllLaunches = async(req, res) => {
  try {

    const allLaunches = await Launch.getAll();

    res.json(allLaunches.rows);

  } catch (err) {
    console.log(err.message);
  }
};

//GET LAUNCH//

const getLaunch = async(req, res) => {
  try {

    const { id } = req.params;
    const launch = await Launch.getLaunch(id);

    res.json(launch.rows[0]);

  } catch (err) {
    console.log(err.message);
  }
};

//UPDATE LAUNCH//

const updateLaunch = async(req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, //NOTNULL
      description, 
      launch_types, 
      cliff_launch, 
      hiking_time,
      city, //NOTNULL
      state, //NOTNULL
      country, //NOTNULL
      latitude, //NOTNULL
      longitude, //NOTNULL
      wind_limit,
      launch_direction,
      slope,
      elevation_ft,
      elevation_m,
      flyable_alt_f,
      flyable_alt_m 
    } = req.body;

    await Launch.updateLaunch(name, description, launch_types, cliff_launch, hiking_time, id);
    await Launch.updateLocation(city, state, country, latitude, longitude, id);
    await Launch.updateTech(wind_limit, launch_direction, slope, elevation_ft, elevation_m, flyable_alt_f, flyable_alt_m, id);

    res.json("Launch Updated");

  } catch (err) {
    console.log(err.message);
  }
};

//DELETE LAUNCH//

const deleteLaunch = async(req, res) => {
  try {
    const { id } = req.params;

    await Launch.deleteLaunch(id);

    res.json("Launch Deleted");

  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { createLaunch, getAllLaunches, getLaunch, updateLaunch, deleteLaunch };