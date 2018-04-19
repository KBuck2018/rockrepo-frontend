import React, { Component } from "react";
import "./Climb.css";
import ClimbMap from "../climbmap/ClimbMap";
import MQ_API_KEY from "../../config/Config2";
import axios from "axios";

class Climb extends Component {
  state = {
    directions: [],
    path: []
  };
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
        this.setState({
          path: response.data,
          directions: response.data.route.legs[0].maneuvers
        });
      });
  }

  render() {
    let direction = this.state.directions.map((direction, i) => {
      return <li key={i}> {direction.narrative} </li>;
    });

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
          <img className="mediumImage" src={climb.imgMedium} />
        </div>
        <button>Drive</button>
        <br />
        <div className="fact-container">
          <div className="facts">
            <p>{climb.name}</p>
            <p>Climb Type - {climb.type}</p>
            <p>Difficulty Level - {climb.rating}</p>
            <p>Stars - {climb.stars}</p>
            <p>Votes - {climb.starVotes}</p>
            <p>Pitches - {climb.pitches}</p>
            <a href={climb.url}>Link to more information </a>
          </div>
          <div className="facts">
            <p>Directions</p>
            {direction}
          </div>
        </div>
      </div>
    );
  }
}

export default Climb;
