export class Tetromino{
   static T_SHAPE = new Tetromino(".T.\nTTT\n...")
   static I_SHAPE = new Tetromino(".....\n.....\nIIII.\n.....\n.....")
   static O_SHAPE = new Tetromino(".OO\n.OO\n...")
    I_Shapes = [    "....\nIIII\n....\n....", 
                    "..I.\n..I.\n..I.\n..I."]
    T_Shapes = [    "...\nTTT\n.T.",
                    ".T.\nTT.\n.T.",
                    "...\n.T.\nTTT",
                    ".T.\n.TT\n.T."]
    L_Shapes = [    "...\nLLL\nL..",
                    "LL.\n.L.\n.L.",
                    "...\n..L\nLLL",
                    ".L.\n.L.\n.LL"]
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

   rotateRight(){
        if(this.shapeChar === "O"){ return this}
        if(this.shapeChar === "I"){ return new Tetromino(this.rotateISHAPE()) }
        return new Tetromino(this.toString(this.returnRotatedShape("right")))
    }

    rotateLeft(){
        if(this.shapeChar === "O"){ return this}
        if(this.shapeChar === "I"){ return new Tetromino(this.rotateISHAPE()) }
        return new Tetromino(this.toString(this.returnRotatedShape("left")))       
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