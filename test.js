

// const findMatchStream = require('./src/findMatchStream.js')
const findMatchFactory = require('./src/findMatchFactory');
const { Readable, Writable, Transform } = require('stream');


class Accumulator extends Transform {

    constructor(substring) {
        super(substring);
        this.findMatch = findMatchFactory(substring.split(''), currArr => {
            ++this.count;
            this.push(`\n I found ${this.count} instances of 'ron'`);
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
        this.push(arr.length ? arr.shift() : null); // pushing null closes stream
    }
});

readString
    .pipe(new Accumulator('ron'))
    .pipe(process.stdout);
