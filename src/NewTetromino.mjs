export class NewTetromino{

    static T_SHAPE = new NewTetromino("...\nTTT\n.T.\n")
    static I_SHAPE = new NewTetromino("....\nIIII\n....\n....\n")
    static L_SHAPE = new NewTetromino("...\nLLL\nL..\n")
    static J_SHAPE = new NewTetromino("...\nJJJ\n..J\n")
    static S_SHAPE = new NewTetromino("...\n.SS\nSS.\n")
    static Z_SHAPE = new NewTetromino("...\nZZ.\n.ZZ\n")
    static O_SHAPE = new NewTetromino(".OO\n.OO\n...\n")

    tetroShapes = {
        "I": ["....\nIIII\n....\n....\n", "..I.\n..I.\n..I.\n..I.\n"],
        "T": ["...\nTTT\n.T.\n", ".T.\nTT.\n.T.\n", "...\n.T.\nTTT\n", ".T.\n.TT\n.T.\n"],
        "L": ["...\nLLL\nL..\n", "LL.\n.L.\n.L.\n", "...\n..L\nLLL\n", ".L.\n.L.\n.LL\n"],
        "J": ["...\nJJJ\n..J\n", ".J.\n.J.\nJJ.\n", "...\nJ..\nJJJ\n", ".JJ\n.J.\n.J.\n"],
        "S": ["...\n.SS\nSS.\n", "S..\nSS.\n.S.\n",],
        "Z": ["...\nZZ.\n.ZZ\n", "..Z\n.ZZ\n.Z.\n"],
        "O": [".OO\n.OO\n...\n"],
    }

    objectArray;
    shapeChar;

    constructor(shape){
        this.objectArray = []
        let stringTrim = shape.replace(/\t| |\n$/g, '')
        let shapeAsArray = stringTrim.split("\n")
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
        let shapes = this.tetroShapes[`${this.shapeChar}`]
        let pointer = 0
        for (let i = 0; i < shapes.length; i++) {
            if (this.toString() === shapes[i]){pointer = i}
        }
        if (pointer + direction < 0){pointer = shapes.length - 1}
        else if (pointer + direction === shapes.length){pointer = 0}
        else {pointer += direction}
        return new NewTetromino(shapes[pointer])
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