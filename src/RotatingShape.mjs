export class RotatingShape {

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
        let len = this.objectArray.length
        let newArray = JSON.parse(JSON.stringify(this.objectArray))
        for (let line = 0; line < len; line++) {
            for (let char = 0; char < len; char++) {
                newArray[line][char] = this.objectArray[len-1-char][line]
            }
        }
        return new RotatingShape(this.toString(this.returnRotatedShape("right")))
    }
    rotateLeft(){
        let len = this.objectArray.length
        let newArray = JSON.parse(JSON.stringify(this.objectArray))
        for (let line = 0; line < len; line++) {
            for (let char = 0; char < len; char++) {
                newArray[line][char] = this.objectArray[char][len-1-line]
            }
        }
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
        }return newArray
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