import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { NewTetromino } from "../src/NewTetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("tetromino can move left", () => {
    board.drop(NewTetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..TTT.....
       ...T......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("tetromino can't move left past the border", () => {
    board.drop(NewTetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `TTT.......
       .T........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("tetromino can't move left through other blocks", () => {
    board.drop(NewTetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();    
    fallToBottom(board);
    board.drop(NewTetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       TTTTTT....
       .T..T.....`
    );
  });

  test("tetromino can move right", () => {
    board.drop(NewTetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `....TTT...
       .....T....
       ..........
       ..........
       ..........
       ..........`
    );

  });
  test("tetromino can't move right past the border", () => {
    board.drop(NewTetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `.......TTT
       ........T.
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("tetromino can't move right through other blocks", () => {
    board.drop(NewTetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
    board.drop(NewTetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();    
    board.moveRight();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ..........
      ....TTTTTT
      .....T..T.`
    );
  });

  test("tetromino can't move down through other blocks", () => {
    board.drop(NewTetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(NewTetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });
});

