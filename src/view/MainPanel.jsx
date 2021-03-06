import React, { Component } from 'react';
import { interpret } from 'xstate';
import { thermostatMachine } from '../thermostatMachine';


class MainPanel extends Component {
    state={
        targetTemperature: this.props.temperatureData.targetTemperature,
        currentTemperature: this.props.temperatureData.currentTemperature,
        dT: this.props.temperatureData.dT,
        dTcool: this.props.temperatureData.dTCool,
        dTheat: this.props.temperatureData.dTHeat,
        coolingMode: "off",
        mouseDown: null,
        transform: "rotate(0)",
        degree: 0,
        warning: "",
        current: thermostatMachine.initialState

    }

service = interpret(thermostatMachine).onTransition(current =>
    this.setState({ current })
  );

 componentDidMount() {
    this.service.start();
  }

  componentWillUnmount() {
    this.service.stop();
  }

//ViewModel functions

coolingMode = () =>{
    if (this.state.currentTemperature > this.state.targetTemperature + this.state.dT + this.state.dTcool){
        this.setState({coolingMode: "cooling"});
        this.service.send('Hot');
    } else if (this.state.currentTemperature < this.state.targetTemperature - this.state.dT - this.state.dTheat){
        this.setState({coolingMode: "heating"});
        this.service.send('Cold');
    } else if ((this.state.targetTemperature - (this.state.dT - this.state.dTheat) < this.state.currentTemperature) && (this.state.currentTemperature < this.state.targetTemperature + (this.state.dT - this.state.dTcool))){
        this.setState({coolingMode: "off"});
        this.service.send('Neutral');

    }
}

mouseDown = e => {
    this.service.send('AdjustThermostat');
    this.setState({mouseDown: true});

}

mouseUp = e => {
    
    //Custom Event that returns degree of current angle
    var radialSliderEvent = new CustomEvent('RadialSlider',{detail: this.state.degree});  
    document.addEventListener('RadialSlider', function(e) {
        console.log("Current angle: " + e.detail);
        return e.detail;
    })   
    
    this.setState({mouseDown: false,});
    console.log(this.state.mouseDown)
     
    document.dispatchEvent(radialSliderEvent);
}

mouseMove = e =>{     
    
    if (this.state.mouseDown === true){
        var degree = 90 + (Math.atan2(e.pageY - 100, e.pageX - 100) * 180 / Math.PI);
        if ((degree <= 270) && (degree >180)){
            degree = -90;
        } 
        else if ((degree <= 180) && (degree >90)){
            degree = 90;
        }

        var transform = "rotate(" + (degree) + ", 100, 100)";
        var temperature = Math.round(degree/6 + 65);
        this.setState({degree: degree,
                       transform: transform,
                      targetTemperature: temperature});
        this.coolingMode();
        
    }

}

scrollDial = e => {
    var radialSliderEvent = new CustomEvent('RadialSlider',{detail: this.state.degree});  
    document.addEventListener('RadialSlider', function(e) {
        console.log("Current angle: " + e.detail);
        return e.detail;
    })   
    
    var degree = this.state.degree + (e.deltaY*-0.01);
    if (degree < -90){
        degree = -90;
    } 
    else if ((degree <= 270) && (degree >180)){
        degree = -90;
    } 
    else if ((degree <= 180) && (degree >90)){
        degree = 90;
    }
    
    var transform = "rotate(" + (degree) + ", 100, 100)";
    var temperature = Math.round(degree/6 + 65);
    this.setState({degree: degree,
                   transform: transform,
                   targetTemperature: temperature});
    this.coolingMode();
    
    
    
    document.dispatchEvent(radialSliderEvent);
}


//Test functions


updateTextBox = e => {
    this.setState({textBox: Number(e.target.value)})
}

updateCurrentTemp = e => {
    e.preventDefault();
    if (this.state.textBox < 32){
        this.setState({warning: "Attempted current temperature too low. Please input value between 32 and 80 inclusive."})
    }
    else if (this.state.textBox > 100){
        this.setState({warning: "Attempted current temperature too high. Please input value between 32 and 80 inclusive."})
    }
    else if (isNaN(this.state.textBox)){
        this.setState({warning: "Input is not a number. Please input value between 32 and 80 inclusive."})
    }
    else{
        this.setState({currentTemperature: this.state.textBox});
        this.setState({warning: ""});
    }
}



// View functions


circleRender(){
    if (this.state.coolingMode === "cooling"){
        return(
            <svg width="200" height="200">
                <circle cx="100" cy="100" r="80" stroke="grey" strokeWidth="3" fill="blue" onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseMove={this.mouseMove} onWheel={this.scrollDial}/> 
                <line x1="100" y1="20" x2="100" y2="40" style={{stroke:"white",strokeWidth:3}} transform={this.state.transform} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseMove={this.mouseMove}/> 
                <text x="85" y="110" fill="white" fontWeight="bold" fontSize="30">{this.state.targetTemperature}</text>
                <text x="60" y="130" fill="white" fontWeight="bold" fontSize="15">Current: {this.state.currentTemperature}</text>
                <text x="70" y="150" fill="white" fontWeight="bold" fontSize="15">{this.state.coolingMode}</text>
            </svg>        )
    }
    else if (this.state.coolingMode === "heating"){
        return(
            <svg width="200" height="200">
                <circle cx="100" cy="100" r="80" stroke="grey" strokeWidth="3" fill="red" onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseMove={this.mouseMove} onWheel={this.scrollDial}/> 
                <line x1="100" y1="20" x2="100" y2="40" style={{stroke:"white",strokeWidth:3}} transform={this.state.transform} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseMove={this.mouseMove}/> 
                <text x="85" y="110" fill="white" fontWeight="bold" fontSize="30">{this.state.targetTemperature}</text>
                <text x="60" y="130" fill="white" fontWeight="bold" fontSize="15">Current: {this.state.currentTemperature}</text>
                <text x="70" y="150" fill="white" fontWeight="bold" fontSize="15">{this.state.coolingMode}</text>
            </svg>        )
    }
    else if (this.state.coolingMode === "off"){
        return(
            <svg width="200" height="200">
                <circle cx="100" cy="100" r="80" stroke="grey" strokeWidth="3" fill="grey" onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseMove={this.mouseMove} onWheel={this.scrollDial}/> 
                <line x1="100" y1="20" x2="100" y2="40" style={{stroke:"white",strokeWidth:3}} transform={this.state.transform} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseMove={this.mouseMove}/> 
                <text x="85" y="110" fill="white" fontWeight="bold" fontSize="30">{this.state.targetTemperature}</text>
                <text x="60" y="130" fill="white" fontWeight="bold" fontSize="15">Current: {this.state.currentTemperature}</text>
                <text x="90" y="150" fill="white" fontWeight="bold" fontSize="15">{this.state.coolingMode}</text>
            </svg>
        )
    }
}


 render() {
     
    return(
        <div>
            {this.circleRender()}
            
            <p>Current State: {this.state.current.value}</p>
            
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


export default MainPanel;