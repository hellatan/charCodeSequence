'use strict';

// Key array defaults to the konami code :
const konamiSeries = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
const findMatchFactory = require('./src/findMatchFactory');

function charCodeSequence(charArr = [], callback) {
    const findMatch = findMatchFactory(charArr, callback);
    let currLength;
    findMatch.changeCallbacks = [];

    document.addEventListener('keypress', e => { // keypress required to get the correct charCode
        findMatch(e.which);
        if (currLength !== findMatch.currArr.length) {
            findMatch.changeCallbacks.forEach(callback => {
                callback({ event: e, currArr: findMatch.currArr });
            });
        }
        currLength = findMatch.currArr.length;
    });

    findMatch.onChange = function onChange (callback) {
        if (typeof callback === 'function') {
            findMatch.changeCallbacks.push(callback);
        }
    }

    return findMatch;
}

module.exports = (arr, callback) => charCodeSequence(arr, callback);
module.exports.konami = (callback) => charCodeSequence(konamiSeries, callback);
