'use strict';

// Key array defaults to the konami code :
const konamiSeries = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
const findMatchFactory = require('./src/findMatchFactory');

function charCodeSequence(charArr = [], callback) {
    const findMatch = findMatchFactory(charArr, callback);
    const changeCallbacks = [];

    document.addEventListener('keypress', e => { // keypress required to get the correct charCode
        findMatch(e.which);
        changeCallbacks.forEach(callback => {
            callback({ event: e, currArr: findMatch.currArr });
        });
    });

    return {
        onChange: function onChange (callback) {
            if (typeof callback === 'function') {
                changeCallbacks.push(callback);
            }
        }
    };
}

module.exports = (arr, callback) => charCodeSequence(arr, callback);
module.exports.konami = (callback) => charCodeSequence(konamiSeries, callback);


// const findMatch = charCodeSequence(keyArr, () => { console.log('it was all pressed') });

// findMatch.onChange(({ event, currArr }) => {
//     console.log(currArr);
// })