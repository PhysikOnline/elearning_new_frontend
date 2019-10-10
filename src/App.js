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
      loginOpen: false
    };
  }
  sideDrawerToggleClickHandler = () => {
    this.setState(previousState => {
      return { sideDrawerOpen: !previousState.sideDrawerOpen };
    });
  };
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };
  loginClickHandler = () => {
    this.setState({ loginOpen: true });
  };
  render() {
    let backdrop;
    let login;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    if (this.state.loginOpen) {
      login = <Login />;
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
        <button onClick={this.loginClickHandler}>Login</button>
      </div>
    );
  }
}

export default App;
