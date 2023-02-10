CREATE DATABASE doesitgo;

CREATE TABLE launch (
  id SERIAL PRIMARY KEY,
  name VARCHAR(55) NOT NULL,
  description VARCHAR(255),
  launch_types VARCHAR(100),
  cliff_launch BOOLEAN,
  hiking_time VARCHAR(55)
);

CREATE TABLE launch_location (
  launch_id SERIAL REFERENCES launch(id) ON DELETE CASCADE,
  city VARCHAR(55) NOT NULL,
  state VARCHAR(55) NOT NULL,
  country VARCHAR(55) NOT NULL,
  latitude DECIMAL(7,4) NOT NULL,
  longitude DECIMAL(7,4) NOT NULL
);

CREATE TABLE launch_technical_info (
  launch_id SERIAL REFERENCES launch(id) ON DELETE CASCADE,
  wind_limit SMALLINT NOT NULL,
  launch_direction SMALLINT NOT NULL,
  slope SMALLINT,
  elevation_ft SMALLINT,
  elevation_m SMALLINT,
  flyable_alt_f SMALLINT,
  flyable_alt_m SMALLINT
);