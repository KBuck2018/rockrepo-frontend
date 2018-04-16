import React, { Component } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Signin from "./components/authentication/Signin";
import Signout from "./components/authentication/Signout";
import Signup from "./components/authentication/Signup";
import { Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  render() {
    return (
      <Switch>
        <div>
          <nav>
            <Header isLoggedIn={this.state.isLoggedIn} />
          </nav>
          <Route
            path="/signup"
            render={props => {
              if (this.state.isLoggedIn === false) {
                return (
                  <Signup
                    {...props}
                    isLoggedIn={this.state.isLoggedIn}
                    handleUserAuth={this.handleUserAuth}
                    handleSignUp={this.handleSignUp}
                  />
                );
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
          <Route
            path="/logout"
            render={props => {
              if (this.state.isLoggedIn === true) {
                return (
                  <Signout
                    {...props}
                    isLoggedIn={this.state.isLoggedIn}
                    handleLogOut={this.handleLogOut}
                  />
                );
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
          <Route
            path="/login"
            render={props => {
              if (this.state.isLoggedIn === false) {
                return (
                  <Signin
                    {...props}
                    isLoggedIn={this.state.isLoggedIn}
                    handleUserAuth={this.handleUserAuth}
                    handleLogIn={this.handleLogIn}
                  />
                );
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
        </div>
      </Switch>
    );
  }
}

export default App;
