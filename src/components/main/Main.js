import React, { Component } from "react";
import Table from "../table/Table";
import Simple_Map from "../map/Simple_Map";
import "./Main.css";
import { Switch, Route } from "react-router-dom";
import Climb from "../climb/Climb";
import Searchbar from "./searchbar/Searchbar";

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Switch>
          <Route
            path="/main/:id"
            render={props => {
              return (
                <Climb
                  climbs={this.props}
                  lat={this.props.lat}
                  lng={this.props.lng}
                  {...props}
                />
              );
            }}
          />
          <Route
            path="/main"
            render={props => {
              return (
                <div>
                  <div id="map">
                    <Simple_Map
                      climbs={this.props.climbs}
                      lat={this.props.lat}
                      lng={this.props.lng}
                      {...props}
                    />
                  </div>
                  <br />
                  <Table props={this.props} />
                </div>
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default Main;
