export class Board {
  width;
  height;
  board;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.initBoard()
  }

  initBoard(){
    let row = ".".repeat(this.width) + "\n"
    this.board = ""
    for (let index = 0; index < this.height; index++) {
      this.board += row
    }
  }

  toString() {
    return this.board
  }

}
