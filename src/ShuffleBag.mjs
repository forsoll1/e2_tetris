export class ShuffleBag{

    itemList;
    currentPos;
    currentItem;
    size;

    constructor(itemArray){
        this.itemList = itemArray
        this.currentPos = itemArray.length -1
        this.size = itemArray.length
    }
}