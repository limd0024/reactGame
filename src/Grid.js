import React, { Component } from 'react';
import './App.css';

class Grid extends Component{
  render(){
    return (
      <button id={this.props.coordinate}
              className="square"
              onDrop={(event) => this.props.onDrop(event)}
              onDragOver={(event) => this.props.onDragOver(event)}
      >
      </button>
    );
  } 
}

export default Grid;