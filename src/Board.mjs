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

  newDrop(shape){
    if(!this.falling){
      shapeArray = shapeToArray(shape)
      let middle = Math.floor(this.width/2)
    }else{throw("already falling")}
  }

  shapeToArray(shape){
    newArr = []
    shape.replace(/\t| |\n$/g, '').split("\n")
    for (let line = 0; line < shapeAsArray.length; line++) {
        let row = []
        for (let char = 0; char < shapeAsArray[line].length; char++) {
            row.push(shapeAsArray[line][char])
        }
        newArr.push(row)
    }
    return newArr
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
    let posX = this.activeBlockPos[1];
    let posY = this.activeBlockPos[0];

    if (posY + 1 === this.height){this.falling = false; return}
    if (this.board[posY+1][posX] != "."){this.falling = false; return}
    this.activeBlockPos[0] += 1
    this.board[posY+1][posX] = this.board[posY][posX]
    this.board[posY][posX] = "."
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
