import React from "react";
import "./SideDrawer.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Is executed by changing `state` in `App.js`. Then we use basic css
 * translate to do the annimation.
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 */

function SideDrawer(props) {
  return (
    <div className={props.show ? "SideDrawer open" : "SideDrawer"}>
      <div>
        {!props.isLoggedIn ? (
          <div className="SideDrawer__welcome__guest">
            <p>Bitte loggen sie sich ein</p>
          </div>
        ) : (
          <div className="SideDrawer__welcome__user">
            <p>Willkommen zurück, {props.loginDat} !</p>
          </div>
        )}
      </div>

      <div>
        {props.isLoggedIn ? (
          <div className="SideDrawer__myclasses__user">
            <p>Meine Kurse</p>
          </div>
        ) : (
          <p></p>
        )}
      </div>

      <div>
        {props.isLoggedIn ? (
          <div className="SideDrawer__courseoverview__user">
            <p>
              <Link onClick={props.sideDrawerHandler} to="/course">
                Kursübersicht
              </Link>
            </p>
          </div>
        ) : (
          <p></p>
        )}
      </div>

      <div>
        {!props.isLoggedIn ? (
          <div class="SideDrawer__LoginButton__guest">
            <button onClick={props.login}>Login</button>
          </div>
        ) : (
          <div class="SideDrawer__LoginButton__user">
            <Link to="/">
              <button onClick={props.logout}>Logout</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

SideDrawer.propTypes = {
  /**
   * Define the visibility of the SideDrawer
   */
  show: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired
};
export default SideDrawer;
