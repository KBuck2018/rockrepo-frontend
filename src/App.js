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
import Searchbar from "./components/searchbar/Searchbar";
import MQ_API_KEY from "./config/Config2";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      climbs: [],
      address: "",
      lat: 40.03,
      lng: -105.25
    };
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleUserAuth = this.handleUserAuth.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearchInput(e) {
    // e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSearch(e) {
    e.preventDefault();
    axios
      .get(
        "http://www.mapquestapi.com/geocoding/v1/address?key=" +
          MQ_API_KEY +
          "&location=" +
          this.state.address
      )
      .then(response => {
        this.setState({
          lat: response.data.results[0].locations[0].displayLatLng.lat,
          lng: response.data.results[0].locations[0].displayLatLng.lng
        });
      });
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
        "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=" +
          this.state.lat +
          "&lon=" +
          this.state.lng +
          "&maxDistance=10&minDiff=5.6&maxDiff=5.10&key=" +
          API_KEY
      )
      .then(response => {
        this.setState({
          climbs: response.data
        });
      })
      .catch(err => console.log(err));
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.climbs === nextState.climbs;
  }
  componentDidUpdate() {
    axios
      .get(
        "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=" +
          this.state.lat +
          "&lon=" +
          this.state.lng +
          "&maxDistance=10&minDiff=5.6&maxDiff=5.10&key=" +
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
          <Searchbar
            handleSearchInput={this.handleSearchInput}
            handleSearch={this.handleSearch}
          />
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
                return (
                  <Main
                    climbs={this.state.climbs}
                    lat={this.state.lat}
                    lng={this.state.lng}
                  />
                );
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
