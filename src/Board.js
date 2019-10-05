import React, { Component } from 'react';
import './App.css';
import Grids from "./Grids";
import RotatableImage from "./RotatableImage";

class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
          record: Array(10).fill(Array(10).fill("empty")),
          rotateImage: [0, 0, 0, 0, 0],
          gridObj: {
                        a: 1,
                        b: 2,
                        c: 3,
                        d: 4,
                        e: 5,
                        f: 6,
                        g: 7,
                        h: 8,
                        i: 9,
                        j: 10
                }
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
    
    findRotataIndex(id){
        switch(id){
                case "battleShip1": return 0;
                case "battleShip2": return 1;
                case "battleShip3": return 2;
                case "battleShip4": return 3;
                case "battleShip5": return 4;
                default: break;
        }
    }

    rotate(event){
        //rotate the ship only if the ship is in the battleshipOption container
        if(event.target.parentNode.id === "battleshipOption"){
            var ship;
            ship = this.findRotataIndex(event.target.id);
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
            case "battleShip1": arr = [     require("./images/battleShip1_0_Degree.png"), 
                                            require("./images/battleShip1_90_Degree.png"), 
                                            require("./images/battleShip1_180_Degree.png"), 
                                            require("./images/battleShip1_270_Degree.png")]
                                break;
            case "battleShip2": arr = [     require("./images/battleShip2_0_Degree.png"), 
                                            require("./images/battleShip2_90_Degree.png"), 
                                            require("./images/battleShip2_180_Degree.png"), 
                                            require("./images/battleShip2_270_Degree.png")]
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
        if(!check){
            //check if image is dragged and being drop on another image
            var imageTag = false;
            ships.forEach(function(ship){
                if(event.target.id === ship){
                        imageTag = true;
                }
            });
            if(!imageTag){
                if(event.target.id != "battleshipOption"){//dropping in one of the grid
                        console.log(this.fillGrid(data, event.target.id));
                }else{//dropping back into the battleshipOption container
                        event.target.appendChild(document.getElementById(data));
                }
            }
        }
    }

    gridToRowAndCol(gridId){
        var len = gridId.length;
        var row = null;
        var col = null;
        if(len == 2){
                row = parseInt(gridId[0]);
                col = this.state.gridObj[gridId[1]];
        }else{
                row = 10;
                col = this.state.gridObj[gridId[2]];
        }
        return [row, col];
    }

    modifyGrid(plus, value, gridId, orientation){
        var coordinate = null;
        //horizontal position
        if(orientation == "H"){
                if(plus){
                        coordinate = this.gridToRowAndCol(gridId);
                        coordinate[1] += value;
                        if((coordinate[1] > 10) || (coordinate[1] < 1)){
                                return null;
                        }else{
                                return coordinate;
                        } 
                }else{
                        coordinate = this.gridToRowAndCol(gridId);
                        coordinate[1] -= value;
                        if((coordinate[1] > 10) || (coordinate[1] < 1)){
                                return null;
                        }else{
                                return coordinate;
                        } 
                }
        //vertical position
        }else{
                if(plus){
                        coordinate = this.gridToRowAndCol(gridId);
                        coordinate[0] += value;
                        if((coordinate[0] > 10) || (coordinate[0] < 1)){
                                return null;
                        }else{
                                return coordinate;
                        }
                }else{
                        coordinate = this.gridToRowAndCol(gridId);
                        coordinate[0] -= value;
                        if((coordinate[0] > 10) || (coordinate[0] < 1)){
                                return null;
                        }else{
                                return coordinate;
                        }
                }
        }
    }

    fillGrid(shipId, gridId){
        var position = this.state.rotateImage[this.findRotataIndex(shipId)];
        var outOfBound = false;
        switch(shipId){
                case 'battleShip1':     var grids = this.computeShip1Grid(position, gridId);
                                        for(var i = 0; i < 5; i++){
                                                if(grids[i] == null){
                                                        outOfBound = true;
                                                        break;
                                                }
                                        }
                                        if(!outOfBound){
                                                
                                        }else{
                                                
                                        }
        }
    }
    
    computeShip1Grid(position, gridId){
        switch(position){
                case 0: 
                case 2: return [this.modifyGrid(false, 1, gridId, "H"), this.gridToRowAndCol(gridId),
                                this.modifyGrid(true, 1, gridId, "H"), this.modifyGrid(true, 2, gridId, "H"),
                                this.modifyGrid(true, 3, gridId, "H") ]
                case 1: 
                case 3: return [this.modifyGrid(false, 1, gridId, "V"), this.gridToRowAndCol(gridId),
                                this.modifyGrid(true, 1, gridId, "V"), this.modifyGrid(true, 2, gridId, "V"),
                                this.modifyGrid(true, 3, gridId, "V") ]
        }
    }

    computeOverlap(arr){
        
    }

    renderSeparatePart(targetGrid, shipId){
        
    }
}

export default Board;