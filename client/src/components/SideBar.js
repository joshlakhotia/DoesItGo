import { NavLink } from "react-router-dom";
import "./SideBar.css";

function SideBar (props) {

  //onClick calls setState to the state clicked
  return (
    <div className="sidebar">
      <ul className="side-list">
        <li key="Utah"><NavLink to="/"><button onClick={() => {props.setState("Utah")}}>Utah</button></NavLink></li>
        <li key="California"><NavLink to="/"><button onClick={() => {props.setState("California")}}>California</button></NavLink></li>
        <li key="Oregon"><NavLink to="/"><button onClick={() => {props.setState("Oregon")}}>Oregon</button></NavLink></li>
      </ul>
    </div>
  )
}

export default SideBar;