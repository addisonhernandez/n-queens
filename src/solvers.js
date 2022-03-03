/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/*

Specification -
  Inputs: n (the size of the matrix)
  Outputs: n by n matrix with 1 for rooks
  Constraints:
  Edge cases:
Justification -
Explanation -
Visualization - Excalidraw
Approximation -
Verification -
Implementation -

*/



window.findNRooksSolution = function (n) {
  //var solution = undefined; //fixme

  // Iterate over each space
  // If the space is occupied -> continue
  // If the space is free -> place a rook
  // Check if there is a conflict with our helper function (row, col)
  // If there is none -> continue
  // Otherwise, remove the rook and then continue

  const solution = new Board({ n });
  let numberOfRooks = 0;

  for (const row of _.range(n)) {
    for (const col of _.range(n)) {
      if (!solution.get(row)[col]) {
        solution.togglePiece(row, col);
        numberOfRooks++;

        if (solution.hasRowConflictAt(row) || solution.hasColConflictAt(col)) {
          solution.togglePiece(row, col);
          numberOfRooks--;
        } else {
          if (numberOfRooks === n) {
            return solution.rows();
          }
        }
      }
    }
  }

  return null;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0;

  // Create a stack (array) to track the (row, col) of the last placed rook

  // consider one row at a time. Only consider a row if the prev row is occupied by a rook

  // try to place a rook in the first col
  //  if there is a conflict (ONLY check for col conflict) -> remove the rook
  // keep trying to place rook in the next col until no conflict

  // if there is no next column -> pop (row, col) off the stack and continue from there

  // push (row, col) to the stack

  // consider the next row

  // if number of rooks is 'n' -> increment solution count -> pop (row, col) off the stack and continue from there

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  const solution = new Board({ n });
  let numberOfQueens = 0;

  for (const row of _.range(n)) {
    for (const col of _.range(n)) {
      if (!solution.get(row)[col]) {
        solution.togglePiece(row, col);
        numberOfQueens++;

        if (
          solution.hasRowConflictAt(row) ||
          solution.hasColConflictAt(col) ||
          solution.hasMajorDiagonalConflictAt(col - row) ||
          solution.hasMinorDiagonalConflictAt(col + row)
        ) {
          solution.togglePiece(row, col);
          numberOfQueens--;
        } else {
          if (numberOfQueens === n) {
            return solution.rows();
          }
        }
      }
    }
  }

  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
