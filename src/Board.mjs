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
  newActiveBlockPos;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array();
    this.testBoard = new Array();
    this.falling = false
    this.activeBlockPos = []
    this.newActiveBlockPos = []
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
      this.newActiveBlockPos = []
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
        this.newActiveBlockPos.push([i,(shapeLeftEdge + j)])
        if (shapeArray[i][j] != ".") {this.activeBlockPos.push([i,(shapeLeftEdge + j)])}
        this.board[i][shapeLeftEdge + j] = shapeArray[i][j]
      }
    }
  }

  tick(){
    if(this.falling && this.canMoveToDirection("down")){
      this.updateBoard("down")
    }else{
      this.falling = false
    }
  }

  updateBoard(direction){
    let yVal = 0
    let xVal = 0
    if(direction === "down") {yVal = 1}
    if(direction === "left") {xVal = -1}
    if(direction === "right") {xVal = 1}
    /*
    for (let i = 0; i < this.activeBlockPos.length; i++) {
      this.board[this.activeBlockPos[i][0]][this.activeBlockPos[i][1]] = "."
      this.activeBlockPos[i][0] += yVal
      this.activeBlockPos[i][1] += xVal
    }
    for (let i = 0; i < this.activeBlockPos.length; i++) {
      this.board[this.activeBlockPos[i][0]][this.activeBlockPos[i][1]] = this.activeChar
    }
    */
    let tetrominoPointsWithBlock = this.getActiveTetrominoBlockPoints(this.activeObj.objectArray)
    for (let i = 0; i < tetrominoPointsWithBlock.length; i++) {
      this.board[tetrominoPointsWithBlock[i][0]][tetrominoPointsWithBlock[i][1]] = "." }
    for (let i = 0; i < this.newActiveBlockPos.length; i++) {
      this.newActiveBlockPos[i][0] += yVal
      this.newActiveBlockPos[i][1] += xVal }
    tetrominoPointsWithBlock = this.getActiveTetrominoBlockPoints(this.activeObj.objectArray)
    for (let i = 0; i < tetrominoPointsWithBlock.length; i++) {
      this.board[tetrominoPointsWithBlock[i][0]][tetrominoPointsWithBlock[i][1]] = this.activeChar}  
  }

  moveLeft(){
    if(this.falling && this.canMoveToDirection("left")){
      this.updateBoard("left")
    }
  }

  moveRight(){
    if(this.falling && this.canMoveToDirection("right")){
      this.updateBoard("right")
    }
  }

  canMoveToDirection(direction){
    let tetrominoPointsWithBlock = this.getActiveTetrominoBlockPoints(this.activeObj.objectArray)
    let yVal = 0
    let xVal = 0
    if(direction === "down") {yVal = 1}
    if(direction === "left") {xVal = -1}
    if(direction === "right") {xVal = 1}
    /*

    */
    for (let i = 0; i < tetrominoPointsWithBlock.length; i++) {
      let yPos = tetrominoPointsWithBlock[i][0]
      let xPos = tetrominoPointsWithBlock[i][1]
      if(xPos + xVal < 0){return false}
      if(xPos + xVal === this.width){return false}
      if(yPos + yVal === this.height){return false}
      if(this.board[yPos + yVal][xPos + xVal] != "." && !this.arrayIncludesPoint(tetrominoPointsWithBlock, [(yPos + yVal),(xPos + xVal)])){
        return false
      }}return true
  }

  getActiveTetrominoBlockPoints(tetromino){
    let tetrominoPointsWithBlock = []
    let flattenTetromino = this.activeObj.objectArray.flat()
    for (let i = 0; i < this.newActiveBlockPos.length; i++) {
      if(flattenTetromino[i] != "."){tetrominoPointsWithBlock.push(this.newActiveBlockPos[i])
      }
    }return  tetrominoPointsWithBlock
  }

  canMoveLeft(){
    for (let i = 0; i < this.activeBlockPos.length; i++) {
      let yPos = this.activeBlockPos[i][0]
      let xPos = this.activeBlockPos[i][1]      
      if(xPos -1 < 0 || this.board[yPos][xPos -1] != "." && !this.arrayIncludesPoint(this.activeBlockPos, [yPos,(xPos -1)])){
        return false
      }
    }return true
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
