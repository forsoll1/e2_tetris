export class Board {
  width;
  height;
  board;
  falling;
  activeBlockPos;

  testBoard;

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

  newDrop(shape){
    if(!this.falling){
      let shapeArray;
      if (shape.objectArray){shapeArray = shape.objectArray}
      else{shapeArray = [shape]}
      let shapeLeftEdge = Math.floor((this.width - shapeArray.length)/2)
      for (let i = 0; i < shapeArray.length; i++) {
        for (let j = 0; j < shapeArray[i].length; j++) {
          this.testBoard[i][shapeLeftEdge + j] = shapeArray[i][j]
        }
      }
    }else{throw("already falling")}
  }

  shapeToArray(shape){
    let newArr = []
    let shapeAsArray = shape.replace(/\t| |\n$/g, '').split("\n")

  }
  
  drop(shape){
    if (!this.falling){
      this.newDrop(shape)
      let middle = Math.floor(this.width/2)
      this.board[0][middle] = shape
      this.activeBlockPos = [0,middle]
      this.falling = true
    }else{throw("already falling")}
  }

  tick(){    
    let posX = this.activeBlockPos[1];
    let posY = this.activeBlockPos[0];

    if (posY + 1 === this.height){this.falling = false; return}
    if (this.board[posY+1][posX] != "."){this.falling = false; return}
    this.activeBlockPos[0] += 1
    this.board[posY+1][posX] = this.board[posY][posX]
    this.board[posY][posX] = "."
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
