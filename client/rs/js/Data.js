
/////////////   PIECES   //////////////////////
var WHITE_KING = '&#9812;';
var WHITE_QUEEN = '&#9813;';
var WHITE_ROOK = '&#9814;';
var WHITE_BISHOP = '&#9815;';
var WHITE_KNIGHT = '&#9816;';
var WHITE_PAWN = '&#9817;';
var BLACK_KING = '&#9818;';
var BLACK_QUEEN = '&#9819;';
var BLACK_ROOK = '&#9820;';
var BLACK_BISHOP = '&#9821;';
var BLACK_KNIGHT = '&#9822;';
var BLACK_PAWN = '&#9823;';

var PieceChar = new Object();
PieceChar[-1] = '';

PieceChar[0] = WHITE_KING;
PieceChar[1] = WHITE_QUEEN;
PieceChar[2] = WHITE_ROOK;
PieceChar[3] = WHITE_BISHOP;
PieceChar[4] = WHITE_KNIGHT;
PieceChar[5] = WHITE_PAWN;

PieceChar[100 - 0] = BLACK_KING;
PieceChar[100 - 1] = BLACK_QUEEN;
PieceChar[100 - 2] = BLACK_ROOK;
PieceChar[100 - 3] = BLACK_BISHOP;
PieceChar[100 - 4] = BLACK_KNIGHT;
PieceChar[100 - 5] = BLACK_PAWN;


/////////////   BOARD   /////////////////////
var DEFAULT_BOARD = [[98, 96, 97, 99, 100, 97, 96, 98],
    [95, 95, 95, 95, 95, 95, 95, 95],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [5, 5, 5, 5, 5, 5, 5, 5],
    [2, 4, 3, 1, 0, 3, 4, 2]];

var STATUS_READY = 0;
var STATUS_MOVING = 1;
var STATUS_WAITING = 2;