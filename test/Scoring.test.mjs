import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { NewTetromino } from "../src/NewTetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Tally score with observer pattern", () => {
    let board;
    beforeEach(() => {
      board = new Board(4, 10);
    });
  
    test("Board can be subscribed to", () => {
      const dummy = "tester"
      board.subscribe(dummy)
      expect(board.subscribers.length).to.equal(1)
    })

    test("Subscriber can unsubscribe", () => {
        const dummy = "tester"
        board.subscribe(dummy)
        board.unsubscribe(dummy)
        expect(board.subscribers.length).to.equal(0)
    })
  })