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
Piece.Bishop = function Piece_Bishop(isWhite) {
    if (isWhite) {
        this.code = 3;
    } else {
        this.code = 100 - 3;
    }
};

//============================================================
// Member Functions & Variables
//------------------------------------------------------------
Piece.Bishop.prototype = {
    code: -1,
    col: 0,
    row: 0,
    availableMoves: [],
    isWhite: function Piece_Bishop_isWhite() {
        return this.Code < 50;
    },
    /**
     * Generate all posible move at current board state.
     * @returns {Piece_Pawn_generateMoves}
     */
    generateMoves: function Piece_Bishop_generateMoves() {
        this.availableMoves = [];
        //this.availableMoves = [{col: this.col, row: this.row, mode: 'me'}, {col: 1, row: 1}, {col: 2, row: 3, mode: 'take'}, {col: 5, row: 6}];
        this.availableMoves.push({col: this.col, row: this.row, mode: 'me'});

        // TOP RIGHT
        var _col = this.col;
        var _row = this.row;
        while (Chess.Board.GetCode(--_row, ++_col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        }
        if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
            this.availableMoves.push({row: _row, col: _col, mode: 'take'});
        }
        
        // TOP LEFT
        var _col = this.col;
        var _row = this.row;
        while (Chess.Board.GetCode(--_row, --_col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        }
        if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
            this.availableMoves.push({row: _row, col: _col, mode: 'take'});
        }
        // BOTTOM RIGHT
        var _col = this.col;
        var _row = this.row;
        while (Chess.Board.GetCode(++_row, ++_col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        }
        if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
            this.availableMoves.push({row: _row, col: _col, mode: 'take'});
        }
        
        // BOTTOM LEFT
        var _col = this.col;
        var _row = this.row;
        while (Chess.Board.GetCode(++_row, --_col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        }
        if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
            this.availableMoves.push({row: _row, col: _col, mode: 'take'});
        }
        
        
        
        
    },
    /**
     * Set piece's position in the board
     * @param {type} col
     * @param {type} row
     * @returns {Piece_Pawn_getPosition}
     */
    setPosition: function Piece_Bishop_getPosition(col, row) {
        this.col = col;
        this.row = row;
    },
};

//============================================================
// Static Variables
//------------------------------------------------------------


