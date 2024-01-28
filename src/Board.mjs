export class Board {
  width;
  height;
  board;
  falling;
  activeBlockPos;
  activeChar;

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
      let shapeArray;
      if (shape.objectArray){shapeArray = shape.objectArray; this.activeChar = shape.shapeChar}
      else{shapeArray = [shape]; this.activeChar = shape}
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
  
  oldDrop(shape){
    if (!this.falling){
      this.newDrop(shape)
      let middle = Math.floor(this.width/2)
      this.board[0][middle] = shape
      this.activeBlockPos = [0,middle]
      this.falling = true
    }else{throw("already falling")}
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

  checkIfHitBottomOrOtherBlocks(arr){
    for (let i = 0; i < arr.length; i++) {
      let yPos = arr[i][0]
      let xPos = arr[i][1]
      if(yPos + 1 === this.height){return true}
      if(this.board[yPos+1][xPos] != "." && !arr.includes([(yPos +1), xPos])) {return true}
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
