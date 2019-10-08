import React, { Component } from 'react';
import './App.css';
import Grids from "./Grids";
import RotatableImage from "./RotatableImage";
import ImageParts from './ImageParts';
import ReactDOM from 'react-dom';

class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: Array(4).fill(true),
            record: Array(10).fill(0).map(row => Array(10).fill("empty")),
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
            },
            ImageDrag: Array(5).fill(null),
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
                        { this.state.show[0] && 
                        <RotatableImage id="battleShip1"
                                        arr={this.addImage("battleShip1")}
                                        rotate = {this.state.rotateImage}
                                        onClick={(event) => this.rotate(event)}
                                        class="bs1"

                        />
                         }
                         { this.state.show[1] &&
                        <RotatableImage id="battleShip2"
                                        arr={this.addImage("battleShip2")}
                                        rotate = {this.state.rotateImage}
                                        onClick={(event) => this.rotate(event)}
                                        class="bs2"
                        />
                         }
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
    
    findRotataIndex(classId){
        switch(classId){
            case "bs1": return 0;
            case "bs2": return 1;
            case "bs3": return 2;
            case "bs4": return 3;
            case "bs5": return 4;
            default: break;
        }
    }

    rotate(event){
        //rotate the ship only if the ship is in the battleshipOption container
        if(event.target.parentNode.id === "battleshipOption"){
            var ship;
            ship = this.findRotataIndex(event.target.className);
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
            case "battleShip1": arr = [ require("./images/battleShip1_0_Degree.png"), 
                                        require("./images/battleShip1_90_Degree.png"), 
                                        require("./images/battleShip1_180_Degree.png"), 
                                        require("./images/battleShip1_270_Degree.png")]
                                break;
            case "battleShip2": arr = [ require("./images/battleShip2_0_Degree.png"), 
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
    
    toggleShowState(classId, state){
        let showState = this.state.show;
        switch(classId){
            case 'bs1': showState[0] = state;
                        this.setState({ show: showState, });
                        break;
            case 'bs2': showState[1] = state;
                        this.setState({ show: showState, });
                        break;
            case 'bs3': showState[2] = state;
                        this.setState({ show: showState, });
                        break;
            case 'bs4': showState[3] = state;
                        this.setState({ show: showState, });
                        break;
            case 'bs5': showState[4] = state;
                        this.setState({ show: showState, });
                        break;
        }
    }

    drop(event) {
        var ships = ["bs1", "bs2", "bs3", "bs4", "bs5"]
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        //check if dragged and drop into the same container
        var check = event.target.contains(document.getElementById(data));
        if(!check){
            var imageTag = false;
            ships.forEach(function(ship){
                if(event.target.className === ship){
                    imageTag = true;
                }
            });
            var gridId = event.target.id;
            //dropping in one of the grid and not on the battleshipOption container or images that are in the battleshipOption container
            if( (event.target.id != "battleshipOption") &&
            (document.getElementById(gridId).parentNode.id != "battleshipOption")){
                if(imageTag){
                    gridId = document.getElementById(gridId).parentNode.id;
                }
                this.fillGrid(document.getElementById(data), document.getElementById(data).className, gridId);
            }else{//dropping back into the battleshipOption container
                this.toggleShowState(document.getElementById(data).className, true);
                this.unrenderShip(document.getElementById(data).className);
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
        var coordinate = this.gridToRowAndCol(gridId);
        //horizontal position
        if(orientation == "H"){
            if(plus){
                coordinate[1] += value;
                if((coordinate[1] > 10) || (coordinate[1] < 1)){
                    return null;
                }else{
                    return coordinate;
                } 
            }else{
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
                coordinate[0] += value;
                if((coordinate[0] > 10) || (coordinate[0] < 1)){
                    return null;
                }else{
                    return coordinate;
                }
            }else{
                coordinate[0] -= value;
                if((coordinate[0] > 10) || (coordinate[0] < 1)){
                    return null;
                }else{
                    return coordinate;
                }
            }
        }
    }

    fillGrid(shipImage, classId, gridId){
        var position = this.state.rotateImage[this.findRotataIndex(classId)];
        var outOfBound = false;
        var grids = null;
        switch(classId){
            case 'bs1': grids = this.computeShip1Grid(position, gridId);
                                break;
            case 'bs2': grids = this.computeShip2Grid(position, gridId);   
                                break;                 
        }
        for(var i = 0; i < grids.length; i++){
            if(grids[i] == null){
                outOfBound = true;
                break;
            }
        }
        if(!outOfBound){//ship will be within the grid
            if( !(this.computeOverlap(grids, classId)) ){//check if the grids are already occupied or not
                switch(classId){
                    case 'bs1': if(this.state.show[0]){
                                    let shipImg = this.state.ImageDrag;
                                    shipImg[0] = shipImage;
                                    this.setState({ ImageDrag: shipImg})
                                }
                                break;
                    case 'bs2': if(this.state.show[1]){
                                    let shipImg = this.state.ImageDrag;
                                    shipImg[1] = shipImage;
                                    this.setState({ ImageDrag: shipImg})
                                }
                                break;
                    case 'bs3': if(this.state.show[2]){
                                    let shipImg = this.state.ImageDrag;
                                    shipImg[2] = shipImage;
                                    this.setState({ ImageDrag: shipImg})
                                }
                                break;
                    case 'bs4': if(this.state.show[3]){
                                    let shipImg = this.state.ImageDrag;
                                    shipImg[3] = shipImage;
                                    this.setState({ ImageDrag: shipImg})
                                }
                                break;
                    case 'bs5': if(this.state.show[4]){
                                    let shipImg = this.state.ImageDrag;
                                    shipImg[4] = shipImage;
                                    this.setState({ ImageDrag: shipImg})
                                }
                                break;
                    default: break;
                }  
                this.renderSeparatePart(grids, classId, position);          
                this.toggleShowState(classId, false);
            }else{
                alert("Invalid placement, ship cannot be place because one or more ship will overlap a grid")
            }
        }else{//ship out of bound
            alert("Invalid placement, ship will be out of bounds")
        }
    }
    
    computeShip1Grid(position, gridId){
        switch(position){
                case 0: 
                case 2: return [this.modifyGrid(false, 2, gridId, "H"), this.modifyGrid(false, 1, gridId, "H"), 
                                this.gridToRowAndCol(gridId), this.modifyGrid(true, 1, gridId, "H"),
                                this.modifyGrid(true, 2, gridId, "H") ]
                case 1: 
                case 3: return [this.modifyGrid(false, 2, gridId, "V"),this.modifyGrid(false, 1, gridId, "V"), 
                                this.gridToRowAndCol(gridId), this.modifyGrid(true, 1, gridId, "V"),
                                this.modifyGrid(true, 2, gridId, "V") ]
        }
    }

    computeShip2Grid(position, gridId){
        switch(position){
                case 0: 
                case 2: return [this.modifyGrid(false, 1, gridId, "H"), this.gridToRowAndCol(gridId),
                                this.modifyGrid(true, 1, gridId, "H")]
                case 1: 
                case 3: return [this.modifyGrid(false, 1, gridId, "V"), this.gridToRowAndCol(gridId),
                                this.modifyGrid(true, 1, gridId, "V")]
        }
    }

    computeOverlap(arr, classId){
        for(var i = 0; i < arr.length; i++){
            var row = arr[i][0];
            var col = arr[i][1];
            if((this.state.record[row-1][col-1] != 'empty') && (this.state.record[row-1][col-1] != classId)){
                return true;
            }
        }
        return false;
    }

    addSeparateImage(shipId){
        var arr = null;
        switch(shipId){
            case "battleShip1": arr = [ require("./images/bs1_01.png"), 
                                        require("./images/bs1_02.png"), 
                                        require("./images/bs1_03.png"), 
                                        require("./images/bs1_04.png"),
                                        require("./images/bs1_05.png"),
                                        require("./images/bs1_11.png"), 
                                        require("./images/bs1_12.png"), 
                                        require("./images/bs1_13.png"), 
                                        require("./images/bs1_14.png"),
                                        require("./images/bs1_15.png"),
                                        require("./images/bs1_21.png"), 
                                        require("./images/bs1_22.png"), 
                                        require("./images/bs1_23.png"), 
                                        require("./images/bs1_24.png"),
                                        require("./images/bs1_25.png"),
                                        require("./images/bs1_31.png"), 
                                        require("./images/bs1_32.png"), 
                                        require("./images/bs1_33.png"), 
                                        require("./images/bs1_34.png"),
                                        require("./images/bs1_35.png")]
                                break;
            case "battleShip2": arr = [ require("./images/bs2_01.png"), 
                                        require("./images/bs2_02.png"), 
                                        require("./images/bs2_03.png"),
                                        require("./images/bs2_11.png"), 
                                        require("./images/bs2_12.png"), 
                                        require("./images/bs2_13.png"),
                                        require("./images/bs2_21.png"), 
                                        require("./images/bs2_22.png"), 
                                        require("./images/bs2_23.png"),
                                        require("./images/bs2_31.png"), 
                                        require("./images/bs2_32.png"), 
                                        require("./images/bs2_33.png")]
                                break;
            default:    arr = []
        }
        return arr;
    }

    rowAndColToGridId(coordinate){
        var alphabet = Object.keys(this.state.gridObj).find(key => this.state.gridObj[key] === coordinate[1]);
        return coordinate[0].toString() + alphabet;
    }

    setGridOccupied(value, grids){
        let rec = this.state.record;
        for(var i =0; i < grids.length; i++){
            var row = grids[i][0];
            var col = grids[i][1];
            rec[row-1][col-1] = value;
        }
        this.setState({record: rec,});
    }

    renderSeparatePart(targetGrid, classId, position){
        switch(classId){
            case 'bs1': this.renderShip1Part(position, targetGrid);
                        this.setGridOccupied('bs1', targetGrid);
                        break;
            case 'bs2': this.renderShip2Part(position, targetGrid);
                        this.setGridOccupied('bs2', targetGrid);
                        break;
        }
    }

    checkIfShipAlrOnGrid(value){
        var arr = []
        let rec = this.state.record;
        for(var i = 0; i < 10; i++){
            for(var j = 0; j < 10; j++){
                if(rec[i][j] == value){
                    arr.push([i+1, j+1]);
                    rec[i][j] = "empty";
                }
            }
        }
        this.setState({record: rec})
        return arr;
    }

    unrenderShip(shipToUnrender){
        var checkArr = this.checkIfShipAlrOnGrid(shipToUnrender); // check if ship is already on the grid
        var popArr = [] //grids to unrender ship parts
        if(checkArr.length != 0){
            for(var i = 0; i < checkArr.length; i++){
                popArr.push(this.rowAndColToGridId(checkArr[i]))
            }
            for(var i = 0; i < popArr.length; i++){
                ReactDOM.unmountComponentAtNode(document.getElementById(popArr[i]));
            }
        }
    }

    renderShip1Part(position, targetGrid){
        this.unrenderShip('bs1');
        var pushArr = [] //grids to render ship parts
        for(var i = 0; i < targetGrid.length; i++){//get all the gridId
            pushArr.push(this.rowAndColToGridId(targetGrid[i]));
        }
        for(i = 0; i < pushArr.length; i++){
            ReactDOM.render(<ImageParts id={'bs1_' + i} 
                                        src={this.addSeparateImage("battleShip1")} 
                                        rotate={position} 
                                        ship="battleShip1" 
                                        partNo={i} 
                                        class="bs1"
                                        shipImg={this.state.ImageDrag[0]}
                            />, 
                            document.getElementById(pushArr[i]));
        }
    }

    renderShip2Part(position, targetGrid){
        this.unrenderShip('bs2');
        var pushArr = [] //grids to render ship parts
        for(var i = 0; i < targetGrid.length; i++){//get all the gridId
            pushArr.push(this.rowAndColToGridId(targetGrid[i]));
        }
        for(i = 0; i < pushArr.length; i++){
            ReactDOM.render(<ImageParts id={'bs2_' + i} 
                                        src={this.addSeparateImage("battleShip2")} 
                                        rotate={position} 
                                        ship="battleShip2" 
                                        partNo={i}
                                        class="bs2"
                                        shipImg={this.state.ImageDrag[1]}
                            />, 
                            document.getElementById(pushArr[i]));
        }
    }
}

export default Board;