export class Board {
  width;
  height;
  board;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array();
    this.initBoard()
  }

  initBoard(){
    let row = ".".repeat(this.width) + "\n"
    for (let index = 0; index < this.height; index++) {
      this.board.push(row)
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
  }

  toString() {
    return this.board.join('')
  }

}
