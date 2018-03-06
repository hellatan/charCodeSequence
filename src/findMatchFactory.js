"use strict";

/**
 * This private function gets called when the last character just added to the array doesn't match the corresponding
 * character in the array you are matching against.
 * In this case (you have a mismatch), part of what was typed might still match the beginning of the character
 * array. for example consider :
 * charArr = [a, b, a, b, c];
 * currArr = [a, b, a, b, a];
 * in this case you can still keep [a, b, a] from the end of currArr, but you have to throw out [a, b] from the front
 *
 * Uses  recursion, take the case of :
 * charArr  = [one me on]
 * typedArr = [oni me one]
 *
 * I would work backwards matching the e from "one" to the e from "me" - but that doesn't fit, i need to fall back again
 * until i hit the first e, from "one."
 * @param charArr
 * @param currArr
 * @param currI
 * @returns {*}
 */
 const findMatchingSegment = (charArr, currArr) => {
    currArr.shift();
    const lastChar = currArr[currArr.length - 1];

    while(currArr.length > 0) {
        if (charArr[currArr.length - 1] === lastChar) {
            // this might be a match! 
            let match = true;
            let currIdx = 0;
            while (match && currIdx < currArr.length) {
                match = charArr[currIdx] === currArr[currIdx];
                ++currIdx;
            }
            if (match) {
                return currArr;
            }
        }
        currArr.shift();
    }

    return currArr;
}

module.exports = (sequence = [], callback) => {
    let currArr = [];
    const charArr = [...sequence];

    function findMatch(charCode) {
        currArr.push(charCode);

        if (charCode !== charArr[currArr.length - 1]) {
            currArr = findMatchingSegment(charArr, currArr);
        }

        if (currArr.length === charArr.length) {
            if (callback && (typeof callback === 'function')) {
                callback(currArr);
            }
            currArr.length = 0;
        }
    };

    findMatch.currArr = currArr;
    return findMatch;
};