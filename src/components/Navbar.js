import React from "react";
import "../css_files/navbar.css";
// import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <p className="docex">DocEx</p>
      {/* <div className="nav">
        <Link to="/home" className="nav_comp">
          Home
        </Link> 
        <Link to="/about" className="nav_comp">
          About
        </Link>
      </div> */}
    </div>
  );
};

export default Navbar;
