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
        let msg = 1
        scoreBoard.receiver(msg)
        expect(scoreBoard.score).to.equal(40)
    })

    test("Correct score for two cleared lines, at second level (1)", () => {
        let msg = 2
        scoreBoard.level = 1
        scoreBoard.receiver(msg)
        expect(scoreBoard.score).to.equal(200)
    })

    test("Correct score for four cleared lines, at 10th level (9)", () => {
        let msg = 4
        scoreBoard.level = 9
        scoreBoard.receiver(msg)
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
        board.subscribe(scoreBoard)
    })

    test("Correct score for one cleared line", () => {
        msg = 1
        board.notify(msg)
        expect(scoreBoard.score).to.equal(40)
    })

    test("Correct score for three cleared line", () => {
        msg = 3
        board.notify(msg)
        expect(scoreBoard.score).to.equal(300)
    })

    test("Correct score for two cleared lines, using actual board mechanics", () => {
        board.drop(NewTetromino.O_SHAPE);
        board.moveLeft()
        fallToBottom(board)
        board.drop(NewTetromino.O_SHAPE);
        board.moveRight()
        fallToBottom(board)
        expect(scoreBoard.score).to.equal(100)
    })

})

