import React, { Component } from 'react';

class ImageParts extends Component{
    constructor(props){
        super(props);
        this.state = {
                originalShipImage: null
        }
    }

    dragStart(event) {
        event.dataTransfer.setData("text", event.target.id);
        switch(event.target.id){
            case "battleShip1": if((this.props.rotate[0] % 2) === 0){
                                  event.dataTransfer.setDragImage(this.props.shipImg, 75, 22.5);
                                }else{
                                  event.dataTransfer.setDragImage(this.props.shipImg, 25, 75);
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

    displayImage(arr, id, rotate, partNo){
        switch(id){
            case "battleShip1": rotate *= 5 // multiple by the ship lenght
                                return arr[rotate+partNo];
            case "battleShip2": rotate *= 3 // multiple by the ship lenght
                                return arr[rotate+partNo];
            default: return null;
        }
    }
    render(){
      return (
        <img    src={this.displayImage(this.props.src, this.props.ship, this.props.rotate, this.props.partNo)}
                id = {this.props.id}
                onDragStart={(event) => this.dragStart(event)}
                draggable="true" 
                className={this.props.class}
        />
      );
    }
  }
  
export default ImageParts;