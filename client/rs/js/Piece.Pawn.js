//============================================================
// Register Namespace
//------------------------------------------------------------
var Piece = Piece || {};

//============================================================
// Static Functions
//------------------------------------------------------------
/**
 * Show CSS effect of available moves
 * @param {type} availableMoves
 * @returns {undefined}
 */
Piece.showAvailableMoves = function Piece_Pawn_showAvailableMoves(availableMoves) {
    $.each(availableMoves, function(index, position) {
        if (typeof position.mode === 'undefined') {
            // This is a move
            Chess.Board.GetPosition(position).addClass('highlight');
        } else {
            if (position.mode === 'me') {
                // this is not a really move, just to mark this is itself.
                Chess.Board.GetPosition(position).addClass('highlight');
            } else if (position.mode === 'take') {
                // This is a move and win an other piece
                Chess.Board.GetPosition(position).addClass('highlight red');
            } else if (position.mode === 'change') {
                Chess.Board.GetPosition(position).addClass('highlight change');
            }
        }
    });
};

/**
 * Check if two codes is the same color
 * @param {type} code1
 * @param {type} code2
 * @returns {Boolean}
 */
Piece.isSameColor = function(code1, code2) {
    if ((code1 > 50 && code2 > 50) || (code1 <= 50 && code2 <= 50)) {
        return true;
    } else {
        return false;
    }
};

//============================================================
// Constructor - MUST BE AT TOP OF FILE
//------------------------------------------------------------
Piece.Pawn = function Piece_Pawn(isWhite) {
    if (isWhite) {
        this.code = 5;
    } else {
        this.code = 100 - 5;
    }
};

//============================================================
// Member Functions & Variables
//------------------------------------------------------------
Piece.Pawn.prototype = {
    code: -1,
    col: 0,
    row: 0,
    availableMoves: [],
    isWhite: function Piece_Pawn_isWhite() {
        return this.Code < 50;
    },
    /**
     * Generate all posible move at current board state.
     * @returns {Piece_Pawn_generateMoves}
     */
    generateMoves: function Piece_Pawn_generateMoves() {
        this.availableMoves = [];
        //this.availableMoves = [{col: this.col, row: this.row, mode: 'me'}, {col: 1, row: 1}, {col: 2, row: 3, mode: 'take'}, {col: 5, row: 6}];
        var _col = this.col;
        var _row = this.row;
        this.availableMoves.push({col: _col, row: _row, mode: 'me'});
        if (this.code >= 50) {
            // Black Pawn

            // If the forward is empty
            if (Chess.Board.GetCode(_row + 1, _col) === -1) {
                this.availableMoves.push({col: _col, row: _row + 1});


                // If the piece is in the first row
                if (_row === 2) {
                    // If the forward 2 is empty
                    if (Chess.Board.GetCode(_row + 2, _col) === -1) {
                        this.availableMoves.push({col: _col, row: _row + 2});
                    }
                }
            }

            // If there is emnemy in forward left or forward right

//            console.log('black: col:' + _col + ' row:' + _row);
            // Right
            if (Chess.Board.GetCode(_row + 1, _col + 1) !== -1) {
                // If the forward right is white
                if (Chess.Board.GetCode(_row + 1, _col + 1) < 50) {
                    this.availableMoves.push({col: _col + 1, row: _row + 1, mode: 'take'})
                }
            }
            // Left
            if (Chess.Board.GetCode(_row + 1, _col - 1) !== -1) {
                // If the forward right is white
                if (Chess.Board.GetCode(_row + 1, _col - 1) < 50) {
                    this.availableMoves.push({col: _col - 1, row: _row + 1, mode: 'take'})
                }
            }


        } else {
            // White Pawn
//            console.log('me: col:' + _col + ' row:' + _row);
//            
            // If the forward is empty
            if (Chess.Board.GetCode(_row - 1, _col) === -1) {
                this.availableMoves.push({col: _col, row: _row - 1});

                // If the piece is in the first row
                if (_row === 7) {
                    // If the forward 2 is empty
                    if (Chess.Board.GetCode(_row - 2, _col) === -1) {
                        this.availableMoves.push({col: _col, row: _row - 2});
                    }
                }
            }
            // If there is emnemy in forward left or forward right

            // Right
            if (Chess.Board.GetCode(_row - 1, _col + 1) !== -1) {
                // If the forward right is black
                if (Chess.Board.GetCode(_row - 1, _col + 1) >= 50) {
                    this.availableMoves.push({col: _col + 1, row: _row - 1, mode: 'take'});
                }
            }
            // Left
            if (Chess.Board.GetCode(_row - 1, _col - 1) !== -1) {
                // If the forward right is black
                if (Chess.Board.GetCode(_row - 1, _col - 1) >= 50) {
                    this.availableMoves.push({col: _col - 1, row: _row - 1, mode: 'take'});
                }
            }

        }
    },
    /**
     * Set piece's position in the board
     * @param {type} col
     * @param {type} row
     * @returns {Piece_Pawn_getPosition}
     */
    setPosition: function Piece_Pawn_getPosition(col, row) {
        this.col = col;
        this.row = row;
    }
};

//============================================================
// Static Variables
//------------------------------------------------------------


