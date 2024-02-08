import { cloneDeep } from "lodash";
import { NewTetromino } from "./NewTetromino.mjs";

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
      if (!(shape instanceof NewTetromino)){shape = new NewTetromino(shape)}
      this.activeObj = shape
      this.activeChar = shape.shapeChar
      this.activeBlocksToArray(shape.objectArray)
      this.updateNewActivePointsToBoard()
      this.falling = true
    }else{throw("already falling")}
  }

  activeBlocksToArray(shapeArray){
    let shapeLeftEdge = Math.floor((this.width - shapeArray.length)/2)
    for (let i = 0; i < shapeArray.length; i++) {
      for (let j = 0; j < shapeArray[i].length; j++) {
        this.activeBlockPos.push([i,(shapeLeftEdge + j)])
      }
    }
    if(this.allSameValues(shapeArray[0]) && shapeArray[0].length > 1){
      for (let i = 0; i < this.activeBlockPos.length; i++) {
        this.activeBlockPos[i][0] -= 1
      }
    }
  }

  allSameValues(arr){
    let val1 = arr[0]
    for (let i = 0; i < arr.length; i++) {
      if(arr[i] !== val1){return false}
    }
    return true
  }

  tick(){
    if(this.falling && this.canMoveToDirection(this.activeObj.objectArray, "down")){
      this.updateBoard("down")
    }else if (this.falling){
      this.handleLineClear()
      this.falling = false
    }
  }

  handleLineClear(){
    let clearedLineIndexes = []
    for (let i = 0; i < this.board.length; i++) {
      if (!(this.board[i].includes("."))){
        clearedLineIndexes.push(i)
      }
    }
    if (clearedLineIndexes.length > 0){
      for (let i = 0; i < clearedLineIndexes.length; i++) {
        for (let j = clearedLineIndexes[i]; j > -1; j--) {
          if (j > 0){this.board[j] = this.board[j - 1]}
          if (j === 0){this.board[j] = Array(this.width).fill(".")}
        }
      }
    }
  }
  
  updateBoard(direction){
    this.deleteOldActivePointsFromBoard()
    this.activeBlockPos = this.moveActiveBlockPosToDirection(this.activeBlockPos, direction)
    this.updateNewActivePointsToBoard()
  }

  moveLeft(){
    if(this.falling && this.canMoveToDirection(this.activeObj.objectArray, "left")){
      this.updateBoard("left")
    }
  }

  moveRight(){
    if(this.falling && this.canMoveToDirection(this.activeObj.objectArray, "right")){
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
    this.handleRotation(this.activeObj.rotateLeft())
  }

  rotateRight(){
    this.handleRotation(this.activeObj.rotateRight())
  }

  handleRotation(rotatedObject){
    let newActiveBlocks = this.getActiveTetrominoBlockPoints(rotatedObject.objectArray)
    if (this.falling && this.canShapeFit(newActiveBlocks)){
      this.handleRotationOnBoard(rotatedObject)
      return
    }
    if (this.activeChar === "I"){return}
    if (this.falling && this.canMoveToDirection(rotatedObject.objectArray, "left")){
      this.handleRotationOnBoard(rotatedObject, "left")
      return}
    if (this.falling && this.canMoveToDirection(rotatedObject.objectArray, "right")){
      this.handleRotationOnBoard(rotatedObject, "right")
      return}
  }

  handleRotationOnBoard(newTetromino, kickDirection){
    this.deleteOldActivePointsFromBoard()
    this.activeObj = newTetromino
    if(kickDirection){
      this.activeBlockPos = this.moveActiveBlockPosToDirection(this.activeBlockPos, kickDirection)
    }
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

  canMoveToDirection(objectArray, direction){
    let shapeToBeTested = this.moveActiveBlockPosToDirection(this.getActiveTetrominoBlockPoints(objectArray),direction)
    return this.canShapeFit(shapeToBeTested)
  }

  canShapeFit(shapeArray){
    for (let i = 0; i < shapeArray.length; i++) {
      let yPos = shapeArray[i][0]
      let xPos = shapeArray[i][1]
      if(yPos < 0){return false}
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
