////============================================================
// Register Namespace
//------------------------------------------------------------
var Chess = Chess || {};
//============================================================
// Constructor - MUST BE AT TOP OF FILE
//------------------------------------------------------------
Chess.Board = function Chess_Board(selector) {
//this.instance = $(selector);
};
//============================================================
// Member Functions & Variables
//------------------------------------------------------------
//Chess.Board.prototype = {
//};

//============================================================
// Static Variables
//------------------------------------------------------------

/**
 * Board state: CurrentState[row][col]
 * @type Array
 */
Chess.Board.CurrentState = [[-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1]];
/**
 * Selected Piece Position
 * @type {code: Integer, position: {row: Integer, col: Integer}}
 */
Chess.Board.SelectedPiece = null;
/**
 * State Code:
 * 0: STATUS_READY (wait for select a piece)
 * 1: STATUS_MOVING (after user select a piece and moves have been highlighted.
 * 2: STATUS_WAITING (after user made a move, wait for player 2.
 * @type Number
 */

Chess.Board.StateCode = 0;
// This will run asychronize with the class (run right after jQuery is loaded)
$(function() {
    Chess.Board.Instance = $('#chess_board');
});
//============================================================
// Static Functions
//------------------------------------------------------------

/**
 * Draw the table
 * @returns {undefined}
 */
Chess.Board.Render = function() {
    // Draw HTML
    var _html = '<table cellspacing="0" cellpadding="0">';
    $.each(Chess.Board.CurrentState, function(rowIndex, cols) {
        _html += '<tr>';
        $.each(cols, function(colIndex, pieceCode) {
            // colCode and rowCode for standard chess board
            // http://www.chess-game-strategies.com/images/annotated-chess_algebraic_naming-squares.gif
            var colCode = String.fromCharCode(65 + colIndex);
            var rowCode = 8 - rowIndex;
            _html += '<td col="' + (colIndex + 1) +
                    '" row="' + (rowIndex + 1) +
                    '" id="' + colCode + rowCode +
                    '" code="' + pieceCode +
                    '">' + PieceChar[pieceCode] +
                    '</td>';
        });
        _html += '</tr>';
    });
    Chess.Board.Instance.html(_html);
    // Bind click event
    Chess.Board.Instance.off('click.selectpiece', 'td');
    Chess.Board.Instance.on('click.selectpiece', 'td', function() {
        var obj = $(this);
        var _code = Number(obj.attr('code'));
        var _col = Number(obj.attr('col'));
        var _row = Number(obj.attr('row'));
        if (Chess.Board.StateCode === STATUS_READY) {
            // User selected a piece
            Chess.Board.SelectedPiece = {code: _code, position: {col: _col, row: _row}};
            var piece;
            switch (_code) {
                case 0:
                    piece = new Piece.King(true);
                    break;
                case 1:
                    piece = new Piece.Queen(true);
                    break;
                case 2:
                    piece = new Piece.Rook(true);
                    break;
                case 3:
                    piece = new Piece.Bishop(true);
                    break;
                case 4:
                    piece = new Piece.Knight(true);
                    break;
                case 5:
                    piece = new Piece.Pawn(true);
                    break;
                case 100:
                    piece = new Piece.King(false);
                    break;
                case 99:
                    piece = new Piece.Queen(false);
                    break;
                case 98:
                    piece = new Piece.Rook(false);
                    break;
                case 97:
                    piece = new Piece.Bishop(false);
                    break;
                case 96:
                    piece = new Piece.Knight(false);
                    break;
                case 95:
                    piece = new Piece.Pawn(false);
                    break;
                default:
                    piece = null;
            }

            if (piece !== null) {
                piece.setPosition(_col, _row);
                piece.generateMoves();
                piece.showAvailableMoves();
                // Moving
                Chess.Board.StateCode = STATUS_MOVING;
            } else {
                // User have clicked in a empty cell
            }
        } else if (Chess.Board.StateCode === STATUS_MOVING) {
            // User is looking for a position to make a move
            if (obj.hasClass('highlight')) {
                if (obj.hasClass('red')) {
                    // Win a competitor's piece
                    if (Chess.Board.SelectedPiece !== null) {
                        console.log('Take: [' + _row + ',' + _col + ']');
                        Chess.Board.Move(Chess.Board.SelectedPiece.code,
                                Chess.Board.SelectedPiece.position, {row: _row, col: _col});
                    } else {
                        console.log("Something wrong, Chess.Board.SelectedPiece should be not null now");
                    }
                } else {
                    // Make a normal move
                    if (Chess.Board.SelectedPiece !== null) {
                        console.log('Move to: [' + _row + ',' + _col + ']');
                        Chess.Board.Move(Chess.Board.SelectedPiece.code,
                                Chess.Board.SelectedPiece.position, {row: _row, col: _col});
                    } else {
                        console.log("Something wrong, Chess.Board.SelectedPiece should be not null now");
                    }
                }
            } else {
                // Invalid move (user have clicked in a empty cell)
                // Re-draw the board
                Chess.Board.ClearHighLight();
                // Set status to READY
                Chess.Board.StateCode = STATUS_READY;
                console.log('Invalid move!');
            }
            Chess.Board.SelectedPiece = null;
        }
    });
    // Set board status to READY
    Chess.Board.StateCode = STATUS_READY;
};
Chess.Board.ClearHighLight = function() {
    return Chess.Board.Instance.find('td').removeClass('highlight red');
};
/**
 * Return a <td> element in the position
 * @param {type} position
 * @returns jQuery Object
 */
Chess.Board.GetPosition = function(position) {
    return Chess.Board.Instance.find('td[col=' + position.col + '][row=' + position.row + ']');
};
/**
 * Move a piece
 * @param Integer code Piece's code
 * @param {col: X, row: Y} from 
 * @param {col: X, row: Y} to
 * @returns {undefined}
 */
Chess.Board.Move = function(code, from, to) {
    if (Chess.Board.CurrentState[from.row - 1][from.col - 1] !== code) {
        console.log('Wrong code at position: ' + from);
    } else {
        Chess.Board.CurrentState[from.row - 1][from.col - 1] = -1;
        Chess.Board.CurrentState[to.row - 1][to.col - 1] = code;
    }
    Chess.Board.Render();
};