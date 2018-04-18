import React, { Component } from "react";
import "./Climb.css";
import ClimbMap from "../climbmap/ClimbMap";
class Climb extends Component {
  render() {
    console.log(this.props.climbs.climbs.routes);
    const climb = this.props.climbs.climbs.routes.find(
      climb => climb.id === parseInt(this.props.match.params.id)
    );
    return (
      <div className="climb-container">
        <h1 className="climb">{climb.name}</h1>
        <br />
        <div className="climb-map-container">
          <ClimbMap
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
