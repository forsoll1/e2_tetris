export class Board {
  width;
  height;
  board;
  falling;
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

  newDrop(shape){
    if(!this.falling){
      let shapeArray;
      if (shape.objectArray){shapeArray = shape.objectArray}
      else{shapeArray = [shape]}
      let shapeLeftEdge = Math.floor((this.width - shapeArray.length)/2)
      for (let i = 0; i < shapeArray.length; i++) {
        for (let j = 0; j < shapeArray[i].length; j++) {
          if (shapeArray[i][j] != ".") {this.activeBlockPos.push([i,(shapeLeftEdge + j)])}
          this.board[i][shapeLeftEdge + j] = shapeArray[i][j]
        }
      }
      this.falling = true
    }else{throw("already falling")}
  }
  
  drop(shape){
    if (!this.falling){
      this.newDrop(shape)
      let middle = Math.floor(this.width/2)
      this.board[0][middle] = shape
      this.activeBlockPos.push([0,middle])
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

  checkIfHitBottomOrOtherBlocks(arr){
    console.log('ACTIVE ARR: ', arr)
    for (let i = 0; i < arr.length; i++) {
      let yPos = arr[i][0]
      let xPos = arr[i][1]
      if(yPos + 1 === this.height){return true}
      if(this.board[yPos+1][xPos] != "." && !this.arr.includes([(yPos +1), xPos])) {return true}
    }
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
