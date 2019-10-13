import React from "react";
import "./Login.css";

import IconClose from "../static/IconClose";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", wrongLogin: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.randomSubmitText = this.submitButtonText[
      Math.floor(Math.random() * this.submitButtonText.length)
    ];
  }
  submitButtonText = [
    "Los geht's",
    "Ab die Post",
    "ICH WILL EINLOGGEN!!!1!!11",
    "Wenn ich bitten dürfte",
    "Ich hasse Apple"
  ];
  handleSubmit = event => {
    event.preventDefault();
    fetch(
      "/user/login?username=" +
        this.state.username +
        "&password=" +
        this.state.password,
      {
        method: "POST"
      }
    )
      .then(response => response.text())
      .then(response => {
        switch (response) {
          case "Login sucsessfull":
            this.props.updateLoginState();
            this.props.closeLogin();
            break;
          case "ERROR: Incorrect credentials":
            this.setState({ username: "", password: "", wrongLogin: true });
            break;
          default:
            console.log("Something went wrong with the login");
        }
      });
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      wrongLogin: false
    });
  };
  componentDidMount() {}
  render() {
    return (
      <div className="Login">
        <div onClick={this.props.closeLogin}>
          <IconClose />
        </div>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          {this.state.wrongLogin ? (
            <div>Ungültiger Benutzername und/oder Password</div>
          ) : (
            <div> </div>
          )}
          <input
            className="inputField"
            name="username"
            type="text"
            placeholder="Nutzername"
            onChange={this.handleChange}
          />
          <input
            className="inputField"
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input
            className="submitButton"
            type="submit"
            value={this.randomSubmitText}
          />
        </form>
      </div>
    );
  }
}

export default Login;
