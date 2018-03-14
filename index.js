'use strict';

// Key array defaults to the konami code :
var konamiSeries = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
var findMatchFactory = require('./dist/findMatchFactory');
var charCodeSequence = require('./dist/charCodeSequence');


module.exports.listenKeypress = function(arr, callback) { charCodeSequence(arr, callback); };
module.exports.konami = function(callback) { charCodeSequence(konamiSeries, callback); };
module.exports.findMatchFactory = findMatchFactory;
