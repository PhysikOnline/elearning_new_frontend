import React from "react";
import "./SideDrawer.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import Login from "../Login/Login";

import Loading from "../Additional/Loading";

/**
 * Is executed by changing `state` in `App.js`. Then we use basic css
 * translate to do the annimation.
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 * @author Joannis Traios <janni@elearning.physik.uni-frankfurt.de>
 */

class SideDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCourses: [],
      isLoading: true
    };
  }
  getCurrentCourses() {
    if (this.props.isLoggedIn) {
      fetch("/user/currentcourses", {
        method: "GET"
      })
        .then(response => response.json())
        .then(responseJSON =>
          this.setState(previousState => {
            if (
              JSON.stringify(previousState.currentCourses) !==
              JSON.stringify(responseJSON)
            )
              return { currentCourses: responseJSON, isLoading: false };
          })
        );
    }
  }
  componentDidMount() {
    this.getCurrentCourses();
  }
  componentDidUpdate() {
    this.getCurrentCourses();
  }
  render() {
    if (this.state.isLoading && this.props.isLoggedIn) {
      return (
        <div className={this.props.show ? "SideDrawer open" : "SideDrawer"}>
          <Loading />
        </div>
      );
    }
    return (
      <div>
        <div className={this.props.show ? "SideDrawer open" : "SideDrawer"}>
          <div>
            {!this.props.isLoggedIn ? (
              <div className="SideDrawer__welcome__guest">
                <p>Bitte loggen sie sich ein</p>
              </div>
            ) : (
              <div className="SideDrawer__welcome__user">
                <p>Willkommen zurück, {this.props.loginDat} !</p>
              </div>
            )}
          </div>

          <div>
            {this.props.isLoggedIn ? (
              <div className="SideDrawer__myclasses__user">
                <p>Meine Kurse</p>
              </div>
            ) : (
              <p></p>
            )}
          </div>

          <div>
            <div className="SideDrawer__courseoverview__user">
              <p>
                <Link onClick={this.props.sideDrawerHandler} to="/course">
                  Kursübersicht
                </Link>
              </p>
            </div>
          </div>

          <div>
            {!this.props.isLoggedIn ? (
              <div className="SideDrawer__LoginButton__guest">
                <button onClick={this.props.login}>Login</button>
              </div>
            ) : (
              <div className="SideDrawer__LoginButton__user">
                <Link to="/">
                  <button onClick={this.props.logout}>Logout</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

SideDrawer.propTypes = {
  /**
   * Define the visibility of the SideDrawer
   */
  show: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired
};
export default SideDrawer;
