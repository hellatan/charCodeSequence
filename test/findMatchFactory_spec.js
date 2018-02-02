"use strict";

const findMatchFactory = require('../src/findMatchFactory');
const { expect } = require('chai');


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

});