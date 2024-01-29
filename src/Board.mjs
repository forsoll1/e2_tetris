import { cloneDeep } from "lodash";
import { Tetromino } from "./Tetromino.mjs";

export class Board {
  width;
  height;
  board;
  falling;
  activeBlockPos;
  activeChar;
  activeObj;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array();
    this.testBoard = new Array();
    this.falling = false
    this.activeBlockPos = []
    this.initBoard()
  }

  initBoard(){
    for (let index = 0; index < this.height; index++) {
      this.board.push(Array(this.width).fill("."))
      this.testBoard.push(Array(this.width).fill("."))
    }
  }

  drop(shape){
    if(!this.falling){
      this.activeBlockPos = []
      shape = shape instanceof Tetromino? shape : new Tetromino(shape)
      this.activeObj = shape
      this.activeChar = shape.shapeChar
      this.activeBlocksToArray(shape.objectArray)
      this.falling = true
    }else{throw("already falling")}
  }

  activeBlocksToArray(shapeArray){
    let shapeLeftEdge = Math.floor((this.width - shapeArray.length)/2)
    for (let i = 0; i < shapeArray.length; i++) {
      for (let j = 0; j < shapeArray[i].length; j++) {
        if (shapeArray[i][j] != ".") {this.activeBlockPos.push([i,(shapeLeftEdge + j)])}
        this.board[i][shapeLeftEdge + j] = shapeArray[i][j]
      }
    }
  }

  tick(){
    if (this.checkIfHitBottomOrOtherBlocks(this.activeBlockPos)){this.falling = false; return}
    for (let i = 0; i < this.activeBlockPos.length; i++) {
      this.board[this.activeBlockPos[i][0]][this.activeBlockPos[i][1]] = "."
      this.activeBlockPos[i][0] += 1
    }
    for (let i = 0; i < this.activeBlockPos.length; i++) {
      this.board[this.activeBlockPos[i][0]][this.activeBlockPos[i][1]] = this.activeChar
    }
  }

  moveLeft(){
    if(this.falling){
      for (let i = 0; i < this.activeBlockPos.length; i++) {
        this.activeBlockPos[i][1] -= 1
      }
    }
  }

  checkIfHitBottomOrOtherBlocks(arr){
    for (let i = 0; i < arr.length; i++) {
      let yPos = arr[i][0]
      if(yPos + 1 === this.height){return true}
    }
    for (let i = 0; i < arr.length; i++){
      let yPos = arr[i][0]
      let xPos = arr[i][1]
      if(this.board[yPos+1][xPos] != "." && !this.arrayIncludesPoint(arr, [(yPos+1),xPos])) {return true}
    }
    return false
  }

  arrayIncludesPoint(arr, point){
    for (let i = 0; i < arr.length; i++) {
      if(arr[i][0] === point[0] && arr[i][1] === point[1]){ return true }
    }
    return false
  }

  hasFalling(){
    return this.falling
  }

  toString() {
    let boardLines = [] 
    for (const line of this.board) {
      let newLine = line.join('') + "\n"
      boardLines.push(newLine)
    }
    return boardLines.join('')
  }

}
