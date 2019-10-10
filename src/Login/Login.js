import React from "react";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
  }
  handleUsernameChange = event => {
    console.log(event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    console.log(event.target.value);
    this.setState({ password: event.target.value });
  };
  render() {
    return (
      <div className="Login">
        Login
        <form onSubmit={this.handleSubmit}>
          <input
            name="username"
            type="text"
            onChange={this.handleUsernameChange}
          />
          <input
            name="password"
            type="password"
            onChange={this.handlePasswordChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Login;
