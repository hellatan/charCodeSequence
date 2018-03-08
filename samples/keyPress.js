"use strict";


const { listenKeypress } =  require('../index');
const matchArray = [49, 50, 49, 50, 51]; // 1, 2, 1, 2, 3


const findMatch = listenKeypress([49, 50, 49, 50, 51], (currArr) => {
    document.querySelector('body').innerText = `You typed the following : ${currArr.map(String.fromCharCode)}`;
});

findMatch.onChange(({ currArr }) => {
    console.log('one step closer : ', currArr);
});
