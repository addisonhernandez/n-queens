// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      // access row -> rowIndex
      //  filter the row -> only include '1's
      //  return length > 1

      let row = this.get(rowIndex);

      row = _.filter(row, item => item === 1);

      return row.length > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      // for every row [0 -> n)
      //  check if hasRowConflictAt(row)

      // get the size of the matrix
      const size = this.get('n');
      // iterate from 0 to less than n
      const rows = _.range(size);
      // call hasRowConflictAt for each row
      return _.some(rows, (row) => { return this.hasRowConflictAt(row); });
      // if all are false > return false : if any is true return true
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      // iterate over every row
      //  check row[colIndex]
      //  counter to track '1's
      // if counter > 1 -> true

      const rows = _.range(this.get('n'));
      let numberOfQueens = 0;

      for (const row of rows) {
        numberOfQueens += this.get(row)[colIndex];

        if (numberOfQueens > 1) {
          return true;
        }
      }

      return false;


      // const rows = this.rows();
      // const transpose = _.unzip(rows);

      // return (new Board(transpose)).hasRowConflictAt(colIndex);

    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      const cols = _.range(this.get('n'));
      return _.some(cols, (col) => { return this.hasColConflictAt(col); });
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      // create pointers to current row & col
      // set row -> 0
      // let row = 0;
      // set col -> majorDiagonalColumnIndexAtFirstRow
      let col = majorDiagonalColumnIndexAtFirstRow;

      const rows = _.range(this.get('n'));

      let numberOfQueens = 0;

      // iterate (adding 1 to row and col after each step)
      //  if (row, col) is not in bounds -> continue
      //   increment counter of number of queens if (row, col) is 1
      //   if counter > 1 -> return true

      for (const row of rows) {
        if (this._isInBounds(row, col)) {
          if (this.get(row)[col]) {
            numberOfQueens++;
          }
          if (numberOfQueens > 1) {
            return true;
          }
        }
        col++;
      }


      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      // Major Diagonals are in the range [-(n-1) -> n)

      const n = this.get('n');
      const majorDiagonalColumnIndexes = _.range(-(n - 1), n);

      return _.some(majorDiagonalColumnIndexes, index => this.hasMajorDiagonalConflictAt(index));
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      // on each iteration: increment row (for loop)
      //                    decrease col

      let col = minorDiagonalColumnIndexAtFirstRow;
      let numberOfQueens = 0;

      for (const row of _.range(this.get('n'))) {
        if (!this._isInBounds(row, col)) {
          col--;
          continue;
        }

        numberOfQueens += this.get(row)[col];

        if (numberOfQueens > 1) {
          return true;
        }

        col--;
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      // Minor Diagonals are in the range [0 -> 2n - 1)
      const n = this.get('n');
      const minorDiagonalColumnIndexes = _.range(2 * n - 1);

      return _.some(minorDiagonalColumnIndexes, index => this.hasMinorDiagonalConflictAt(index));
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
