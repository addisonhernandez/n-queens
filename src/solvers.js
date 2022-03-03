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

// === Recursive Backtracking Algorithm ===
// Base Case:
// - If row === 'n' -> we've found a solution -> solutionCount++
//
// Try to put a piece in the current row:
// Iterate over the columns and place a piece at each
// - if there's no conflict -> recurse at row + 1
// - if there's a conflict -> backtrack (remove piece)

// KEY INSIGHT: The ~Call Stack~ is our stack data structure!


window.findNRooksSolution = function (n) {
  const rooksBoard = new Board({n});
  const cols = _.range(n);
  let solutionCount = 0;

  const findRooks = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (let col of cols) {
      rooksBoard.togglePiece(row, col);

      if (!rooksBoard.hasColConflictAt(col)) {
        findRooks(row + 1);
      }

      if (!solutionCount) {
        rooksBoard.togglePiece(row, col);
      } else {
        return;
      }
    }

  };

  findRooks(0);

  return rooksBoard.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  let solutionCount = 0;

  const solutionBoard = new Board({n});
  const cols = _.range(n);

  const findSolutions = function (row) {
    // base case:
    if (row === n) {
      solutionCount++;
      return;
    }

    for (const col of cols) {
      solutionBoard.togglePiece(row, col);

      if (!solutionBoard.hasColConflictAt(col)) {
        findSolutions(row + 1);
      }

      solutionBoard.togglePiece(row, col);
    }
  };

  // find solutions starting at the first row
  findSolutions(0);

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  // === Recursive Backtracking Algorithm ===
  // Base Case:
  // - If row === 'n' -> we've found a solution -> solutionCount++
  //
  // Try to put a piece in the current row:
  // Iterate over the columns and place a piece at each
  // - if there's no conflict -> recurse at row + 1
  // - if there's a conflict -> backtrack (remove piece)

  // KEY INSIGHT: The ~Call Stack~ is our stack data structure!

  let solutionCount = 0;
  const solutionBoard = new Board({n});
  const cols = _.range(n);

  const findSolution = function (row) {
    // base case:
    if (row === n) {
      solutionCount++;
      return;
    }

    for (const col of cols) {
      solutionBoard.togglePiece(row, col);

      if (!(
        solutionBoard.hasColConflictAt(col) ||
        solutionBoard.hasMajorDiagonalConflictAt(col - row) ||
        solutionBoard.hasMinorDiagonalConflictAt(col + row)
      )) {
        findSolution(row + 1);
      }
      if (!solutionCount) {
        solutionBoard.togglePiece(row, col);
      } else {
        return;
      }
    }
  };

  findSolution(0);

  return solutionBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  let solutionCount = 0;

  const solutionBoard = new Board({n});
  const cols = _.range(n);

  const findSolutions = function (row) {
    // base case:
    if (row === n) {
      solutionCount++;
      return;
    }

    for (const col of cols) {
      solutionBoard.togglePiece(row, col);

      if (!(
        solutionBoard.hasColConflictAt(col) ||
        solutionBoard.hasMajorDiagonalConflictAt(col - row) ||
        solutionBoard.hasMinorDiagonalConflictAt(col + row)
      )) {
        findSolutions(row + 1);
      }

      solutionBoard.togglePiece(row, col);
    }

    // if we exhaust all columns
    return;
  };

  // find solutions starting at the first row
  findSolutions(0);

  return solutionCount;
};
