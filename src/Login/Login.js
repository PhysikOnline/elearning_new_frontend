import React from "react";
import "./Login.css";
import PropTypes from "prop-types";

import IconClose from "../static/IconClose";

/**
 * This Login sends the username and password to the Server. Where
 * it will be verified an returns a cookie with a session id.
 * After a successfull login, it executes a function of `App.js`
 * where it updates the login state. This login state will be
 * passed to every component, which uses the login functionality..
 *
 * @version 1.0.1
 * @author Keiwan Jamaly <keiwan@elearning.physik.uni-frankfurt.de>
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", wrongLogin: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    /* choose a random submit text for the submit 
     field (this is just a joke feature) */
    this.randomSubmitText = this.submitButtonText[
      Math.floor(Math.random() * this.submitButtonText.length)
    ];
  }
  // collection of submit texts
  submitButtonText = [
    "Los geht's",
    "Ab die Post",
    "ICH WILL EINLOGGEN!!!1!!11",
    "Wenn ich bitten dürfte",
    "Ich hasse Apple"
  ];
  /**
   * Function to handle Login submit. It will set the session coockie
   * in the browser, followed by updating the login state.
   */
  handleSubmit(event) {
    // this prevents the page reloading on submit click
    event.preventDefault();
    // get request to server on /user/login
    fetch(
      "/user/login?username=" +
        this.state.username +
        "&password=" +
        this.state.password,
      {
        method: "POST"
      }
    )
      // convert the response to text
      .then(response => response.text())
      // process the response
      .then(response => {
        switch (response) {
          case "Login successfull":
            // update the login state of the App.js component
            this.props.updateLoginState();
            // close the login component by setting the state in App.js
            this.props.closeLogin();
            break;
          case "ERROR: Incorrect credentials":
            /* reset the username and password for incorrect credentials
            wrongLogin will display a "wrong credentials" warning message */
            this.setState({ username: "", password: "", wrongLogin: true });
            break;
          default:
            /* make a console log for anything else, this should never be
            reaced */
            console.log("Something went wrong with the login");
        }
      });
  }
  /**
   *
   * The input fields of the form will display the values stroed in state.
   * To change the values in the input field, we have to change the values of
   * this sate
   */
  handleChange(event) {
    this.setState({
      /* set the values ov the state, in this case the state value is the same
      as the input field value. This makes the [event.target.name] 
      syntax work */
      [event.target.name]: event.target.value,
      /* set the wrong login to false, if there was a wrong login and you
      startet typing again. */
      wrongLogin: false
    });
  }
  render() {
    return (
      <div className="Login">
        {/* close button for the login prompt */}
        <div onClick={this.props.closeLogin}>
          <IconClose />
        </div>
        {/* login form (this form tells password managers to use the login) */}
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          {/* display a red wrong login waring */}
          {this.state.wrongLogin ? (
            <div>Ungültiger Benutzername und/oder Password</div>
          ) : (
            <div> </div>
          )}
          {/* username input field */}
          <input
            className="inputField"
            name="username"
            type="text"
            placeholder="Nutzername"
            // username value is stored in state
            value={this.state.username}
            // execute this.status.username change when typing
            onChange={this.handleChange}
          />
          {/* username input field */}
          <input
            className="inputField"
            name="password"
            type="password"
            placeholder="Password"
            // username value is stored in state
            value={this.state.password}
            // execute this.status.password change when typing
            onChange={this.handleChange}
          />
          {/* submit Button */}
          <input
            className="submitButton"
            type="submit"
            // get random submit text for the button (it's a small joke)
            value={this.randomSubmitText}
          />
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  /**
   * Function that makes an API request to /user/checklogin and then updates
   * it in the global login state
   */
  updateLoginState: PropTypes.func.isRequired,
  /**
   * Function that closes the login propt by setState({loginOpen: false}).
   * loginOpen ist just an example for your state varriable
   */
  closeLogin: PropTypes.func.isRequired
};
export default Login;
