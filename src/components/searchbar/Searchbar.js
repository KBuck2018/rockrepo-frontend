import React, { Component } from "react";

class Searchbar extends Component {
  render() {
    return (
      <form className="nav">
        <input
          type="text"
          name="address"
          onChange={this.props.handleSearchInput}
          placeholder="Search"
        />
        <input type="submit" onClick={this.props.handleSearch} value="submit" />
      </form>
    );
  }
}

export default Searchbar;
