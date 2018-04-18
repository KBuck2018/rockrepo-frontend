import React, { Component } from "react";
import "./Map.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

class Simple_Map extends Component {
  state = {
    lat: this.props.lat,
    lng: this.props.lng,
    zoom: 10
  };

  render() {
    const position = [this.props.lat, this.props.lng];
    let climbPosition = this.props.climbs.routes.map(climb => [
      climb.latitude,
      climb.longitude,
      climb.name
    ]);
    let marker = climbPosition.map((climb, i) => {
      var climbLocation = [climb[0], climb[1]];
      return (
        <div key={i}>
          <Marker position={climbLocation}>
            <Popup>
              <span>{climb[2]}</span>
            </Popup>
          </Marker>
        </div>
      );
    });
    // for (var i = 0; i <= climbPosition.length; i++) {
    //   console.log(climbPosition[i]);
    //   <Marker position={climbPosition[i]} />;
    // }
    // var climbPositions = [climbLatitude, climbLongitude];
    // console.log(climbPosition);

    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div>{marker}</div>
        <Marker position={position}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default Simple_Map;
