import React, { Component } from "react";
import "./Signout.css";

class Signout extends Component {
  render() {
    return (
      <div className="body">
        <h1>Logging Out</h1>
        <form className="form">
          <input
            className="userForm"
            value="Log Out"
            type="submit"
            onClick={this.props.handleLogOut}
          />
        </form>
      </div>
    );
  }
}

export default Signout;
