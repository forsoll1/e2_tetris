export class ShuffleBag{

    itemList;
    currentPos;
    currentItem;
    size;

    constructor(itemArray){
        this.itemList = []
        for (let i = 0; i < itemArray.length; i++) {
            this.itemList.push(itemArray[i])
        }
        this.currentPos = itemArray.length -1
        this.size = itemArray.length
    }

    next(){
        if(this.currentPos < 1){
            this.currentPos = this.size -1
            this.currentItem = this.itemList[0]
            return this.currentItem
        }
        let pos = Math.floor(Math.random() * this.currentPos)
        this.currentItem = this.itemList[pos]
        this.itemList[pos] = this.itemList[this.currentPos]
        this.currentPos -= 1
        return this.currentItem
    }
}