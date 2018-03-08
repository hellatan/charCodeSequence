"use strict";


const findMatchFactory = require('../src/findMatchFactory');
const string = '1 2 3 der 4 5 6 1 2 ro 3 4 ro ro der 56 derder.';
const substring = 'der';
let count = 0;


const findMatch = findMatchFactory(substring.split(''), currArr => {
    ++count;
});

string
    .split('')
    .forEach(findMatch);

console.log(`found ${count} instances of ${substring}`);