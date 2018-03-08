"use strict";

const findMatchFactory = require('./findMatchFactory');
const { Transform } = require('stream');


function findMatchStream(arr) {

    const findMatch = findMatchFactory(arr);

    const accumulator = new Transform({

        readableObjectMode: true,

        // count: 0,
        transform(chunk, encoding, callback) {
            console.log(chunk, chunk.toString(), chunk.toString().trim())
            // findMatch(chunk, currArr => {
            //     this.push(++this.count);
            // });
            console.log(this.push)
            this.push(this.count.toString());
            callback();
        }
    });
    accumulator.count = 0;

    return accumulator;
}

module.exports = findMatchStream;