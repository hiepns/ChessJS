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
Piece.Queen = function Piece_Queen(isWhite) {
    if (isWhite) {
        this.code = 1;
    } else {
        this.code = 100 - 1;
    }
};

//============================================================
// Member Functions & Variables
//------------------------------------------------------------
Piece.Queen.prototype = {
    code: -1,
    col: 0,
    row: 0,
    availableMoves: [],
    isWhite: function Piece_Queen_isWhite() {
        return this.Code < 50;
    },
    /**
     * Generate all posible move at current board state.
     * @returns {Piece_Queen_generateMoves}
     */
    generateMoves: function Piece_Queen_generateMoves() {
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
        
        
        // Vertical right
        var _col = this.col;
        var _row = this.row;
        while (Chess.Board.GetCode(_row, ++_col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        }
        if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
            this.availableMoves.push({row: _row, col: _col, mode: 'take'});
        }
        // Vertical left
        var _col = this.col;
        var _row = this.row;

        while (Chess.Board.GetCode(_row, --_col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        }
        if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
            this.availableMoves.push({row: _row, col: _col, mode: 'take'});
        }

        // Horizontal up
        var _col = this.col;
        var _row = this.row;

//        console.log('I was here: _row=' + _row + ' _col=' + _col + ' - ' + Chess.Board.GetCode(_row - 1, _col));
        while (Chess.Board.GetCode(--_row, _col) === -1) {
//            console.log('_rowwwww: ' + _row);
            this.availableMoves.push({row: _row, col: _col});
        }
        if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
            this.availableMoves.push({row: _row, col: _col, mode: 'take'});
        }
        // Horizontal down
        var _col = this.col;
        var _row = this.row;

        while (Chess.Board.GetCode(++_row, _col) === -1) {
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
     * @returns {Piece_Queen_getPosition}
     */
    setPosition: function Piece_Queen_getPosition(col, row) {
        this.col = col;
        this.row = row;
    },
};

//============================================================
// Static Variables
//------------------------------------------------------------


