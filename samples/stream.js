"use strict";


const findMatchFactory = require('../src/findMatchFactory');
const { Readable, Writable, Transform } = require('stream');

/**
 * This is a somewhat contrived example to demonstrate how the findMatchFactory 
 * can be used in a Node.js process with streams to detect that a particular
 * sequence passes through the stream. 
 */
class Accumulator extends Transform {

    constructor(subArray) {
        super(subArray);
        this.findMatch = findMatchFactory(subArray, currArr => {
            ++this.count;
            this.push(`\n I found ${this.count} instances of '${subArray}'`);
        });
        this.count = 0;
    }

    _transform(chunk, encoding, callback) {
        this.findMatch(chunk.toString());
        callback();
    }
};

const arr = '1 2 3 der 4 5 6 1 2 ro 3 4 ro ro der 56 derder.'.split('');
const readString = new Readable({
    read(currCount) {
        const curr = arr.shift();
        // console.log('search for substring : ', curr) // for testing. 
        this.push(arr.length ? curr : null); // pushing null closes stream
    }
});

readString
    .pipe(new Accumulator(['d', 'e', 'r']))
    .pipe(process.stdout);
