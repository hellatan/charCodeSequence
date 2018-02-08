# charCodeSequence

A handy lightweight library that detects that a sequence of characters was pressed in succession.
Once the key sequence is detected a callback in invoked.

# Usage 

```javascript
const charCodeSequence = require('char-code-sequence');
charCodeSequence([65, 66, 67], myCallback); // ['a', 'b', 'c']

// to listen for the popular konami code : 
charCodeSequence.konami(myCallback); // [up, up, down, down, left, right, left, right, 'b', 'a']
```


# charCodes vs. keyCodes

This library doesn't support listening for characters like letters, etc. 
Instead you must supply an array of charCodes, that's the code associated with the document event 'keypress'
Note, this is distinct from the information you get from the 'keydown' event.
Try the following in your browser's console : 

```javascript
    document.addEventListener('keydown', e => console.log('keydown', e.which)); // logs the keyCode
    document.addEventListener('keypress', e => console.log('keydown', e.which)); // logs the charCode
```

The key code corresponds to a key on the keyboard that was pressed, while the charCode corresponds to a unicode character that was typed. 
Source: http://www.dotnetfunda.com/forums/show/20870/diffrence-between-keycode-charcode-in-javascript-or-keycode-vs-charcod

So pressing the letter 'a' yeilds a different keyCode than and charCode

```javascript
'a'.charCodeAt(0); // 97 
document.addEventListener('keydown', e => console.log(e.which)); // user types 'a', outputs 65
```

Here are a couple resources for discovering which char codes are which : 
https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
http://unixpapa.com/js/key.html
http://keycode.info/

In general, if you are looking for letters, use the following : 

- 65 - 91 = upper case letters
- 97 - 123 = lower case letters
- to get a corresponding lower case letter from an upper case letter, add 32
- intergers (0 - 9) are in the range from 48 - 57


# Usage

``` javascript 
const charCodeSequence = require('char-code-sequence');
const findMatch = charCodeSequence([[114, 111, 110], () => console.log('boo yah, typed the whole thing.'))); // my name 'ron'
findMatch.onChange(({ currArr }) => console.log(currArr.map(code => String.fromCharCode(code)))); // ['r', 'o', 'n']
```


# Elegant solution 

A naive approach to detecting a sequence is to match each letter in the sequence, and if a mismatch is found, the start over.

However, consider the following cases : 

```
code array = [1, 1, 2, 2]
user input = [1, 1, 1, 2, 2]

code array = [3, 4, 3, 4, 5]
user input = [3, 4, 3, 4, 3, 4, 5]

search string = 'one on one'
user types = 'one one on one'
```

The previous approach fails for these sequences because after we get to the first mis-matched character everything before is discarded, however the user did type the sequence. 

The algorithm in this package efficiently disposes of typed characters that don't match your character code array.

# Interesting properties 

Coincidentally, if you view this method of matching the end of the input as a stream, it yields a highly efficient solution for a substring match algorithm.  

# Everything is unit tested and beautiful

... If you find a sequence that's not working for some reason, please let me know - but check that you correctly selected your key codes first. 