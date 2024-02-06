import { cloneDeep } from "lodash";
import { Tetromino } from "./Tetromino.mjs";
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
      if (!(shape instanceof Tetromino) && !(shape instanceof NewTetromino)){shape = new NewTetromino(shape)}
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
    }else{
      this.falling = false
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
    let newActiveBlocks = this.getActiveTetrominoBlockPoints(this.activeObj.rotateLeft().objectArray)
    if (this.falling && this.canShapeFit(newActiveBlocks)){
      this.handleRotationOnBoard(this.activeObj.rotateLeft())
    }else if (this.activeChar === "I") { 
      return
    }else if (this.falling && this.canMoveToDirection(this.activeObj.rotateLeft().objectArray, "left")){
      this.handleRotationOnBoard(this.activeObj.rotateLeft(), "left")
    }else if (this.falling && this.canMoveToDirection(this.activeObj.rotateLeft().objectArray, "right")){
      this.handleRotationOnBoard(this.activeObj.rotateLeft(), "right")
    }
  }

  rotateRight(){
    let newActiveBlocks = this.getActiveTetrominoBlockPoints(this.activeObj.rotateRight().objectArray)
    if (this.falling && this.canShapeFit(newActiveBlocks)){
      this.handleRotationOnBoard(this.activeObj.rotateRight())
    }else if (this.activeChar === "I") { 
      return
    }else if (this.falling && this.canMoveToDirection(this.activeObj.rotateRight().objectArray, "left")){
      this.handleRotationOnBoard(this.activeObj.rotateRight(), "left")
    }else if (this.falling && this.canMoveToDirection(this.activeObj.rotateRight().objectArray, "right")){
      this.handleRotationOnBoard(this.activeObj.rotateRight(), "right")
    }
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
