import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./LaunchPage.css";

//This code causes the LaunchPage to lose all its data on a page refresh due to the id state being lost

export function LaunchPage(props) {
  const [launch, setLaunch] = useState([]);


  const path = `/editlaunch/${launch.id}` //Link to edit launch information

  const getLaunch = async () => {
    try {

      const response = await fetch(`http://localhost:5000/launches/${props.id}`);
      const jsonData = await response.json();

      setLaunch(jsonData);

    } catch(err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getLaunch()
  }, []);

  return (
    <div className="launch-page">
      <div className="launch-page-header">
        <h1 id="launch-title">{launch.name}</h1>
        {launch.country === "USA" ? <h4 className="location">{launch.city}, {launch.state} {"("}{launch.latitude}, {launch.longitude}{")"}</h4> : <h4 className="location">{launch.city}, {launch.country} {"("}{launch.latitude}, {launch.longitude}{")"}</h4>}
      </div>
      <div className="launch-page-details">
        <div className="description">
          <h5>About</h5>
          <p>{launch.description}</p>
        </div>
        <div className="technical">
          <h3>Technical Info</h3>
          <div className="tech-info">
            <div className="tech-left">
              <div className="hiking-time">
                <p>Hiking Time</p>
                {launch.hiking_time === "" ? <p>¯\_{"("}ツ{")"}_/¯</p> : <p>{launch.hiking_time}</p>}
              </div>
              <div className="hiking-time">
                <p>Flyable Altitude</p>
                {launch.flyable_alt_f === 0 ? <p>¯\_{"("}ツ{")"}_/¯</p> : <p>{launch.flyable_alt_f}</p>}
              </div>
              <div className="hiking-time">
                <p>Height MSL</p>
                {launch.elevation_ft === 0 ? <p>¯\_{"("}ツ{")"}_/¯</p> : <p>{launch.elevation_ft}</p>}
              </div>
            </div>
            <div className="tech-right">
              <div className="hiking-time">
                <p>Cliff Launch</p>
                {launch.cliff_launch === false ? <p className="cliff-false">False</p> : <p className="cliff-true">True</p>}
              </div>
              <div className="hiking-time">
                <p>Exit Direction</p>
                {launch.launch_direction === null ? <p>¯\_{"("}ツ{")"}_/¯</p> : <p>{launch.launch_direction}</p>}
              </div>
              <div className="hiking-time">
                <p>Launch Types</p>
                {launch.launch_types === "" ? <p>¯\_{"("}ツ{")"}_/¯</p> : <p>{launch.launch_types}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="launch-page-footer">
        <Link to={path} state={{launch: launch}}>Edit</Link>
      </div>
    </div>
)};