import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs"

describe("Testing randomness", () => {
    let arr1 = [1,2,3,4,5,6,7,8,9,10]

    test("Shufflebag returns random order", () => {
        let bag = new ShuffleBag(arr1)
        let arr2 = []
        for (let i = 0; i < arr1.length; i++) {
            arr2.push(bag.next())
        }
        expect(arr1).to.not.include(arr2)
    })
    
})