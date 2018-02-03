'use strict';

// Key array defaults to the konami code :
const konamiSeries = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
const findMatchFactory = require('./src/findMatchFactory');

function charCodeSequence(charArr = [], callback) {
    const findMatch = findMatchFactory(charArr, callback);
    document.addEventListener('keydown', e => {
        findMatch(e.which);
    });
}

module.exports = (arr, callback) => charCodeSequence(arr, callback);
module.exports.konami = (callback) => charCodeSequence(konamiSeries, callback);
