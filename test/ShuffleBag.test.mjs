import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs"
import { before } from "lodash";

describe("Testing randomness", () => {
    let arr1 = [1,2,3,4,5,6,7,8,9,10]
    let arr2;
    let arr3
    let bag
    beforeEach(() => {
        bag = new ShuffleBag(arr1)
    })

    test("Shufflebag returns random order", () => {
        arr2 = []
        for (let i = 0; i < arr1.length; i++) {
            arr2.push(bag.next())
        }
        expect(arr1).to.not.include(arr2)
    })

    test("Shufflebag returns all inserted items", () => {
        arr2 = []
        for (let i = 0; i < arr1.length; i++) {
            arr2.push(bag.next())
        }
        expect(arr2).to.have.members(arr1)
    })

    test("Cycling through the bag twice returns two different lists", () => {
        arr2 = []
        for (let i = 0; i < arr1.length; i++) {
            arr2.push(bag.next())
        }
        arr3 = []
        for (let i = 0; i < arr1.length; i++) {
            arr3.push(bag.next())
        }
        expect(arr2).to.not.include(arr3)
    })

    test("Draw a list of 100 items from bag, any 10 item array in sequence starting from n*10 should have all arr1 members (n = 0-9)", () => {
        let arr100 = []
        for (let i = 0; i < 100; i++) {
            arr100.push(bag.next())
        }
        let num = Math.floor(Math.random() * 10) * 10
        let testArr = arr100.slice(num, num + 10)
        expect(testArr).to.have.members(arr1)
    })
    
})