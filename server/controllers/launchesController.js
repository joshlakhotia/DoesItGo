const pool = require("../config/config");

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
      "INSERT INTO launch (name, description, launch_types, cliff_launch, hiking_time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [ name, description, launch_types, cliff_launch, hiking_time ]
    );

    const newLaunchLocation = await pool.query(
      "INSERT INTO launch_location (city, state, country, coordinates) VALUES ($1, $2, $3, $4) RETURNING *",
      [ city, state, country, coordinates ]
    );

    const newLaunchTechInfo = await pool.query(
      "INSERT INTO launch_technical_info (wind_limit, launch_direction, slope, elevation_ft, elevation_m, flyable_alt_f, flyable_alt_m) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [ wind_limit, launch_direction, slope, elevation_ft, elevation_m, flyable_alt_f, flyable_alt_m ]
    );

    res.json(newLaunch.rows[0]);

  } catch(err) {
    console.log(err.message);
  }
};

//GET ALL LAUNCHES//

const getAllLaunches = async(req, res) => {
  try {

    const allLaunches = await pool.query("SELECT * FROM launch JOIN launch_location ON launch.id = launch_location.launch_id JOIN launch_technical_info ON launch.id = launch_technical_info.launch_id");

    res.json(allLaunches.rows);

  } catch (err) {
    console.log(err.message);
  }
};

//GET LAUNCH//

const getLaunch = async(req, res) => {
  try {

    const { id } = req.params;
    const launch = await pool.query(
      "SELECT * FROM launch JOIN launch_location ON launch.id = launch_location.launch_id JOIN launch_technical_info ON launch.id = launch_technical_info.launch_id WHERE launch.id = $1", [id]);

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
      coordinates,
      wind_limit,
      launch_direction,
      slope,
      elevation_ft,
      elevation_m,
      flyable_alt_f,
      flyable_alt_m 
    } = req.body;

    const updateLaunch = await pool.query("UPDATE launch SET name = $1, description = $2, launch_types = $3, cliff_launch = $4, hiking_time = $5 WHERE id = $6", [name, description, launch_types, cliff_launch, hiking_time, id]);

    const updateLaunchLocation = await pool.query("UPDATE launch_location SET city = $1, state = $2, country = $3, coordinates = $4 WHERE launch_id = $5", [city, state, country, coordinates, id]);

    const updateLaunchTech = await pool.query("UPDATE launch_technical_info SET wind_limit = $1, launch_direction = $2, slope = $3, elevation_ft = $4, elevation_m = $5, flyable_alt_f = $6, flyable_alt_m = $7 WHERE launch_id = $8", [wind_limit, launch_direction, slope, elevation_ft, elevation_m, flyable_alt_f, flyable_alt_m, id]);

    res.json("Launch Updated");

  } catch (err) {
    console.log(err.message);
  }
};

//DELETE LAUNCH//

const deleteLaunch = async(req, res) => {
  try {
    const { id } = req.params;

    //foreign key delete error, need to fix. (CASCADE KEYWORD IS NOT THE SOLUTION)
    const deleteLaunch = await pool.query("DELETE FROM launch WHERE id = $1", [id]);

    res.json("Launch Deleted");

  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { createLaunch, getAllLaunches, getLaunch, updateLaunch, deleteLaunch };