export class ScoringSystem{

    score;
    level;
    scoresForLines = {1:40, 2:100, 3:300, 4:1200}

    constructor(){
        this.level = 0
        this.score = 0
    }
    receiver(msg){
        this.score += (this.level + 1) * this.scoresForLines[msg]
    }
}