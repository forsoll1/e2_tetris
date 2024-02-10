import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { NewTetromino } from "../src/NewTetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Basic observer pattern tests", () => {
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
    test("Receive data from observable", () => {
        let msg = "message"
        let receivedMsg;
        const subscriber = {
          receiver: function (msg) {receivedMsg = msg} 
        }
        board.subscribe(subscriber)
        board.notify(msg)
        expect(receivedMsg).to.equal("message")
      })

})

describe("Board sends out line clear data", () => {
    let board;
    let receivedMsg;
    const subscriber = {
      receiver: function (msg) {receivedMsg = msg} 
    }
    beforeEach(() => {
        board = new Board(4, 10);
        board.subscribe(subscriber)
    });
  
    test("One line clear", () => {
        board.drop(NewTetromino.I_SHAPE)
        fallToBottom(board)
        expect(receivedMsg).to.include({level:0,lines:1})
    })

    test("Multiple lines clear", () => {
        board.drop(NewTetromino.O_SHAPE)
        board.moveLeft()
        fallToBottom(board)
        board.drop(NewTetromino.O_SHAPE)
        board.moveRight()
        fallToBottom(board)
        expect(receivedMsg).to.include({level:0,lines:2})
    })
})