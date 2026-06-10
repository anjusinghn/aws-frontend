import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">

      <Link
        to="/"
        className="navbar-logo"
      >
        VCS Cloud
      </Link>

      <div className="navbar-links">

        <Link
          to="/create"
          className="navbar-link"
        >
          Create Repository
        </Link>

        <Link
          to="/profile"
          className="navbar-profile"
        >
          Profile
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;