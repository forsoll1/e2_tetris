export class Board {
  width;
  height;
  newBoard;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.newBoard = new Array();
    this.initBoard()
  }

  initBoard(){
    for (let index = 0; index < this.height; index++) {
      this.newBoard.push(Array(this.width).fill("."))
    }
  }

  
  drop(shape){
    let middle = Math.floor(this.width/2)
    this.newBoard[0][middle] = shape
  }

  toString() {
    let boardLines = [] 
    for (const line of this.newBoard) {
      let newLine = line.join('') + "\n"
      boardLines.push(newLine)
    }
    return boardLines.join('')
  }

}
