export class NewTetromino{
    static T_SHAPE = new NewTetromino("...\nTTT\n.T.")
    static I_SHAPE = new NewTetromino("....\nIIII\n....\n....")
    static O_SHAPE = new NewTetromino(".OO\n.OO\n...")
 
     tetroShapes = {
     "I": ["....\nIIII\n....\n....", "..I.\n..I.\n..I.\n..I."],
 
     "T": ["...\nTTT\n.T.", ".T.\nTT.\n.T.", "...\n.T.\nTTT", ".T.\n.TT\n.T."],
 
     "L": ["...\nLLL\nL..", "LL.\n.L.\n.L.", "...\n..L\nLLL", ".L.\n.L.\n.LL"],
 
     "J": ["...\nJJJ\n..J", ".J.\n.J.\nJJ.", "...\nJ..\nJJJ", ".JJ\n.J.\n.J."],
 
     "S": ["...\n.SS\nSS.", "S..\nSS.\n.S.",],
 
     "Z": ["...\nZZ.\n.ZZ", "..Z\n.ZZ\n.Z."]}
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
        this.handleRotate(1)
    }
 
    rotateLeft(){
        this.handleRotate(-1)    
    }   
     
     returnRotatedShape(direction){
         let len = this.objectArray.length
         let newArray = JSON.parse(JSON.stringify(this.objectArray))
         for (let line = 0; line < len; line++) {
             for (let char = 0; char < len; char++) {
                 if(direction === "left"){newArray[line][char] = this.objectArray[char][len-1-line]}
                 if(direction === "right"){newArray[line][char] = this.objectArray[len-1-char][line]}
             }
         }
         return newArray
     }
 
     rotateISHAPE(){
         let Ia = ".....\n.....\nIIII.\n.....\n.....\n"
         let Ib = "..I..\n..I..\n..I..\n..I..\n.....\n"
         if (this.toString() === Ia){ return Ib}
         return Ia
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