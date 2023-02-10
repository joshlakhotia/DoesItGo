import React, { useEffect, useState } from "react";
import LaunchCard from "../components/LaunchCard";
import "./Home.css";

export function Home(props) {
  const [launches, setLaunches] = useState([]);

  //Get request for all launches
  const getLaunches = async () => {
    try {

      const response = await fetch("http://localhost:5000/launches");
      const jsonData = await response.json();

      setLaunches(jsonData);

    } catch(err) {
      console.log(err.message);
    }
  }

  //Filter launches and dislplay based on state chosen in sidebar
  const renderLaunches = (launches) => {

    //Filter by State
    const stateLaunches = launches.filter((launch) => {
      return launch.state === props.state;
    })

    //Maps each Launch to a Launchcard to display
    //Sends setId to the launchcards. When you click on a launchcard it sets the id to that launches id and brings you to that launches page
    return stateLaunches.map(launch => <div key={launch.id} ><LaunchCard launch={launch} setId={props.setId} /></div>)
  };

  //Call get request on render
  useEffect(() => {
    getLaunches();
  }, []);

  return (<>
    <h1 className="state-title">{props.state}</h1>
    <div className="launchCard-list">
      {renderLaunches(launches)}
    </div>
  </>)
};