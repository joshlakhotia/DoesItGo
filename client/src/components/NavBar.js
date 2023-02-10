import { NavLink } from 'react-router-dom';
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="nav">
      <NavLink to="/" className="site-title">Does It Go 🐧</NavLink>
      <ul className="nav-list">
        <NavLink to="/login">Admin</NavLink>
        <NavLink to="/submitlaunch">Submit</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About</NavLink>
      </ul>
    </nav>
  )
}

export default NavBar;