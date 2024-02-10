export class ScoringSystem{

    score;
    scoresForLines = {1:40, 2:100, 3:300, 4:1200}

    constructor(){
        this.score = 0
    }
    receiver(msg){
        this.score += (msg.level + 1) * this.scoresForLines[msg.lines]
    }
}