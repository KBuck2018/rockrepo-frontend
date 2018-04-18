import React, { Component } from "react";

class Searchbar extends Component {
  render() {
    return (
      <form className="nav">
        <input type="text" placeholder="Search" />
        <input type="submit" value="submit" />
      </form>
    );
  }
}

export default Searchbar;
