import "./WeatherConditions.css";

const WeatherConditionsDisplay = (props) => {

  const currentEpoch = (new Date().getTime() / 1000);
  const sunrise = props.sunrise;
  const sunset = props.sunset;
  const launchDirection = props.direction;
  let timeOfDay1;
  let timeOfDay2;
  const gustLimit = 7;
  const rainLimit = 30;
  let directionRightLimit = launchDirection + 45; //Making the right and left wind direction limits
  let directionLeftLimit = launchDirection - 45;
  let windDirectionRise = sunrise.direction; //Making a variable we can change around to check wind direction limits. Only used in the if statement below
  let windDirectionSet = sunset.direction

  //Dealing with the 360 degree wind direction
  if(windDirectionRise <= 45 && launchDirection >= 315) {
    windDirectionRise += 360;
  } else if (windDirectionRise >= 315 && launchDirection <= 45) {
    windDirectionRise -= 360;
  };

  if(windDirectionSet <= 45 && launchDirection >= 315) {
    windDirectionSet += 360;
  } else if (windDirectionSet >= 315 && launchDirection <= 45) {
    windDirectionSet -= 360;
  };

  


  const sunriseConditions = <div className="sunrise-items">  
                              <div className="sunrise-first">
                                <div id="rise-temp">
                                  <p>Temp:</p>
                                  <p>{sunrise.temp}</p>
                                </div>
                                <div id="rise-sky">
                                  <p>Sky:</p>
                                  <p>{sunrise.description}</p>
                                </div>
                                <div id="rise-cover">
                                  <p>Cover:</p>
                                  <p>{sunrise.clouds}%</p>
                                </div>
                              </div>
                              <div className="sunrise-second">
                                <div id="rise-speed">
                                  <p>Wind Speed:</p>
                                  {sunrise.speed > props.windLimit ? <p className="red">{sunrise.speed}</p> : <p className="green">{sunrise.speed}</p>}
                                </div>
                                <div id="rise-dir">
                                  <p>@</p>
                                  {windDirectionRise <= directionRightLimit && windDirectionRise >= directionLeftLimit ? <p className="green">{sunrise.direction}</p> : <p className="red">{sunrise.direction}</p>}
                                </div>
                                <div id="rise-gust">
                                  <p>Gusting:</p>
                                  {sunrise.gust > props.windLimit || sunrise.gust - sunrise.speed > gustLimit ? <p className="red">{sunrise.gust}</p> : <p className="green">{sunrise.gust}</p>}
                                </div>
                                <div id="rise-rain">
                                  <p>Perc. %:</p>
                                  {sunrise.percipitation > rainLimit ? <p className="red">{sunrise.percipitation}</p> : <p className="green">{sunrise.percipitation}</p>}
                                </div>
                              </div>
                            </div>

  const sunsetConditions = <div className="sunset-items">  
                            <div className="sunset-first">
                              <div id="set-temp">
                                <p>Temp:</p>
                                <p>{sunset.temp}</p>
                              </div>
                              <div id="set-sky">
                                <p>Sky:</p>
                                <p>{sunset.description}</p>
                              </div>
                              <div id="set-cover">
                                <p>Coverage:</p>
                                <p>{sunset.clouds}%</p>
                              </div>
                            </div>
                            <div className="sunset-second">
                              <div id="set-speed">
                                <p>Wind Speed:</p>
                                {sunset.speed > props.windLimit ? <p className="red">{sunset.speed}</p> : <p className="green">{sunset.speed}</p>}
                              </div>
                              <div id="set-dir">
                                <p>@</p>
                                {windDirectionSet <= directionRightLimit && windDirectionSet >= directionLeftLimit ? <p className="green">{sunset.direction}</p> : <p className="red">{sunset.direction}</p>}
                              </div>
                              <div id="set-gust">
                                <p>Gusting:</p>
                                {sunset.gust > props.windLimit || sunset.gust - sunset.speed > gustLimit ? <p className="red">{sunset.gust}</p> : <p className="green">{sunset.gust}</p>}
                              </div>
                              <div id="set-rain">
                                <p>Perc. %:</p>
                                {sunset.percipitation > rainLimit ? <p className="red">{sunset.percipitation}</p> : <p className="green">{sunset.percipitation}</p>}
                              </div>
                            </div>
                          </div>

  //Puts the next available time to fly's forecast first
  if(currentEpoch > sunset.originalSunset) {
    timeOfDay1 = <div className="first-forecast">
                  <h4>Tomorrow Morning</h4>
                  {sunriseConditions}
                </div>
    timeOfDay2 = <div className="second-forecast">
                  <h4>Tomorrow Evening</h4>
                  {sunsetConditions}
                </div>
  } else if (currentEpoch > sunrise.originalSunrise){
    timeOfDay1 = <div className="first-forecast">
                  <h4>This Evening</h4>
                  {sunsetConditions}
                </div>
    timeOfDay2 = <div className="second-forecast">
                  <h4>Tomorrow Morning</h4>
                  {sunriseConditions}
                </div>
  } else {
    timeOfDay1 = <div className="first-forecast">
                  <h4>This Morning</h4>
                  {sunriseConditions}
                </div>
    timeOfDay2 = <div className="second-forecast">
                  <h4>This Evening</h4>
                  {sunsetConditions}
                </div>
  }

  return (
    <div className="conditions">
      {timeOfDay1}
      {timeOfDay2}
    </div>
  )
}

export default WeatherConditionsDisplay;