import React, { Component } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Signin from "./components/signin/Signin";
import Signout from "./components/signout/Signout";
import Signup from "./components/signup/Signup";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import API_KEY from "./config/Config";
import Main from "./components/main/Main";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      climbs: []
    };
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleUserAuth = this.handleUserAuth.bind(this);
  }

  handleLogOut() {
    this.setState({
      email: "",
      password: "",
      isLoggedIn: false
    });

    localStorage.clear();
  }

  handleUserAuth(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSignUp(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/users/signup", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        localStorage.token = response.data.token;
        this.setState({
          isLoggedIn: true
        });
      })
      .catch(err => console.log(err));
  }

  handleLogIn(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        localStorage.token = response.data.token;
        this.setState({
          isLoggedIn: true
        });
      });
  }

  componentDidMount() {
    axios
      .get(
        "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=40.03&lon=-105.25&maxDistance=10&minDiff=5.6&maxDiff=5.10&key=" +
          API_KEY
      )
      .then(response => {
        this.setState({
          climbs: response.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Switch>
        <div>
          <nav>
            <Header
              isLoggedIn={this.state.isLoggedIn}
              email={this.state.email}
            />
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
                return <Redirect to="/main" />;
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
                return <Redirect to="/login" />;
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
                return <Redirect to="/main" />;
              }
            }}
          />
          <Route
            path="/main"
            render={props => {
              if (this.state.isLoggedIn === true) {
                return <Main climbs={this.state.climbs} />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
        </div>
      </Switch>
    );
  }
}

export default App;
