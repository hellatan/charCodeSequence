const findMatchFactory = require('../src/findMatchFactory');
const { expect } = require('chai');

describe("findMatchFactory", () => {

    let findMatch;
    let called = 0;
    const charArr = [1, 2, 3];
    const callback = () => {
        ++called;
    };

    beforeEach(() => {
        called = 0;
        findMatch = findMatchFactory(charArr, callback);
    });

    it('should return a function', () => {
        expect(typeof findMatchFactory()).to.equal('function');
    });

    it('should invoke a callback if the set satisfied', () => {
        [1, 2, 3].forEach(findMatch);
        expect(called).to.equal(1);
    });

    it('should not invoke a callback if the set was not satisfied', () => {
        [1, 2, 4].forEach(findMatch);
        expect(called).to.equal(0);
    });

    it('should invoke a callback if the a complicated set containing the set is executed', () => {
        [1, 2, 1, 2, 3].forEach(findMatch);
        expect(called).to.equal(1);
    });

    it('should invoke a callback twice if the set was executed twice', () => {
        [1, 2, 3, 1, 2, 3].forEach(findMatch);
        expect(called).to.equal(2);
    });

    it('should invoke a callback twice if the set was executed twice but spaced out', () => {
        [1, 2, 3, 4, 5, 1, 2, 3].forEach(findMatch);
        expect(called).to.equal(2);
    });

    it('should invoke a callback once if the set was executed twice but spaced out', () => {
        [1, 2, 1, 2, 1, 2, 3, 1].forEach(findMatch);
        expect(called).to.equal(1);
    });

});