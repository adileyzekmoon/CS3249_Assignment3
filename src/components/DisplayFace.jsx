import React, { Component } from 'react';



class DisplayFace extends Component {
    state={
        targetTemperature: 65,
        currentTemperature: 72,
        dT: 2,
        dTcool: 1.5,
        dTheat: 1,
        coolingMode: "off",
    }

incrementTarget = () => {
    this.setState({targetTemperature: this.state.targetTemperature + 1});
    this.coolingMode();
}
decrementTarget = () => {
    this.setState({targetTemperature: this.state.targetTemperature - 1});
    this.coolingMode();
}
incrementCurrent = () => {
    this.setState({currentTemperature: this.state.currentTemperature + 1});
    this.coolingMode();
}
decrementCurrent = () => {
    this.setState({currentTemperature: this.state.currentTemperature - 1});
    this.coolingMode();
}



coolingMode = () =>{
    if (this.state.currentTemperature > this.state.targetTemperature + this.state.dT + this.state.dTcool){
        this.setState({coolingMode: "cooling"});
    } else if (this.state.currentTemperature < this.state.targetTemperature - this.state.dT - this.state.dTheat){
        this.setState({coolingMode: "heating"});
    } else if ((this.state.targetTemperature - (this.state.dT - this.state.dTheat) < this.state.currentTemperature) && (this.state.currentTemperature < this.state.targetTemperature + (this.state.dT - this.state.dTcool))){
        this.setState({coolingMode: "off"});
    }
}

 render() {
    return(
        <div>
            <h1>Target Temp = {this.state.targetTemperature}</h1>
            <h1>Current Temp = {this.state.currentTemperature}</h1>
            <p>Cooling Mode: {this.state.coolingMode}</p>
            <p>Target</p>
            
            <button onClick={this.decrementTarget}>-</button>
            <button onClick={this.incrementTarget}>+</button>
            <p>Current</p>
            <button onClick={this.decrementCurrent}>-</button>
            <button onClick={this.incrementCurrent}>+</button>
            
     
        </div>
    );
  }
}

export default DisplayFace;
