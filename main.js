'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// An object that represents the three stacks of Towers of Hanoi;
// * each key is an array of Numbers:
// * A is the far-left,
// * B is the middle,
// * C is the far-right stack
// * Each number represents the largest to smallest tokens:
// * 4 is the largest,
// * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: [],
};

// Start here. What is this function doing?
// This function is printing the contents of each stack
const printStacks = () => {
  console.log('a: ' + stacks.a);
  console.log('b: ' + stacks.b);
  console.log('c: ' + stacks.c);
};

// Next, what do you think this function should do?
/**
 * This function should honor moving the pieces
 * @param {*} startStack  the name (key) of the stack to move the piece from
 * @param {*} endStack  the name (key) of the stack to move the piece to
 */

const movePiece = (startStack, endStack) => {
  // Your code here
  // Remove the last disc (lowest value) from the startStack
  let piece = stacks[startStack].pop();
  // and add it to the last position (lowest value position) to the endStack
  stacks[endStack].push(piece);
}

  // determine if the endStack has chips in it
  const stackHasPiece = (stack) => {
    // has chips if the length is not equal to 0
    return stacks[stack].length !== 0;
  };

  // check if the move is going to a stack that exists
  const validStackEntry = (startStack, endStack) => {
    // both the startStack and endStack should not be undefined
    return stacks[startStack] !== undefined && stacks[endStack] !== undefined;
  };

  // determine if the chip can be moved
  const validPieceMove = (startStack, endStack) => {
    // get the position of the last chip in the startStack
    let startPiecePosition = stacks[startStack].length - 1;
    // get the value of the last chip in the startStack
    let startPieceValue = stacks[startStack][startPiecePosition];

    // get the position of position of the last chip in the endStack
    let endPiecePosition = stacks[endStack].length - 1;
    // get the value of the last chip in the endStack
    let endPieceValue = stacks[endStack][endPiecePosition];

    // determine the stack you are moving to is either empty or the
    // chip you are moving is the smallest in the stack you are moving to
    if (!stackHasPiece(endStack)) {
      return true;
    } else {
      return startPieceValue < endPieceValue;
    }
  };

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
/**
 * Return true, if the move is legal, this function does not make the move, it just checks if it is legal or not
 * @param {*} startStack  the name (key) of the stack to move the piece from
 * @param {*} endStack  the name (key) of the stack to move the piece to
 */
const isLegal = (startStack, endStack) => {
  // Your code here
  // Determine if the startStack is not empty
  // Determine if the startStack and endStack values are 'a', 'b', or 'c'
  // Determine if it's a valid move
  return (
    validStackEntry(startStack, endStack) && stackHasPiece(startStack) && validPieceMove(startStack, endStack))
}

// What is a win in Towers of Hanoi? When should this function run?
/**
 * This function should return true if the board is in a winning state
 * Winning state means: all the pieces are in 1 stack, so the b or the c stack
 * are equal to [4, 3, 2, 1].
 *
 * Must convert to string first before checking, using the .join() method
 */
const checkForWin = () => {
  // Your code here
  let stackBToString = stacks['b'].join(',');
  let stackCToString = stacks['c'].join(',');

  return stackBToString === '4,3,2,1' || stackCToString === '4,3,2,1';
};

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  // check if the move is valid,
  if (isLegal(startStack, endStack)) {
    // move the chip
    movePiece(startStack, endStack);
    if (checkForWin()) {
      return true;
    }
  } else {
    console.log('This move is not valid, try again');
  }
};

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
};

// Tests

if (typeof describe === 'function') {
  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: [],
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: [],
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
} else {
  getPrompt();
}
