import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { NewTetromino } from "../src/NewTetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    console.log('TICK', i)
    board.tick();
  }
}

describe("Clearing full lines", () => {
  let board;
  beforeEach(() => {
    board = new Board(4, 10);
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
      ....
      ....
      ....
      ....
      ....`
    );
  });

  test("One line clear drops the blocks above the clear one step down", () => {

    board.drop(NewTetromino.T_SHAPE);
    board.moveLeft()
    fallToBottom(board)
    board.drop(NewTetromino.I_SHAPE);
    board.tick()
    board.rotateRight()
    board.moveRight()
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `....
       ....
       ....
       ....
       ....
       ....
       ....
       ...I
       ...I
       .T.I`
    );
  });

  test("Two line clears drop the blocks one step down for each clear below them", () => {

    board.drop(NewTetromino.T_SHAPE);
    board.moveLeft()
    fallToBottom(board)
    board.drop(NewTetromino.T_SHAPE);
    board.moveLeft()
    fallToBottom(board)
    board.drop(NewTetromino.I_SHAPE);
    board.tick()
    board.rotateRight()
    board.moveRight()
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `....
       ....
       ....
       ....
       ....
       ....
       ....
       ....
       .T.I
       .T.I`
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

