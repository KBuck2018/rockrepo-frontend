import React, { Component } from "react";
import "./authentication.css";

class Signin extends Component {
  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <form className="form">
          <div>
            <label htmlFor="email">Username </label>
            <input
              className="userForm"
              type="text"
              name="email"
              onChange={this.props.handleUserAuth}
            />
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <input
              className="userForm"
              type="password"
              name="password"
              onChange={this.props.handleUserAuth}
            />
          </div>
          <input
            className="new"
            value="Submit"
            type="submit"
            onClick={this.props.handleLogIn}
          />
        </form>
      </div>
    );
  }
}

export default Signin;
