import { NavLink, Link } from "react-router-dom";

function NavBar({ name }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">{name}'s Portfolio</Link>
      </div>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
