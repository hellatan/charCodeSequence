"use strict";

// Key array defaults to the konami code :
const defaultSeries = [38,38,40,40,37,39,37,39,66,65];
const findMatchFactory = require('./src/findMatchFactory');

module.exports = (charArr, callback) => {
    const findMatch = findMatchFactory(charArr || defaultSeries, callback);
    document.addEventListener('keydown', (e) => {
        findMatch(e.which);
    });
};