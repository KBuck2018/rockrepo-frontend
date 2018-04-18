import React, { Component } from "react";
import Axios from "axios";
import API_KEY from "../../config/Config";
class Climb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setId: this.props.match.params.id,
      climb: []
    };
  }

  componentDidMount() {
    Axios.get(
      "https://www.mountainproject.com/data/get-routes?routeIds=" +
        this.state.setId +
        "&key=" +
        API_KEY
    )
      .then(response => {
        this.setState({
          climb: response.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.setId);
    console.log(this.state.climb);
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

export default Climb;
