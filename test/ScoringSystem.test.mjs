import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { NewTetromino } from "../src/NewTetromino.mjs";
import { ScoringSystem } from "../src/ScoringSystem.mjs"

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

    test("Correct score for two cleared lines, at second level (1)", () => {
        let msg = {level: 1, lines: 2}
        scoreBoard.receiveScore(msg)
        expect(scoreBoard.score).to.equal(200)
    })

    test("Correct score for four cleared lines, at 10th level (9)", () => {
        let msg = {level: 9, lines: 4}
        scoreBoard.receiveScore(msg)
        expect(scoreBoard.score).to.equal(12000)
    })
})

describe("Scoring from Board", () => {
    let board
    let scoreBoard;
    let msg;

    beforeEach(() => {
        board = new Board(4,10)
        scoreBoard = new ScoringSystem()
        board.subscribe(scoreBoard.receiveScore())
    })

    test("Correct score for one cleared line", () => {
        msg = {level: 0, lines: 1}
        board.notify(msg)
        expect(scoreBoard.score).to.equal(40)
    })
})

