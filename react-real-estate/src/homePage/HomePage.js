import React, {useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../useContext/UserContext";
import EnterZip from "./EnterZip";
import "./HomePage.css";

function Homepage() {
  const {currentUser} = useContext(UserContext);

  return (
      <div>
        <div className="page container text-center">
          <h1 className="mb-4 font-weight-bold">US Real Estate</h1>
          <p className="lead">Find your dream place to live!</p>
          {currentUser
              ? <div><h2>
                Welcome Back, {currentUser.firstName || currentUser.username}!
              </h2>
              <h2>Change Starts here</h2>
              <EnterZip />
              </div>
              : (
                  <p>
                    <Link className="btn btn-primary font-weight-bold mr-3"
                          to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-primary font-weight-bold"
                          to="/register">
                      Sign up
                    </Link>
                  </p>
              )}
        </div>
      </div>
  );
}

export default Homepage;