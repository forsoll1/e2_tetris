import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { NewTetromino } from "../src/NewTetromino.mjs";

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

  test("Tetromino can't rotate when against the ceiling", () => {
    board.drop(NewTetromino.T_SHAPE);
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("Tetromino can rotate left", () => {
    board.drop(NewTetromino.T_SHAPE);
    board.tick()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });
  test("Tetromino can rotate right", () => {
    board.drop(NewTetromino.T_SHAPE);
    board.tick()
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });
    test("Tetromino can't rotate through blocks'", () => {
    board.drop(NewTetromino.T_SHAPE);
    board.tick()
    board.rotateRight()
    board.moveLeft()
    board.moveLeft()
    fallToBottom(board)
    board.drop(NewTetromino.T_SHAPE)
    board.tick()
    board.rotateLeft()
    board.moveRight()
    fallToBottom(board)
    board.drop(NewTetromino.T_SHAPE)
    board.tick()
    board.tick()
    board.rotateRight()
    board.tick()
    board.tick()
    board.rotateRight()


    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..T.TT....
       .TTTTTT...
       ..T.TT....`
    );
  });

  test("Kick right when rotating next to left wall", () => {
    board.drop(NewTetromino.T_SHAPE);
    board.tick()
    board.rotateLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       .T........
       TTT.......
       ..........
       ..........
       ..........`
    );
  });

  test("Kick left when rotating next to left wall", () => {
    board.drop(NewTetromino.T_SHAPE);
    board.tick()
    board.rotateRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       ........T.
       .......TTT
       ..........
       ..........
       ..........`
    );
  });

  test("I shape doesn't kick", () => {

    board.drop(NewTetromino.I_SHAPE);
    board.tick()
    board.rotateLeft()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `.........I
       .........I
       .........I
       .........I
       ..........
       ..........`
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

