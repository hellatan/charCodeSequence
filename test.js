

// const findMatchStream = require('./src/findMatchStream.js')
const findMatchFactory = require('./src/findMatchFactory');
const { Readable, Writable, Transform } = require('stream');



const findMatch = findMatchFactory('ron'.split(''), currArr => {
    ++accumulator.count;
    accumulator.push(`\n I found ${accumulator.count} instances of 'ron'`);
});

const accumulator = new Transform({

    readableObjectMode: true,

    transform(chunk, encoding, callback) {
        findMatch(chunk.toString());
        callback();
    }
});
accumulator.count = 0;

const arr = 'ron ald is raw ro ro ro ron hey moron.'.split('');
let idx = -1; 
const readString = new Readable({
    read(currCount) {
        this.push(arr[++idx] ? arr[idx] : null);
    }
});

readString
    .pipe(accumulator)
    .pipe(process.stdout);
