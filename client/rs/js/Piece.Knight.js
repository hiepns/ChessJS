//============================================================
// Register Namespace
//------------------------------------------------------------
var Piece = Piece || {};

//============================================================
// Static Functions
//------------------------------------------------------------


//============================================================
// Constructor - MUST BE AT TOP OF FILE
//------------------------------------------------------------
Piece.Knight = function Piece_Knight(isWhite) {
    if (isWhite) {
        this.code = 4;
    } else {
        this.code = 100 - 4;
    }
};

//============================================================
// Member Functions & Variables
//------------------------------------------------------------
Piece.Knight.prototype = {
    code: -1,
    col: 0,
    row: 0,
    availableMoves: [],
    isWhite: function Piece_Knight_isWhite() {
        return this.Code < 50;
    },
    /**
     * Generate all posible move at current board state.
     * @returns {Piece_Knight_generateMoves}
     */
    generateMoves: function Piece_Knight_generateMoves() {
        this.availableMoves = [];
        //this.availableMoves = [{col: this.col, row: this.row, mode: 'me'}, {col: 1, row: 1}, {col: 2, row: 3, mode: 'take'}, {col: 5, row: 6}];
        this.availableMoves.push({col: this.col, row: this.row, mode: 'me'});


        var _col = this.col;
        var _row = this.row;

        // Top Left 
        if (Chess.Board.GetCode(_row - 2, _col - 1) === -1) {
            this.availableMoves.push({row: _row - 2, col: _col - 1});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row - 2, _col - 1), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row - 2, col: _col - 1, mode: 'take'});
            } else {
                
            }
        }
        // Right Top 
        if (Chess.Board.GetCode(_row - 2, _col + 1) === -1) {
            this.availableMoves.push({row: _row - 2, col: _col + 1});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row - 2, _col + 1), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row - 2, col: _col + 1, mode: 'take'});
            } else {
                
            }
        }
        // Bottom Left
        if (Chess.Board.GetCode(_row + 2, _col - 1) === -1) {
            this.availableMoves.push({row: _row + 2, col: _col - 1});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row + 2, _col - 1), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row + 2, col: _col - 1, mode: 'take'});
            } else {
                
            }
        }
        // Bottom Right
//        console.log("Bottom Right: _row + 2:" + (_row + 2) + " _col+1:" + (_col + 1) + " code:" + Chess.Board.GetCode(_row + 2, _col + 1) + " thiscode" + this.code);
        if (Chess.Board.GetCode(_row + 2, _col + 1) === -1) {
            this.availableMoves.push({row: _row + 2, col: _col + 1});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row + 2, _col + 1), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row + 2, col: _col + 1, mode: 'take'});
            } else {
                
            }
        }

        // Left Top
        if (Chess.Board.GetCode(_row - 1, _col - 2) === -1) {
            this.availableMoves.push({row: _row - 1, col: _col - 2});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row - 1, _col - 2), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row - 1, col: _col - 2, mode: 'take'});
            } else {
                
            }
        }
        // Left Bottom
        if (Chess.Board.GetCode(_row + 1, _col - 2) === -1) {
            this.availableMoves.push({row: _row + 1, col: _col - 2});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row + 1, _col - 2), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row + 1, col: _col - 2, mode: 'take'});
            } else {
                
            }
        }

        // Right Top
        if (Chess.Board.GetCode(_row - 1, _col + 2) === -1) {
            this.availableMoves.push({row: _row - 1, col: _col + 2});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row - 1, _col + 2), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row - 1, col: _col + 2, mode: 'take'});
            } else {
                
            }
        }
        // Right Bottom
        if (Chess.Board.GetCode(_row + 1, _col + 2) === -1) {
            this.availableMoves.push({row: _row + 1, col: _col + 2});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row + 1, _col + 2), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row + 1, col: _col + 2, mode: 'take'});
            } else {
                
            }
        }



    },
    /**
     * Set piece's position in the board
     * @param {type} col
     * @param {type} row
     * @returns {Piece_Knight_getPosition}
     */
    setPosition: function Piece_Knight_getPosition(col, row) {
        this.col = col;
        this.row = row;
    }
};

//============================================================
// Static Variables
//------------------------------------------------------------


