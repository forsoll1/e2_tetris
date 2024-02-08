import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { NewTetromino } from "../src/NewTetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Clearing full lines", () => {
  let board;
  beforeEach(() => {
    board = new Board(4, 6);
  });

  test("Clear lines", () => {
    board.drop(NewTetromino.O_SHAPE);
    board.moveLeft()
    fallToBottom(board)
    board.drop(NewTetromino.O_SHAPE);
    board.moveRight()
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `....
      ....
      ....
      ....
      ....
      ....`
    );
  });

  test.skip("TEST TEMPLATE", () => {

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });
});

