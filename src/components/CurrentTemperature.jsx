import React, { Component } from 'react';



class CurrentTemperature extends Component {
  render() {
    return(
        <text x="60" y="130" fill="white" fontWeight="bold" fontSize="15">Current: {this.props.currentTemperature}</text>
    );
  }
}

export default CurrentTemperature;
