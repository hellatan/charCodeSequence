"use strict";


const findMatchFactory = require('./src/findMatchFactory');
const { Readable, Writable, Transform } = require('stream');


class Accumulator extends Transform {

    constructor(substring) {
        super(substring);
        this.findMatch = findMatchFactory(substring.split(''), currArr => {
            ++this.count;
            this.push(`\n I found ${this.count} instances of '${substring}'`);
        });
        this.count = 0;
    }

    _transform(chunk, encoding, callback) {
        this.findMatch(chunk.toString());
        callback();
    }
};

const arr = 'ron ald is raw ro ro ro ron hey moron.'.split('');
const readString = new Readable({
    read(currCount) {
        const curr = arr.shift();
        // console.log('search for substring : ', curr)
        this.push(arr.length ? curr : null); // pushing null closes stream
    }
});

readString
    .pipe(new Accumulator('ron'))
    .pipe(process.stdout);
