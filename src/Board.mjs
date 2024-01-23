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
    this.falling = false
    this.activeBlockPos = []
    this.initBoard()
  }

  initBoard(){
    for (let index = 0; index < this.height; index++) {
      this.board.push(Array(this.width).fill("."))
    }
  }
  
  drop(shape){
    if (!this.falling){
      let middle = Math.floor(this.width/2)
      this.board[0][middle] = shape
      this.activeBlockPos = [0,middle]
      this.falling = true
    }else{throw("already falling")}
  }

  tick(){
    let rowNum;
    let colNum;
    for (let rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
      for (let colIndex = 0; colIndex < this.board[rowIndex].length; colIndex++) {
        if (this.board[rowIndex][colIndex] != "."){
          rowNum = rowIndex
          colNum = colIndex}
        }
      }
      if (rowNum + 1 < this.height){
        this.board[rowNum + 1][colNum] = this.board[rowNum][colNum]
        this.board[rowNum][colNum] = "."
      }else{
        this.falling = false
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
