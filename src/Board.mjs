export class Board {
  width;
  height;
  board;
  newBoard;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array();
    this.newBoard = new Array();
    this.initBoard()
  }

  initBoard(){
    let row = ".".repeat(this.width) + "\n"
    for (let index = 0; index < this.height; index++) {
      this.board.push(row)
      this.newBoard.push(Array(this.width).fill("."))
    }
  }

  
  drop(shape){
    let middle = Math.floor(this.width/2)
    let firstRow = ""
    for (let index = 0; index < this.width; index++) {
      if (index != middle){firstRow += "."}
      else{firstRow += shape}
    }
    firstRow += "\n"
    this.board[0] = firstRow
    // for new board
    this.newBoard[0][middle] = shape
  }

  toString() {
    let boardLines = [] 
    for (const line of this.newBoard) {
      let newLine = line.join('') + "\n"
      boardLines.push(newLine)
    }

    return boardLines.join('')
    //return this.board.join('')
  }

}
