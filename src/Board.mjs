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
    let rowAsArray = new Array()
    for (let index = 0; index < this.width; index++) {
      rowAsArray.push(".")
    }
    let row = ".".repeat(this.width) + "\n"
    for (let index = 0; index < this.height; index++) {
      this.board.push(row)
      this.newBoard.push(rowAsArray)
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
    this.newBoard[0][middle] = "X"
  }

  toString() {
    return this.board.join('')
  }

}
