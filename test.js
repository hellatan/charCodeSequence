

// const findMatchStream = require('./src/findMatchStream.js')
const findMatchFactory = require('./src/findMatchFactory');
const { Readable, Transform } = require('stream');



const findMatch = findMatchFactory(['r', 'o', 'n'], currArr => {
    console.log('PLAY IT FORWARD!', accumulator.push(accumulator.count.toString()))
    // this.push(++this.count);
});

const accumulator = new Transform({

    readableObjectMode: true,

    // count: 0,
    transform(chunk, encoding, callback) {
        const char = chunk.toString().trim();
        console.log('this.count', char, this.count, findMatch.currArr)
        findMatch(char);
        console.log('this.count', char, this.count, findMatch.currArr)
        // this.push(this.count.toString());
        callback();
    }
});
accumulator.count = 0;


const logStream = new Readable({
    read(currCount) {
        console.log('logStream currCount', currCount)
        this.push(currCount)
    }
})

process.stdin
    .pipe(accumulator)
    // .pipe(logStream)
    .pipe(process.stdout);
