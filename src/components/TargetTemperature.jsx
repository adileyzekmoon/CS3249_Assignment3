import React, { Component } from 'react';



class TargetTemperature extends Component {
  render() {
    return(
        <text x="85" y="110" fill="white" fontWeight="bold" fontSize="30">{this.props.targetTemperature}</text>
    );
  }
}

export default TargetTemperature;
