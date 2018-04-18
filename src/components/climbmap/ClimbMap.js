import React, { Component } from "react";
import "./ClimbMap.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

class ClimbMap extends Component {
  state = {
    lat: 40.03,
    lng: -105.25,
    zoom: 10
  };

  render() {
    console.log(this.props);
    const position = [this.state.lat, this.state.lng];
    let climbPosition = [this.props.climbLat, this.props.climbLon];

    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <div>{marker}</div> */}
        <Marker position={position}>
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker>
        <Marker position={climbPosition}>
          <Popup>
            <span>{this.props.climbName}</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

export default ClimbMap;
