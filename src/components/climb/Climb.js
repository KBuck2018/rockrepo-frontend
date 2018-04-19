import React, { Component } from "react";
import "./Climb.css";
import ClimbMap from "../climbmap/ClimbMap";
import MQ_API_KEY from "../../config/Config2";
import axios from "axios";
class Climb extends Component {
  componentDidMount() {
    axios
      .get(
        "http://www.mapquestapi.com/directions/v2/route?key=" +
          MQ_API_KEY +
          "&from=" +
          this.props.lat +
          "%2C+" +
          this.props.lng +
          "&to=" +
          this.props.climbs.climbs.routes[0].latitude +
          "%2C+" +
          this.props.climbs.climbs.routes[0].longitude +
          "&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=true&enhancedNarrative=false&avoidTimedConditions=false"
      )
      .then(response => {
        console.log(response.data);
      });
  }

  render() {
    const climb = this.props.climbs.climbs.routes.find(
      climb => climb.id === parseInt(this.props.match.params.id)
    );
    return (
      <div className="climb-container">
        <h1 className="climb">{climb.name}</h1>
        <br />
        <div className="climb-map-container">
          <ClimbMap
            lat={this.props.lat}
            lng={this.props.lng}
            climbLat={climb.latitude}
            climbLon={climb.longitude}
            climbName={climb.name}
          />
          <button>Drive</button>
        </div>
        <br />
        <img className="mediumImage" src={climb.imgMedium} />
      </div>
    );
  }
}

export default Climb;
