import React, { Component } from 'react';



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

initialPos = e => {
    var degree = 90 + (Math.atan2(e.pageY - 100, e.pageX - 100) * 180 / Math.PI);
    var offset = degree - this.state.degree;
    
    this.setState({mouseDown: true,
                  offset: offset});
//    console.log(this.state.mouseDown);
//    console.log("Initial Degree:" + degree);

}

finalPos = e => {
    this.setState({mouseDown: false,});
    console.log(this.state.mouseDown)
}

//calculateDeg = () =>{
////    var originToInitial = Math.sqrt(Math.pow((100 - this.state.initialX),2) + Math.pow((100 - this.state.initialY),2));
////    var originToFinal = Math.sqrt(Math.pow((100 - this.state.finalX),2) + Math.pow((100 - this.state.finalY),2));
////    var initialToFinal = Math.sqrt(Math.pow((this.state.initialX - this.state.finalX),2) + Math.pow((this.state.initialY - this.state.finalY),2));
////    
////    var degree =  Math.acos(((Math.pow(originToInitial, 2)) + (Math.pow(originToFinal, 2)) - (Math.pow(initialToFinal, 2))) / (2 * originToInitial * originToFinal)) * 180 / Math.PI;
//    
//    var degree =  Math.atan2(this.state.finalY - 100, this.state.finalX - 100) * 180 / Math.PI;
//    
//    return degree;
//}

circleRender(){
    if (this.state.coolingMode == "cooling"){
        return(
            <svg height="200" width="200" transform={this.state.transform} >
                <circle cx="100" cy="100" r="80" stroke="grey" strokeWidth="3" fill="blue" onMouseDown={this.initialPos} onMouseUp={this.finalPos} onMouseMove={this.recordPos}/>
                <line x1="100" y1="20" x2="100" y2="40" style={{stroke:"white",strokeWidth:3}}/>        
            </svg>
        )
    }
    else if (this.state.coolingMode == "heating"){
        return(
            <svg height="200" width="200" transform={this.state.transform} >
                <circle cx="100" cy="100" r="80" stroke="grey" strokeWidth="3" fill="red" onMouseDown={this.initialPos} onMouseUp={this.finalPos} onMouseMove={this.recordPos}/>
                <line x1="100" y1="20" x2="100" y2="40" style={{stroke:"white",strokeWidth:3}}/>        
            </svg>
        )
    }
    else if (this.state.coolingMode == "off"){
        return(
            <svg height="200" width="200" transform={this.state.transform} >
                <circle cx="100" cy="100" r="80" stroke="grey" strokeWidth="3" fill="grey" onMouseDown={this.initialPos} onMouseUp={this.finalPos} onMouseMove={this.recordPos}/>
                <line x1="100" y1="20" x2="100" y2="40" style={{stroke:"white",strokeWidth:3}}/>        
            </svg>
        )
    }
}

recordPos = e =>{
    
    if (this.state.mouseDown == true){
        var degree = 90 + (Math.atan2(e.pageY - 100, e.pageX - 100) * 180 / Math.PI);
        var degDiff = degree - this.state.degree;
//        console.log("Final Degree:" + finalDegree);   
//        console.log("Diff in Degree:" + degDiff);
        var transform = "rotate(" + (degree) + ")";
        var tempDiff = degDiff/10;
        var newTemp = this.state.targetTemperature + tempDiff;
        this.setState({degree: degree,
                       transform: transform,
                      targetTemperature: newTemp});
        console.log(transform);
        this.coolingMode();
    }

}

printMousePosOnMO = e => {
    console.log(e.pageX + "  " + e.pageY)
}

 render() {
    return(
        <div>
            {this.circleRender()}
            <h1>Target Temp = {this.state.targetTemperature}</h1>
            <h1>Current Temp = {this.state.currentTemperature}</h1>
            <p>Cooling Mode: {this.state.coolingMode}</p>
            <button onClick={this.printMousePosOnMO}>Mouse Position</button>
            <p>Target</p>
            
            <button onClick={this.decrementTarget}>-</button>
            <button onClick={this.incrementTarget}>+</button>
            <p>Current</p>
            <button onClick={this.decrementCurrent}>-</button>
            <button onClick={this.incrementCurrent}>+</button>
            
            <h1>Initial X = {this.state.initialX}</h1>
            <h1>Initial Y = {this.state.initialY}</h1>
            
            <h1>Final X = {this.state.finalX}</h1>
            <h1>Final Y = {this.state.finalY}</h1>
            <h1>Degree = {this.state.degree}</h1>
            
            
     
        </div>
    );
  }
}

export default DisplayFace;
