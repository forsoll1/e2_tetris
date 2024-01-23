export class RotatingShape {

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
    }

    toString(){
        let shapeLines = [] 
        for (const line of this.objectArray) {
          let newLine = line.join('') + "\n"
          shapeLines.push(newLine)
        }
        return shapeLines.join('')
    }
}