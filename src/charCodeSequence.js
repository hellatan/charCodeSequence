"use strict";


const findMatchFactory = require('./findMatchFactory');


function charCodeSequence(charArr = [], callback) {
    const findMatch = findMatchFactory(charArr, callback);
    let currLength = findMatch.currArr.length;
    findMatch.changeCallbacks = [];

    if (typeof document !== 'undefined') {
        document.addEventListener('keypress', e => { // keypress required to get the correct charCode
            findMatch(e.which);
            if (currLength !== findMatch.currArr.length) {
                findMatch.changeCallbacks.forEach(callback => {
                    callback({ event: e, currArr: findMatch.currArr });
                });
            }
            currLength = findMatch.currArr.length;
        });
    }

    findMatch.onChange = function onChange (callback) {
        if (typeof callback === 'function') {
            findMatch.changeCallbacks.push(callback);
        }
    }

    return findMatch;
};

module.exports = charCodeSequence;