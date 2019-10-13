import React from "react";
import "./App.css";

import Toolbar from "./Toolbar/Toolbar";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "./Backdrop/Backdrop";
import Login from "./Login/Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      loginOpen: false,
      loggedIn: false
    };
    this.updateLoginState = this.updateLoginState.bind(this);
    this.loginToggleHandler = this.loginToggleHandler.bind(this);
    this.backdropClickHandler = this.backdropClickHandler.bind(this);
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
  updateLoginState() {
    fetch("/user/checklogin", {
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
        <Toolbar drawerClickHandler={this.sideDrawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
        {login}
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </p>
        <button onClick={this.loginToggleHandler}>Login</button>
      </div>
    );
  }
}

export default App;
