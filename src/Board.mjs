import { cloneDeep } from "lodash";
import { Tetromino } from "./Tetromino.mjs";

export class Board {
  width;
  height;
  board;
  falling;
  activeChar;
  activeObj;
  activeBlockPos;

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
        this.activeBlockPos.push([i,(shapeLeftEdge + j)])
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

    let tetrominoPointsWithBlock = this.getActiveTetrominoBlockPoints(this.activeObj.objectArray)
    for (let i = 0; i < tetrominoPointsWithBlock.length; i++) {
      this.board[tetrominoPointsWithBlock[i][0]][tetrominoPointsWithBlock[i][1]] = "." }
    for (let i = 0; i < this.activeBlockPos.length; i++) {
      this.activeBlockPos[i][0] += yVal
      this.activeBlockPos[i][1] += xVal 
    }
    let updatedTetrominoPointsWithBlock = this.getActiveTetrominoBlockPoints(this.activeObj.objectArray)
    for (let i = 0; i < updatedTetrominoPointsWithBlock.length; i++) {
      this.board[updatedTetrominoPointsWithBlock[i][0]][updatedTetrominoPointsWithBlock[i][1]] = this.activeChar}  
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
    let shapeToBeTested = []
    for (let point of tetrominoPointsWithBlock) {
      let newPoint = [point[0] + yVal, point[1] + xVal]
      shapeToBeTested.push(newPoint)
    }
    return this.canShapeFit(shapeToBeTested)
  }

  canShapeFit(shapeArray){
    for (let i = 0; i < shapeArray.length; i++) {
      let yPos = shapeArray[i][0]
      let xPos = shapeArray[i][1]
      if(xPos < 0){return false}
      if(xPos === this.width){return false}
      if(yPos === this.height){return false}
      if(this.board[yPos][xPos] != "." && !this.arrayIncludesPoint(this.getActiveTetrominoBlockPoints(this.activeObj.objectArray), [yPos, xPos])){
        return false
      }
    }
    return true
  }

  getActiveTetrominoBlockPoints(tetromino){
    let tetrominoPointsWithBlock = []
    let flattenTetromino = this.activeObj.objectArray.flat()
    for (let i = 0; i < this.activeBlockPos.length; i++) {
      if(flattenTetromino[i] != "."){tetrominoPointsWithBlock.push(this.activeBlockPos[i])
      }
    }return  tetrominoPointsWithBlock
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
