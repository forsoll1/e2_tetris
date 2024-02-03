import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling rotating tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("Tetromino can rotate left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });
  test("Tetromino can rotate right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });
    test("Tetromino can't rotate through blocks'", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()
    board.moveRight()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE)
    board.rotateLeft()
    board.moveLeft()
    board.moveLeft()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE)
    board.rotateLeft()
    board.tick()
    board.tick()
    board.tick()
    board.rotateLeft()


    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..T.TT....
       .TTTTTT...
       ..T.TT....`
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

