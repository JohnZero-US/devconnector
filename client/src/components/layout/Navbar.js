/* 
Date:2019年5月27日
Time:15点18分
Auth:John Zero
*/
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="!#">Developers</Link>
        </li>
        <li>
          <Link to="register">Register</Link>
        </li>
        <li>
          <Link to="login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
