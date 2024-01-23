export class RotatingShape {

    objectShape;
    objectArray;

    constructor(shape){
        this.objectArray = []
        let shapeAsArray = shape.replace(/\t| /g, '').split("\n")
        for (let line = 0; line < shapeAsArray.length; line++) {
            let row = []
            for (let char = 0; char < shapeAsArray[line].length; char++) {
                row.push(shapeAsArray[line][char])
            }
            this.objectArray.push(row)
        }
        this.objectShape = shape.replace(/\t| /g, '') + "\n"
    }

    toString(){
        return this.objectShape
    }
}