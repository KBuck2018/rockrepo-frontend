import React, { Component } from "react";

class Signout extends Component {
  render() {
    return (
      <div>
        <h1>Logging Out?</h1>
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
