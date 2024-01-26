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

}