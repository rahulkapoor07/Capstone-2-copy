import React, {useContext} from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../useContext/UserContext";
import "./navigation.css";
// import "./Navigation.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({logOut}) {
  const {currentUser} = useContext(UserContext);
  // console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
        <div>
        <button style={{"float":"right"}} className="navbar-toggler ml-auto hamburger" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <li className="nav-item mr-4">
            <NavLink className="links nav-link" to="/buy">
              Buy
            </NavLink>
          </li>
          <li className="nav-item mr-4 mr-md-1">
            <NavLink className="links nav-link" to="/sold">
              Sold
            </NavLink>
          </li>
          <li className="nav-item mr-4 mr-md-1">
            <NavLink className="links nav-link" to="/rent">
              Rent
            </NavLink>
          </li>
          <li className="nav-item mr-4 mr-md-1">
            <NavLink className="links nav-link" to="/agents">
              Agents
            </NavLink>
          </li>
          <li className="nav-item mr-4 mr-md-1">
            <NavLink className="links nav-link" to="/mortgage-calculator">
              Mortgage Calculator
            </NavLink>
          </li>
          <li className="nav-item mr-4 mr-md-1">
            <NavLink className="links nav-link" to={`/profile/${currentUser.username}`} >
              Saved Homes
            </NavLink>
          </li>
          <li className="nav-item mr-4 mr-md-1">
            <NavLink className="links nav-link" to="/edit-profile" >
              Edit Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={logOut}>
              Log out {currentUser.first_name || currentUser.username}
            </Link>
          </li>
          </div>
          </div>
        </ul>
        </div>
    );
  }

  function loggedOutNav() {
    return (
      <>
      <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/register">
              Sign Up
            </NavLink>
          </li>
          </div>
          </div>
        </ul>
      </>
    );
  }

  return (
      <nav className="Navigation navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
        <Link className="navbar-brand brand-name" style={{"marginLeft":"-60px"}}  to="/">
          US Real Estate
        </Link>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </nav>
      
  );

}

export default Navigation;
