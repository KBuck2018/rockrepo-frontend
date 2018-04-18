import React, { Component } from "react";
import "./Map.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

class Simple_Map extends Component {
  state = {
    lat: 40.03,
    lng: -105.25,
    zoom: 13
  };

  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
