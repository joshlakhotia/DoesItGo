import React, { useState, useEffect } from 'react';
import WeatherConditionsDisplay from './WeatherConditionsDisplay';

function WeatherConditions (props) {
  const [sunrise, setSunrise] = useState({});
  const [sunset, setSunset] = useState({});

  const APIKey = "7e7e3a5d620c92d05b56ddefb1751039"
  const latitude = props.latitude;
  const longitude = props.longitude;
  const currentEpoch = (new Date().getTime() / 1000);

  //Fetch weather data
  const getWeather = async () => {
    try {

      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=imperial`);
      const jsonData = await response.json();

      let sunrise = jsonData.city.sunrise;
      let sunset = jsonData.city.sunset;
      let closestSunriseIndex = 0;
      let closestSunrise = 0;
      let sunriseConditionsObject = {};
      let closestSunsetIndex = 0;
      let closestSunset = 0;
      let sunsetConditionsObject = {};
      let sunriseConditions;
      let sunsetConditions;

      //Find next sunrise (api only gives same day sunrise/sunset) 
      if(currentEpoch > jsonData.city.sunrise) {
        sunrise += 86400;
      }
      //Find sunrise forecast by looping through the 3-hour forecasts from API and seeing which one's UNIX time is closest to sunrise UNIX time
      for (let i = 0; i < 11; i++) {
        if(Math.abs(jsonData.list[i].dt - sunrise) < Math.abs(closestSunrise - sunrise)) {
          closestSunrise = jsonData.list[i].dt;
          closestSunriseIndex = i;
        }
        sunriseConditions = jsonData.list[closestSunriseIndex];
      }
      //Set sunset variable to the next sunset
      if(currentEpoch > jsonData.city.sunset) {
        sunset += 86400;
      }
      //Find sunset forecast by using same method above
      for (let i = 0; i < 11; i++) {
        if(Math.abs(jsonData.list[i].dt - sunset) < Math.abs(closestSunset - sunset)) {
          closestSunset = jsonData.list[i].dt;
          closestSunsetIndex = i;
        }
        sunsetConditions = jsonData.list[closestSunsetIndex]
      }
      //Put data for sunrise I want into an object and send to useState
      sunriseConditionsObject = {
        "temp": Math.round(sunriseConditions.main.temp),
        "description": sunriseConditions.weather[0].main,
        "clouds": sunriseConditions.clouds.all,
        "speed": Math.round(sunriseConditions.wind.speed * 2), //Convert to knots
        "direction": sunriseConditions.wind.deg,
        "gust": Math.round(sunriseConditions.wind.gust * 2), //Convert to knots
        "percipitation": Math.round(sunriseConditions.pop * 100),
        "sunrise": sunrise,
        "originalSunrise": jsonData.city.sunrise
      }
      setSunrise(sunriseConditionsObject);

      //Put data for sunset I want into an object and send to useState
      sunsetConditionsObject = {
        "temp": Math.round(sunsetConditions.main.temp),
        "description": sunsetConditions.weather[0].main,
        "clouds": sunsetConditions.clouds.all,
        "speed": Math.round(sunsetConditions.wind.speed * 2), //Convert to knots
        "direction": sunsetConditions.wind.deg,
        "gust": Math.round(sunsetConditions.wind.gust * 2), //Convert to knots
        "percipitation": Math.round(sunsetConditions.pop * 100),
        "sunset": sunset,
        "originalSunset": jsonData.city.sunset
      }
      setSunset(sunsetConditionsObject);
      
    } catch(err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <WeatherConditionsDisplay sunrise={sunrise} sunset={sunset} windLimit={props.windLimit} direction={props.direction} />
  )
}

export default WeatherConditions;