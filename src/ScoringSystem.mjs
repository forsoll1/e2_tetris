export class ScoringSystem{
    constructor(){
        this.score = 0
    }
    receiveScore(msg){
        this.score += (msg.level + 1) * 40
    }
}