import React from "react";
import "./App.css";
import Toolbar from "./Toolbar/Toolbar";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "./Backdrop/Backdrop";
import Login from "./Login/Login";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Impressum from "./impressum/impressum";
import Datenschutz from "./datenschutz/datenschutz";
import CourseRouter from "./Course/CourseRouter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      loginOpen: false,
      loggedIn: false
    };
    this.updateLoginState = this.updateLoginState.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.loginToggleHandler = this.loginToggleHandler.bind(this);
    this.backdropClickHandler = this.backdropClickHandler.bind(this);
    this.getCurrentCourses = this.getCurrentCourses.bind(this);
    this.sideDrawerToggleClickHandler = this.sideDrawerToggleClickHandler.bind(
      this
    );
  }
  sideDrawerToggleClickHandler() {
    this.setState(previousState => {
      return { sideDrawerOpen: !previousState.sideDrawerOpen };
    });
  }
  backdropClickHandler() {
    this.setState({ sideDrawerOpen: false });
  }

  loginToggleHandler() {
    this.setState(previousState => {
      return { loginOpen: !previousState.loginOpen };
    });
  }

  getCurrentCourses() {
    fetch("/user/currentcourses", { method: "GET" })
      .then(response => response.json())
      .then(currentCourseResponse => {
        // save the fetched course content into the state
        this.setState(previousState => {
          /* for an object comparison, we need to use JSON.stringify, otherwise
        it will be always false */
          if (
            JSON.stringify(previousState.course) !==
            JSON.stringify(currentCourseResponse)
          ) {
            /* save the content and set isLoading to false to remove the 
          loading page */
            return { currentCourse: currentCourseResponse, isLoading: false };
          }
        });
      });
  }

  updateLoginState() {
    fetch("/api/user/checklogin", {
      method: "GET"
    })
      .then(response => response.text())
      .then(JSON.parse)
      .then(userLoginResponse =>
        this.setState(previousState => {
          if (previousState.loggedIn !== userLoginResponse) {
            return { loggedIn: userLoginResponse };
          }
        })
      );
  }

  // logout function with fetch (POST)
  logoutHandler() {
    fetch("/api/user/logout", {
      method: "POST"
    })
      .then(response => response.text())
      .then(respone => {
        // reads the response
        switch (respone) {
          // case then "successfully logged out" responded,
          // run updateLoginState() and then close the side Drawer
          case "successfully logged out":
            this.updateLoginState();
            this.sideDrawerToggleClickHandler();
            break;
          // case then something else happens, an error occured or unkown
          // responds received.
          default:
            console.log("Something went wrong with the logout");
        }
      });
  }

  componentDidMount() {
    this.updateLoginState();
  }

  render() {
    let backdrop;
    let login;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    if (this.state.loginOpen) {
      login = (
        <Login
          updateLoginState={this.updateLoginState}
          closeLogin={this.loginToggleHandler}
        />
      );
    }

    return (
      <div className="App">
        {/* every content has to be in the router, this make other links or switches
        in other components work */}
        <Router>
          <Toolbar drawerClickHandler={this.sideDrawerToggleClickHandler} />
          <SideDrawer
            show={this.state.sideDrawerOpen}
            login={this.loginToggleHandler}
            isLoggedIn={this.state.loggedIn}
            logout={this.logoutHandler}
            sideDrawerHandler={this.sideDrawerToggleClickHandler}
          />

          {backdrop}

          {login}

          <div className="positioning">
            <div>
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/impressum">
                  <Impressum />
                </Route>
                <Route path="/course">
                  <CourseRouter login={this.state.loggedIn} />
                </Route>
                <Route path="/datenschutz">
                  <Datenschutz />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

function Home() {
  return (
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua.
    </p>
  );
}

export default App;
