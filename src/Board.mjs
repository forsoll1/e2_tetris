export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let row = ".".repeat(this.width) + "\n"
    let board = ""
    for (let index = 0; index < this.height; index++) {
      board += row
    }
    return board
  }
}
