import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { NewTetromino } from "../src/NewTetromino.mjs";

function fallToBottom(board) {
    for (let i = 0; i < 10; i++) {
        board.tick();
    }
}

describe("Basic scoring tests", () => {
    let scoreBoard;

    beforeEach(() => {
        scoreBoard = new ScoringSystem()
    })

    test("Correct score for one cleared line", () => {
        let msg = {level: 0, lines: 1}
        scoreBoard.receiveScore(msg)
        expect(scoreBoard.score).to.equal(40)
    })
})

