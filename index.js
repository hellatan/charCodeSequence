'use strict';

// Key array defaults to the konami code :
const konamiSeries = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
const findMatchFactory = require('./dist/findMatchFactory');
const charCodeSequence = require('./dist/charCodeSequence');


module.exports.listenKeypress = (arr, callback) => charCodeSequence(arr, callback);
module.exports.konami = (callback) => charCodeSequence(konamiSeries, callback);
module.exports.findMatchFactory = findMatchFactory;
