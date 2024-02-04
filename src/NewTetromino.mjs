export class NewTetromino{
    static T_SHAPE = new NewTetromino(this.tetroShapes["T"][0])
    static I_SHAPE = new NewTetromino(this.tetroShapes["I"][0])
    static L_SHAPE = new NewTetromino(this.tetroShapes["L"][0])
    static J_SHAPE = new NewTetromino(this.tetroShapes["J"][0])
    static S_SHAPE = new NewTetromino(this.tetroShapes["S"][0])
    static Z_SHAPE = new NewTetromino(this.tetroShapes["Z"][0])
    static O_SHAPE = new NewTetromino(this.tetroShapes["O"][0])
 
    static tetroShapes = {
        "I": ["....\nIIII\n....\n....", "..I.\n..I.\n..I.\n..I."],
        "T": ["...\nTTT\n.T.", ".T.\nTT.\n.T.", "...\n.T.\nTTT", ".T.\n.TT\n.T."],
        "L": ["...\nLLL\nL..", "LL.\n.L.\n.L.", "...\n..L\nLLL", ".L.\n.L.\n.LL"],
        "J": ["...\nJJJ\n..J", ".J.\n.J.\nJJ.", "...\nJ..\nJJJ", ".JJ\n.J.\n.J."],
        "S": ["...\n.SS\nSS.", "S..\nSS.\n.S.",],
        "Z": ["...\nZZ.\n.ZZ", "..Z\n.ZZ\n.Z."],
        "O": [".OO\n.OO\n..."],
    }

    objectArray;
    shapeChar;

    constructor(shape){
        this.objectArray = []
        let shapeAsArray = shape.replace(/\t| |\n$/g, '').split("\n")
        for (let line = 0; line < shapeAsArray.length; line++) {
            let row = []
            for (let char = 0; char < shapeAsArray[line].length; char++) {
                    let newChar = shapeAsArray[line][char]
                    if(!this.shapeChar && newChar != "."){this.shapeChar = newChar}
                    row.push(newChar)
            }
            this.objectArray.push(row)
        }
    }

    handleRotate(direction){
        let shapes = this.tetroShapes[shapeChar]
        let pointer;
        for (let i = 0; i < shapes.length; i++) {
            if (this.toString() === shapes[i]){pointer = i}
        }
        if (pointer + direction < 0){pointer = shapes.length - 1}
        else if (pointer + direction === shapes.length){pointer = 0}
        else {pointer += direction}
        return NewTetromino(this.tetroShapes[this.shapeChar][pointer])
    }

    rotateRight(){
        if (this.shapeChar === "O"){return this}
        this.handleRotate(1)
    }

    rotateLeft(){
        if (this.shapeChar === "O"){return this}
        this.handleRotate(-1)    
    }

    toString(arr){
        let array1 = []
        if (arr){array1 = arr}
        else{array1 = this.objectArray}
        let shapeLines = []
        for (let line of array1) {
            let newLine = line.join('') + "\n"
            shapeLines.push(newLine)
        }
        return shapeLines.join('')
    }
}