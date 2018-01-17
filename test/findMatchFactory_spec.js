const findMatchFactory = require('../src/findMatchFactory');
const { expect } = require('chai');

describe("findMatchFactory", () => {

    let findMatch;
    let called = false;
    const charArr = [1, 2, 3];
    const callback = () => {
        called = true;
    };

    beforeEach(() => {
        called = false;
        findMatch = findMatchFactory(charArr, callback);
        console.log('this is a file');
    });

    it('should return a function', () => {
        expect(typeof findMatchFactory()).to.equal('function');
    });

    it('should not invoke a callback if the set satisfied', () => {
        [1, 2, 3].forEach(findMatch);
        expect(called).to.equal(true);
    });

    it('should not invoke a callback if the set was not satisfied', () => {
        [1, 2, 4].forEach(findMatch);
        expect(called).to.equal(false);
    });

});