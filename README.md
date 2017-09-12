# charCodeSequence

A handy lightweight library that detects that a sequence of characters was pressed in succession.
Once the key sequence is detected a callback in invoked.

# keyCodes, not charCodes

This library doesn't support listening for characters like letters, etc. 
Instead you must supply an array of key codes, that's the code associated with a key event such as 'keypress' or 'keydown'
*Note - a 'keyCode' is not the same as it's corresponding 'charCode.'
eg. pressing the letter 'a' yeilds a different keyCode than 

```
'a'.charCodeAt(0); // 97 
```

Here are a couple resources for discovering which key codes are which : 
http://unixpapa.com/js/key.html
http://keycode.info/
 
# More elegant solution : 

The usual approach to detecting a sequence is to match each letter in the sequence, and if a mismatch is found, the start over.

However, consider the following cases : 

code array = [1, 1, 2, 2]
user input = [1, 1, 1, 2, 2]

code array = [3, 4, 3, 4, 5]
user input = [3, 4, 3, 4, 3, 4, 5]

The previous approach fails for these sequences because after we get to the first mis-matched character everything before is discarded, however the user did type the sequence. 

# Interesting properties 

Coincidentally, if you view this method of matching the end of the input as a stream, it yields a highly efficient solution for a substring match algorithm.  

# Use at your own risk

This is a beta - I haven't written any tests. 