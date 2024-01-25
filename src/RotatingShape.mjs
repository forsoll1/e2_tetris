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

    rotateRight(){
        let len = this.objectArray.length
        let newArray = JSON.parse(JSON.stringify(this.objectArray))
        for (let line = 0; line < len; line++) {
            for (let char = 0; char < len; char++) {
                this.objectArray[line][char] = newArray[len-1-char][line]
            }
        }
        return this
    }

    toString(){
        let shapeLines = [] 
        for (let line of this.objectArray) {
          let newLine = line.join('') + "\n"
          shapeLines.push(newLine)
        }
        return shapeLines.join('')
    }
}