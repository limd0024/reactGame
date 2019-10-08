import React, { Component } from 'react';

class RotatableImage extends Component{
    
    dragStart(event) {
        event.dataTransfer.setData("text", event.target.id);
        switch(event.target.id){
            case "battleShip1": if((this.props.rotate[0] % 2) === 0){
                                  event.dataTransfer.setDragImage(document.getElementById(event.target.id), 125, 25);
                                }else{
                                  event.dataTransfer.setDragImage(document.getElementById(event.target.id), 25, 125);
                                } 
                                break;
            case "battleShip2": if((this.props.rotate[1] % 2) === 0){
                                  event.dataTransfer.setDragImage(document.getElementById(event.target.id), 70, 22.5);
                                }else{
                                  event.dataTransfer.setDragImage(document.getElementById(event.target.id), 25, 75);
                                }
                                break;
            case "battleShip3": event.dataTransfer.setDragImage(document.getElementById(event.target.id), 70, 22.5);
                                break;
            case "battleShip4": event.dataTransfer.setDragImage(document.getElementById(event.target.id), 70, 22.5);
                                break;
            case "battleShip5": event.dataTransfer.setDragImage(document.getElementById(event.target.id), 70, 22.5);
                                break;
            default: break;
        }
    }

    displayImage(arr, id, rotate){
      switch(id){
        case "battleShip1": return arr[rotate[0]];
        case "battleShip2": return arr[rotate[1]];
        case "battleShip3": return arr[rotate[2]];
        case "battleShip4": return arr[rotate[3]];
        case "battleShip5": return arr[rotate[4]];
        default: return null;
    }
    }
    render(){
      return (
        <img    src={this.displayImage(this.props.arr, this.props.id, this.props.rotate)}
                onClick={(event) => this.props.onClick(event)}
                id={this.props.id}
                onDragStart={(event) => this.dragStart(event)}
                draggable="true" 
                className={this.props.class}
        />
      );
    }
  }
  
export default RotatableImage;