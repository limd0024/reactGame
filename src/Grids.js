import React, { Component } from 'react';
import './App.css';
import Grid from './Grid';

class Grids extends Component{
  renderGrid(i){
    return (
      <Grid 
        coordinate={i}
        onDrop={this.props.onDrop} 
        onDragOver={this.props.onDragOver}
      />
    );
  }

  renderRow(rowNo){
    var i;
    var alphetCol = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i','j'];
    var singleGridRow = []
    for(i=1; i<=10;i++){
      singleGridRow.push(this.renderGrid(rowNo+alphetCol[i-1]))
    }
    return (
      <div className="board-row">
        {singleGridRow}
      </div>
    );
  }   

  renderRows(){
    var i;
    var wholeGridRow = []
    for(i=1; i<=10;i++){
      wholeGridRow.push(this.renderRow(i))
    }
    return wholeGridRow;
  }

  render(){
    return (
        this.renderRows()
    );
  }
  
}

export default Grids;