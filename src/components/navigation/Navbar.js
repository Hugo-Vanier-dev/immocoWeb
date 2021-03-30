import React from 'react';
// import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {

    return (
<nav className="">
    <div>
         <ul className="nav-links mx-5">
         <Link to="/">
             <li className="nav-space">Home </li>
          </Link>
          <Link to="/CreateClient">
             <li className="nav-space">CreateClient </li>
          </Link>
          <Link to="/UpdateClient">
             <li className="nav-space">UpdateClient </li>
          </Link>
          <Link to="/ReadClient">
             <li className="nav-space">ReadClient </li>
          </Link>
          <Link to="/DeleteClient">
             <li className="nav-space">DeleteClient </li>
          </Link>
          <Link to="/login">
             <li className="nav-space">Login </li>
          </Link>
        </ul>
    </div>
</nav>
    );
}
export default Navbar;