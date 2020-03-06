import React, { Component } from 'react';

class TestCurrent extends Component {
    
    
  render() {
    return(
        <p>Change Current Temperature</p>
        <form>
            <input type="text" onChange={this.updateTextBox}></input>
            <button onClick={this.updateCurrentTemp}>Submit</button>
        </form>
        <p style={{color:"red"}}>{this.state.warning}</p>
    );
  }
}

export default TestCurrent;