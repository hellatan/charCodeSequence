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


# keyCodes, not charCodes

This library doesn't support listening for characters like letters, etc. 
Instead you must supply an array of key codes, that's the code associated with a key event such as 'keypress' or 'keydown'

*Note - a 'keyCode' is not the same as it's corresponding 'charCode.'
eg. pressing the letter 'a' yeilds a different keyCode than and charCode

```javascript
'a'.charCodeAt(0); // 97 
document.addEventListener('keydown', e => console.log(e.which)); // user types 'a', outputs 65
```

Here are a couple resources for discovering which key codes are which : 
http://unixpapa.com/js/key.html
http://keycode.info/
 
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