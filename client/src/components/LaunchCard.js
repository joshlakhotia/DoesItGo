import "./LaunchCard.css";
import { Link } from "react-router-dom";
import WeatherConditions from "./WeatherConditionsLogic";

function LaunchCard (props) {

  //sets the link to the launchards id
  const link = `./launch/${props.launch.id}`;

  return (
    <div className={"launchCard"} key={props.launch.id}>
      <Link className="launchcard-link" to={link} onClick={() => props.setId(props.launch.id)}> 
        <h2>{props.launch.name}</h2>
        <WeatherConditions latitude={props.launch.latitude} longitude={props.launch.longitude} windLimit={props.launch.wind_limit} direction={props.launch.launch_direction} />
      </Link>
    </div>
  )
}

export default LaunchCard;