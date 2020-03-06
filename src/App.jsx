import React, { Component } from 'react';
import MainPanel from './view/MainPanel';
import TemperatureData from './model/TemperatureData.model'

class App extends Component {

    
tempData = new TemperatureData(72,72,2,1.5,1);
    
    
  render() {
    return(
            <MainPanel temperatureData={this.tempData}/>
    );
  }
}

export default App;