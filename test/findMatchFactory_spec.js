"use strict";

const findMatchFactory = require('../src/findMatchFactory');
const { expect } = require('chai');


// a more specific test if you want to test a specific case designed to trip up the algorithm
const testSpecificStrings = (sequence, typedString, calledExpectation = 1) => {
    it(`should invoke callback once for "${sequence}" and "${typedString}"`, () => {
        let called = 0;
        const findMatch = findMatchFactory(sequence.split(''), () => called++);
        const typedArr = typedString.split('');
        typedArr.forEach(findMatch);
        expect(called).to.equal(calledExpectation);
    });
}

// a battery of tests that are designed to trip up different versions of characters, including 
// inserting different characters in between, at the end, etc.
const testSequence = sequence => {

    let called = 0;
    let charArr = [...sequence];
    const callback = () => {
        ++called;
    };
    const findMatch = findMatchFactory(charArr, callback);;

    beforeEach(() => {
        called = 0;
        charArr = charArr = [...sequence];
    });

    it('should return a function', () => {
        expect(typeof findMatchFactory()).to.equal('function');
    });

    it('should invoke a callback if the set satisfied', () => {
        [...charArr].forEach(findMatch);
        expect(called).to.equal(1);
    });

    it('should not invoke a callback if the set was not satisfied', () => {
        charArr.pop();
        [...charArr, 999].forEach(findMatch);
        expect(called).to.equal(0);
    });

    it('should invoke a callback if a complicated set containing the set is executed', () => {
        charArr.pop();        
        [...charArr, ...sequence].forEach(findMatch);
        expect(called).to.equal(1);
    });

    it('should invoke a callback twice if the set was executed twice', () => {
        [...charArr, ...charArr ].forEach(findMatch);
        expect(called).to.equal(2);
    });

    it('should invoke a callback twice if the set was executed twice but spaced out', () => {
        [...charArr, 998, 999, ...charArr].forEach(findMatch);
        expect(called).to.equal(2);
    });

    it('should invoke a callback once if the set was executed twice but spaced out', () => {
        charArr.pop();
        [...charArr, ...charArr, ...charArr, ...sequence, 999].forEach(findMatch);
        expect(called).to.equal(1);
    });
};

describe("findMatchFactory", () => {

    describe("detecting 1, 2, 3", () => {
        testSequence([1, 2, 3]);
    });

    describe("detecting my name", () => {
        testSequence('ronald'.split(''));
    });

    describe("detecting many words with spaces", () => {
        testSequence('i am ronald'.split(''));
    });

    describe("detecting repeating words", () => {
        testSequence('ron ron'.split(''));
    });

    describe("detecting special case 'one on one'", () => {
        const sequence = 'one on one';
        testSequence(sequence.split(''));
        // do a test with specific string designed to torpedo my algorithm
        testSpecificStrings(sequence, 'oni on one on one two');
        testSpecificStrings(sequence, 'one one one on one two');
        // TODO ! because of current logic, this only detects once, but the string is technically present twice 
        testSpecificStrings(sequence, 'one on one on one one');

        // another tricky example :
        testSpecificStrings('one x one onx', 'one x one one x one onx');
    });

    describe("detecting 34345", () => {
        testSpecificStrings('34345', '3434345');
    });

    // describe("detecting a very tricky example", () => {
    //     testSpecificStrings('34345', '3434345');
    // });

    describe("detecting substring in longer string multiple times", () => {
        testSpecificStrings('sam', 'so sam went to the store sasasam was sad.', 2);
    });

});