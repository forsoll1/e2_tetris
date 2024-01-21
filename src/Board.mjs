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
  }

  toString() {
    return this.board.join('')
  }

}
