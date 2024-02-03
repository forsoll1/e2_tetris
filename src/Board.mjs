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

    this.deleteOldActivePointsFromBoard()
    this.activeBlockPos = this.moveActiveBlockPosToDirection(this.activeBlockPos, direction)
    this.updateNewActivePointsToBoard()
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
  moveActiveBlockPosToDirection(shapeArray, direction){
    let movedShapeArray = []
    let yVal = 0
    let xVal = 0
    if(direction === "down") {yVal = 1}
    if(direction === "left") {xVal = -1}
    if(direction === "right") {xVal = 1}
    for (const point of shapeArray) {
      movedShapeArray.push([point[0] + yVal, point[1] + xVal])
    }
    return movedShapeArray
  }

  rotateLeft(){
    let newActiveBlocks = this.getActiveTetrominoBlockPoints(this.activeObj.rotateLeft().objectArray)
    if (this.falling && this.canShapeFit(newActiveBlocks)){
      this.handleRotationOnBoard(this.activeObj.rotateLeft())
    }
  }

  rotateRight(){
    let newActiveBlocks = this.getActiveTetrominoBlockPoints(this.activeObj.rotateRight().objectArray)
    if (this.falling && this.canShapeFit(newActiveBlocks)){
      this.handleRotationOnBoard(this.activeObj.rotateRight())
    }
  }

  handleRotationOnBoard(newTetromino){
    this.deleteOldActivePointsFromBoard()
    this.activeObj = newTetromino
    this.updateNewActivePointsToBoard()
  }

  deleteOldActivePointsFromBoard(){
    let tetrominoPointsWithBlock = this.getActiveTetrominoBlockPoints(this.activeObj.objectArray)
    for (let i = 0; i < tetrominoPointsWithBlock.length; i++) {
      this.board[tetrominoPointsWithBlock[i][0]][tetrominoPointsWithBlock[i][1]] = "." 
    }    
  }

  updateNewActivePointsToBoard(){
    let updatedTetrominoPointsWithBlock = this.getActiveTetrominoBlockPoints(this.activeObj.objectArray)
    for (let i = 0; i < updatedTetrominoPointsWithBlock.length; i++) {
      this.board[updatedTetrominoPointsWithBlock[i][0]][updatedTetrominoPointsWithBlock[i][1]] = this.activeChar
    }
  }

  canMoveToDirection(direction){
    let shapeToBeTested = this.moveActiveBlockPosToDirection(this.getActiveTetrominoBlockPoints(this.activeObj.objectArray),direction)
    return this.canShapeFit(shapeToBeTested)
    /*
    return this.canShapeFit(shapeToBeTested)*/
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
    let flattenTetromino = tetromino.flat()
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
