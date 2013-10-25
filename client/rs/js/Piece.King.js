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
Piece.King = function Piece_King(isWhite) {
    if (isWhite) {
        this.code = 0;
    } else {
        this.code = 100 - 0;
    }
};

//============================================================
// Member Functions & Variables
//------------------------------------------------------------
Piece.King.prototype = {
    code: -1,
    col: 0,
    row: 0,
    availableMoves: [],
    isWhite: function Piece_King_isWhite() {
        return this.Code < 50;
    },
    /**
     * Generate all posible move at current board state.
     * @returns {Piece_King_generateMoves}
     */
    generateMoves: function Piece_King_generateMoves() {
        this.availableMoves = [];
        //this.availableMoves = [{col: this.col, row: this.row, mode: 'me'}, {col: 1, row: 1}, {col: 2, row: 3, mode: 'take'}, {col: 5, row: 6}];
        this.availableMoves.push({col: this.col, row: this.row, mode: 'me'});


        // Top 
        var _col = this.col;
        var _row = this.row - 1;

        if (Chess.Board.GetCode(_row, _col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row, col: _col, mode: 'take'});
            } else {

            }
        }

        // Bottom
        var _col = this.col;
        var _row = this.row + 1;

        if (Chess.Board.GetCode(_row, _col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row, col: _col, mode: 'take'});
            } else {

            }
        }

        // Left 
        var _col = this.col - 1;
        var _row = this.row;

        if (Chess.Board.GetCode(_row, _col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row, col: _col, mode: 'take'});
            } else {

            }
        }
        // Right 
        var _col = this.col + 1;
        var _row = this.row;

        if (Chess.Board.GetCode(_row, _col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row, col: _col, mode: 'take'});
            } else {

            }
        }

        // Top left
        var _col = this.col - 1;
        var _row = this.row - 1;

        if (Chess.Board.GetCode(_row, _col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row, col: _col, mode: 'take'});
            } else {

            }
        }

        // Top right
        var _col = this.col + 1;
        var _row = this.row - 1;

        if (Chess.Board.GetCode(_row, _col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row, col: _col, mode: 'take'});
            } else {

            }
        }

        // Bottom left
        var _col = this.col - 1;
        var _row = this.row + 1;

        if (Chess.Board.GetCode(_row, _col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row, col: _col, mode: 'take'});
            } else {

            }
        }

        // Bottom right
        var _col = this.col + 1;
        var _row = this.row + 1;

        if (Chess.Board.GetCode(_row, _col) === -1) {
            this.availableMoves.push({row: _row, col: _col});
        } else {
            if (!Piece.isSameColor(Chess.Board.GetCode(_row, _col), this.code) &&
                    (_row >= 1 && _row <= 8 && _col >= 1 && _col <= 8)) {
                this.availableMoves.push({row: _row, col: _col, mode: 'take'});
            } else {

            }
        }
        if (this.code < 50) {
            // If white

            // Left Rook
            // "No one in the way"
            if ((Chess.Board.MovedPieces.indexOf("8-5") === -1) &&
                    (Chess.Board.MovedPieces.indexOf("8-1") === -1)) {
                if ((Chess.Board.GetCode(8, 2) === -1) &&
                        (Chess.Board.GetCode(8, 3) === -1) &&
                        (Chess.Board.GetCode(8, 4) === -1)) {
                    this.availableMoves.push({row: 8, col: 3, mode: 'change'});
                }
            }
            // "No one look in the way"
            // TODO:



            // Right Rook
            // "No one in the way"
            if ((Chess.Board.MovedPieces.indexOf("8-5") === -1) &&
                    (Chess.Board.MovedPieces.indexOf("8-8") === -1)) {
                if ((Chess.Board.GetCode(8, 6) === -1) &&
                        (Chess.Board.GetCode(8, 7) === -1)) {
                    this.availableMoves.push({row: 8, col: 7, mode: 'change'});
                }
            }
            // "No one look in the way"
            // TODO:

        } else {
            // If black

            // Left Rook
            // "No one in the way"
            if ((Chess.Board.MovedPieces.indexOf("1-5") === -1) &&
                    (Chess.Board.MovedPieces.indexOf("1-1") === -1)) {
                if ((Chess.Board.GetCode(1, 2) === -1) &&
                        (Chess.Board.GetCode(1, 3) === -1) &&
                        (Chess.Board.GetCode(1, 4) === -1)) {
                    this.availableMoves.push({row: 1, col: 3, mode: 'change'});
                }
            }
            // "No one look in the way"
            // TODO:
            
            // Right Rook
            // "No one in the way"
            if ((Chess.Board.MovedPieces.indexOf("1-5") === -1) &&
                    (Chess.Board.MovedPieces.indexOf("1-8") === -1)) {
                if ((Chess.Board.GetCode(1, 6) === -1) &&
                        (Chess.Board.GetCode(1, 7) === -1)) {
                    this.availableMoves.push({row: 1, col: 7, mode: 'change'});
                }
            }
            // "No one look in the way"
            // TODO:

        }

    },
    /**
     * Set piece's position in the board
     * @param {type} col
     * @param {type} row
     * @returns {Piece_King_getPosition}
     */
    setPosition: function Piece_King_getPosition(col, row) {
        this.col = col;
        this.row = row;
    }
};

//============================================================
// Static Variables
//------------------------------------------------------------


