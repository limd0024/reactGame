import React, { Component } from 'react';
import './App.css';
import ImageParts from './ImageParts';

class Grid extends Component{
  render(){
    return (
      <button id={this.props.coordinate}
              className="square"
              onDrop={this.props.onDrop}
              onDragOver={this.props.onDragOver}
      >
      </button>
    );
  } 
}

export default Grid;