import React, { Component } from 'react';
import './App.css';
import Grids from "./Grids";
import RotatableImage from "./RotatableImage";
import { switchCase } from '@babel/types';

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
                        <Grids  onDrop={(event) => this.drop(event)}
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
        //rotate the ship only if the ship is in the battleshipOption container
        if(event.target.parentNode.id === "battleshipOption"){
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
        var ships = ["battleShip1", "battleShip2", "battleShip3", "battleShip4", "battleShip5"]
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        //check if dragged and drop into the same container
        var check = event.target.contains(document.getElementById(data));
        this.computeOverlap(data, event.target.id);
        if(!check){
            //check if image is dragged and being drop on another image
            var imageTag = false;
            ships.forEach(function(ship){
                if(event.target.id === ship){
                    imageTag = true;
                }
            });
            if(!imageTag){
                event.target.appendChild(document.getElementById(data));
            }
        }
    }

    fillGrid(){
        
    }

    computeOverlap(shipId, gridId){
        
    }

    checkGridOccupied(gridId){
        var index = 0;
        if(gridId.length == 2){
            switch(Number(gridId[0])){
                case 1: index = 0;
                        break;
                case 2: index = 10;
                        break;
                case 3: index = 20;
                        break;
                case 4: index = 30;
                        break;
                case 5: index = 40;
                        break;
                case 6: index = 50;
                        break;
                case 7: index = 60;
                        break;
                case 8: index = 70;
                        break;
                case 9: index = 80;
                        break;
            }
            switch(gridId[1]){
                case 'a': index += 0;
                        break;
                case 'b': index += 1;
                        break;
                case 'c': index += 2;
                        break;
                case 'd': index += 3;
                        break;
                case 'e': index += 4;
                        break;
                case 'f': index += 5;
                        break;
                case 'g': index += 6;
                        break;
                case 'h': index += 7;
                        break;
                case 'i': index += 8;
                        break;
                case 'j': index += 9;
                        break;
            }
        }else{
            switch(gridId[2]){
                case 'a': index = 90;
                        break;
                case 'b': index = 91;
                        break;
                case 'c': index = 92;
                        break;
                case 'd': index = 93;
                        break;
                case 'e': index = 94;
                        break;
                case 'f': index = 95;
                        break;
                case 'g': index = 96;
                        break;
                case 'h': index = 97;
                        break;
                case 'i': index = 98;
                        break;
                case 'j': index = 99;
                        break;
            }
        }
        if(this.state.record[index] == "empty"){
            return true;
        }
        return false;
    }

    renderSeparatePart(targetGrid, shipId){
        
    }
}

export default Board;