import React, { Component } from 'react';
import TargetTemperature from './TargetTemperature';
import CurrentTemperature from './CurrentTemperature';




class DisplayFace extends Component {
    state={
        targetTemperature: 72,
        currentTemperature: 72,
        dT: 2,
        dTcool: 1.5,
        dTheat: 1,
        coolingMode: "off",
        mouseDown: null,
        transform: "rotate(0)",
        degree: 0,
        warning: "",
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

updateTextBox = e => {
    this.setState({textBox: Number(e.target.value)})
}

updateCurrentTemp = e => {
    e.preventDefault();
    if (this.state.textBox < 32){
        this.setState({warning: "Attempted current temperature too low."})
    }
    else if (this.state.textBox > 100){
        this.setState({warning: "Attempted current temperature too high."})
    }
    else{
        this.setState({currentTemperature: this.state.textBox});
        this.setState({warning: ""});
    }
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

initialPos = e => {
    
    this.setState({mouseDown: true});
//    console.log(this.state.mouseDown);
//    console.log("Initial Degree:" + degree);

}

finalPos = e => {
    this.setState({mouseDown: false,});
    console.log(this.state.mouseDown)
}


circleRender(){
    if (this.state.coolingMode === "cooling"){
        return(
            <svg width="200" height="200">
                <circle cx="100" cy="100" r="80" stroke="grey" strokeWidth="3" fill="blue" onMouseDown={this.initialPos} onMouseUp={this.finalPos} onMouseMove={this.recordPos}/> 
                <line x1="100" y1="20" x2="100" y2="40" style={{stroke:"white",strokeWidth:3}} transform={this.state.transform} onMouseDown={this.initialPos} onMouseUp={this.finalPos} onMouseMove={this.recordPos}/> 
                <text x="85" y="110" fill="white" fontWeight="bold" fontSize="30">{this.state.targetTemperature}</text>
                <text x="60" y="130" fill="white" fontWeight="bold" fontSize="15">Current: {this.state.currentTemperature}</text>
            </svg>        )
    }
    else if (this.state.coolingMode === "heating"){
        return(
            <svg width="200" height="200">
                <circle cx="100" cy="100" r="80" stroke="grey" strokeWidth="3" fill="red" onMouseDown={this.initialPos} onMouseUp={this.finalPos} onMouseMove={this.recordPos}/> 
                <line x1="100" y1="20" x2="100" y2="40" style={{stroke:"white",strokeWidth:3}} transform={this.state.transform} onMouseDown={this.initialPos} onMouseUp={this.finalPos} onMouseMove={this.recordPos}/> 
                <text x="85" y="110" fill="white" fontWeight="bold" fontSize="30">{this.state.targetTemperature}</text>
                <text x="60" y="130" fill="white" fontWeight="bold" fontSize="15">Current: {this.state.currentTemperature}</text>
            </svg>        )
    }
    else if (this.state.coolingMode === "off"){
        return(
            <svg width="200" height="200">
                <circle cx="100" cy="100" r="80" stroke="grey" strokeWidth="3" fill="grey" onMouseDown={this.initialPos} onMouseUp={this.finalPos} onMouseMove={this.recordPos}/> 
                <line x1="100" y1="20" x2="100" y2="40" style={{stroke:"white",strokeWidth:3}} transform={this.state.transform} onMouseDown={this.initialPos} onMouseUp={this.finalPos} onMouseMove={this.recordPos}/> 
                <text x="85" y="110" fill="white" fontWeight="bold" fontSize="30">{this.state.targetTemperature}</text>
                <text x="60" y="130" fill="white" fontWeight="bold" fontSize="15">Current: {this.state.currentTemperature}</text>
            </svg>
        )
    }
}

lineRender(){
    return(
        <line x1="100" y1="20" x2="100" y2="40" style={{stroke:"white",strokeWidth:3}} transform={this.state.transform} onMouseDown={this.initialPos} onMouseUp={this.finalPos} onMouseMove={this.recordPos}/> 
    )
}

recordPos = e =>{
    
    if (this.state.mouseDown === true){
        var degree = 90 + (Math.atan2(e.pageY - 100, e.pageX - 100) * 180 / Math.PI);
        if ((degree <= 270) && (degree >180)){
            degree = -90;
        } 
        else if ((degree <= 180) && (degree >90)){
            degree = 90;
        }
//        console.log("Final Degree:" + finalDegree);   
//        console.log("Diff in Degree:" + degDiff);
        var transform = "rotate(" + (degree) + ", 100, 100)";
        var temperature = Math.round(degree/6 + 65);
        this.setState({degree: degree,
                       transform: transform,
                      targetTemperature: temperature});
        console.log(transform);
        this.coolingMode();
        
    }

}

 render() {
    return(
        <div>
            {this.circleRender()}
            
            <h1>Target Temp = {this.state.targetTemperature}</h1>
            <h1>Current Temp = {this.state.currentTemperature}</h1>
            <p>Cooling Mode: {this.state.coolingMode}</p>

            <p>Change Current Temperature</p>
            <form>
                <input type="text" onChange={this.updateTextBox}></input>
                <button onClick={this.updateCurrentTemp}>Submit</button>
            </form>
            <p style={{color:"red"}}>{this.state.warning}</p>
            
            
     
        </div>
    );
  }
}

export default DisplayFace;
