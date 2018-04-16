import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  render() {
    let nav = [];
    if (this.props.isLoggedIn) {
      nav.push(
        <div key={1}>
          <Link to="/main" className="logo">
            I Like Big Routes
          </Link>
          <Link to="/logout" className="nav">
            Logout
          </Link>
          <Link to="/profile" className="nav">
            {this.props.email}
          </Link>
        </div>
      );
    } else {
      nav.push(
        <div key={2}>
          <Link to="/login" className="logo">
            I Like Big Routes
          </Link>
          <Link to="/login" className="nav">
            Login
          </Link>
          <Link to="/signup" className="nav">
            Signup
          </Link>
        </div>
      );
    }
    return <div className="header">{nav}</div>;
  }
}

export default Header;
