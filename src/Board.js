import React, { Component } from 'react';
import './App.css';
import Grids from "./Grids";
import RotatableImage from "./RotatableImage";

class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
          record: Array(100).fill("empty"),
          rotateImage: [0, 0, 0, 0, 0],
        }
    }

    render(){
        return (
            <div id="container">

                <div id="optionPanel">
                    <p>Please place all the battleship below in battlefield</p>
                    <div    id="battleshipOption" 
                            onDrop={(event) => this.drop(event)} 
                            onDragOver={(event) => this.allowDrop(event)}
                    >
                        <RotatableImage id="battleShip1"
                                        arr={this.addImage("battleShip1")}
                                        rotate = {this.state.rotateImage}
                                        onClick={(event) => this.rotate(event)}

                        />
                        <RotatableImage id="battleShip2"
                                        arr={this.addImage("battleShip2")}
                                        rotate = {this.state.rotateImage}
                                        onClick={(event) => this.rotate(event)}
                        />
                    </div>
                </div>

                <div id="displayPanel">
                    <div id="battleFieldGrid">
                        <Grids  onDrop={(event, rotate) => this.drop(event, rotate)}
                                onDragOver={(event) => this.allowDrop(event)}
                        />
                    </div>

                    <div id="inforDisplay">
                        <div id="GameStatues">
                            <p>Game Statues are displayed here!!!!</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    rotate(event){
        var ship;
        switch(event.target.id){
            case "battleShip1": ship = 0;
                                break;
            case "battleShip2": ship = 1;
                                break;
            case "battleShip3": ship = 2;
                                break;
            case "battleShip4": ship = 3;
                                break;
            case "battleShip5": ship = 4;
                                break;
            default: break;
        }
        let newRotation = this.state.rotateImage;
        newRotation[ship] += 1 
        if(newRotation[ship] >= 4){
          newRotation[ship] -= 4;
        }
        this.setState({
            rotateImage: newRotation,
        })
    }

    addImage(id){
        var arr;
        switch(id){
            case "battleShip1": arr = [     require("./images/battleShip1_0_Degree.jpg"), 
                                            require("./images/battleShip1_90_Degree.jpg"), 
                                            require("./images/battleShip1_180_Degree.jpg"), 
                                            require("./images/battleShip1_270_Degree.jpg")]
                                break;
            case "battleShip2": arr = [     require("./images/battleShip2_0_Degree.jpg"), 
                                            require("./images/battleShip2_90_Degree.jpg"), 
                                            require("./images/battleShip2_180_Degree.jpg"), 
                                            require("./images/battleShip2_270_Degree.jpg")]
                                break;
            default:    arr = []
        }
        return arr;
    }

    allowDrop(event) {
        event.preventDefault();
    }
    
    drop(event) { 
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        var check = event.target.contains(document.getElementById(data));
        this.renderSeparatePart(event.target.id, data)
        if(!check){
            event.target.appendChild(document.getElementById(data));
        }
    }

    renderSeparatePart(targetGrid, shipId){
        
    }
}

export default Board;