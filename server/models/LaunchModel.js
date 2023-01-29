const pool = require("../config/config");

const Launch = {};

//CREATE Launch//

Launch.createLaunch = (name, description, launch_types, cliff_launch, hiking_time) => {

  return pool.query("INSERT INTO launch (name, description, launch_types, cliff_launch, hiking_time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
  [ name, description, launch_types, cliff_launch, hiking_time ]);

};

Launch.createLocation = (city, state, country, coordinates) => {

  return pool.query("INSERT INTO launch_location (city, state, country, coordinates) VALUES ($1, $2, $3, $4) RETURNING *",
  [ city, state, country, coordinates ]);

};

Launch.createTechInfo = (wind_limit, launch_direction, slope, elevation_ft, elevation_m, flyable_alt_f, flyable_alt_m) => {

  return pool.query("INSERT INTO launch_technical_info (wind_limit, launch_direction, slope, elevation_ft, elevation_m, flyable_alt_f, flyable_alt_m) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [ wind_limit, launch_direction, slope, elevation_ft, elevation_m, flyable_alt_f, flyable_alt_m ]);

};

//GET ALL LAUNCHES//

Launch.getAll = () => {

  return pool.query("SELECT * FROM launch JOIN launch_location ON launch.id = launch_location.launch_id JOIN launch_technical_info ON launch.id = launch_technical_info.launch_id");

};

//GET LAUNCH//

Launch.getLaunch = (id) => {

  return pool.query("SELECT * FROM launch JOIN launch_location ON launch.id = launch_location.launch_id JOIN launch_technical_info ON launch.id = launch_technical_info.launch_id WHERE launch.id = $1", [id]);

};

//UPDATE LAUNCH//

Launch.updateLaunch = (name, description, launch_types, cliff_launch, hiking_time, id) => {

  return pool.query("UPDATE launch SET name = $1, description = $2, launch_types = $3, cliff_launch = $4, hiking_time = $5 WHERE id = $6", [name, description, launch_types, cliff_launch, hiking_time, id]);

};

Launch.updateLocation = (city, state, country, coordinates, id) => {

  return pool.query("UPDATE launch_location SET city = $1, state = $2, country = $3, coordinates = $4 WHERE launch_id = $5", [city, state, country, coordinates, id]);

};

Launch.updateTech = (wind_limit, launch_direction, slope, elevation_ft, elevation_m, flyable_alt_f, flyable_alt_m, id) => {

  return pool.query("UPDATE launch_technical_info SET wind_limit = $1, launch_direction = $2, slope = $3, elevation_ft = $4, elevation_m = $5, flyable_alt_f = $6, flyable_alt_m = $7 WHERE launch_id = $8", [wind_limit, launch_direction, slope, elevation_ft, elevation_m, flyable_alt_f, flyable_alt_m, id]);

};

//DELETE LAUNCH//

Launch.deleteLaunch = (id) => {

  return pool.query("DELETE FROM launch WHERE id = $1", [id]);
  
}

module.exports = Launch;