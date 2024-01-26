import {RotatingShape} from "./RotatingShape.mjs"

export class Tetromino{
   static T_SHAPE = new RotatingShape(".T.\nTTT\n...")
   static I_SHAPE = new RotatingShape(".....\n.....\nIIII.\n.....\n.....")

   objectArray;

   constructor(shape){
       this.objectArray = []
       let shapeAsArray = shape.replace(/\t| |\n$/g, '').split("\n")
       for (let line = 0; line < shapeAsArray.length; line++) {
           let row = []
           for (let char = 0; char < shapeAsArray[line].length; char++) {
               row.push(shapeAsArray[line][char])
           }
           this.objectArray.push(row)
       }
   }

   rotateRight(){
        return new RotatingShape(this.toString(this.returnRotatedShape("right")))
    }

    rotateLeft(){
        return new RotatingShape(this.toString(this.returnRotatedShape("left")))       
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
}