import React, { Component } from "react";

class Loading extends Component {
  componentWillUnmount() {
    console.log("component will unmount");
  }
  render() {
    return <div>Loading...</div>;
  }
}

export { Loading };
