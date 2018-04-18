import React, { Component } from "react";
import Table from "../table/Table";
import Simple_Map from "../map/Simple_Map";
import "./Main.css";
import { Switch, Route } from "react-router-dom";
import Climb from "../climb/Climb";

class Main extends Component {
  render() {
    return (
      <div className="main">
        <Switch>
          <Route
            path="/main/:id"
            render={props => {
              return <Climb climbs={this.props} {...props} />;
            }}
          />
          <Route
            path="/main"
            render={props => {
              return (
                <div>
                  <div id="map">
                    <Simple_Map climbs={this.props.climbs} {...props} />
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
