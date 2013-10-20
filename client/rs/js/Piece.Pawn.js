//============================================================
// Register Namespace
//------------------------------------------------------------
var Piece = Piece || {};

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
        //this.availableMoves = [];
        this.availableMoves = [{col: this.col, row: this.row, mode: 'me'}, {col: 1, row: 1}, {col: 2, row: 3, mode: 'take'}, {col: 5, row: 6}];
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
    },
    /**
     * Show CSS effect of available moves
     * @returns {undefined}
     */
    showAvailableMoves: function Piece_Pawn_showAvailableMoves() {
        $.each(this.availableMoves, function(index, position) {
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
                }
            }
        });
    }
};

//============================================================
// Static Variables
//------------------------------------------------------------


//============================================================
// Static Functions
//------------------------------------------------------------
