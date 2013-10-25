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

Chess.Board.MovedPieces = [];

// Save row-col of the pawn that in dangerous
Chess.Board.PawnFirstMove = [];


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

// 0: white; 100: black;
Chess.Board.MyColor = 0;
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
        // Check WAITTING status
        if (Chess.Board.StateCode === STATUS_WAITING) {
            return;
        }

        var obj = $(this);
        var _code = Number(obj.attr('code'));
        var _col = Number(obj.attr('col'));
        var _row = Number(obj.attr('row'));



        if (Chess.Board.StateCode === STATUS_READY) {
            // Check color
            if (_code !== -1) {
                if (!(((Chess.Board.MyColor > 50) && (_code > 50)) ||
                        ((Chess.Board.MyColor <= 50) && (_code <= 50)))) {
                    return;
                }
            }

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
                Piece.showAvailableMoves(piece.availableMoves);
                // Moving
                Chess.Board.StateCode = STATUS_MOVING;
            } else {
                // User have clicked in a empty cell
            }
        } else if (Chess.Board.StateCode === STATUS_MOVING) {
            // User is looking for a position to make a move
            if (obj.hasClass('highlight')) {
                // Make a normal move
                if (Chess.Board.SelectedPiece !== null) {
                    console.log('Move to: [' + _row + ',' + _col + ']');

                    // Check if the [to] is the same as [from]
                    if ((Math.abs(Chess.Board.SelectedPiece.position.col - _col) +
                            Math.abs(Chess.Board.SelectedPiece.position.row - _row)) !== 0) {
                        Chess.Board.Move(Chess.Board.SelectedPiece.code,
                                Chess.Board.SelectedPiece.position, {row: _row, col: _col});

                        // Wait for your next turn...
                        Chess.Board.StateCode = STATUS_WAITING;
                    } else {
                        // Invalid move (user have clicked in a piece itself)
                        // Re-draw the board
                        Chess.Board.ClearHighLight();
                        // Set status to READY
                        Chess.Board.StateCode = STATUS_READY;
                    }
                } else {
                    console.log("Something wrong, Chess.Board.SelectedPiece should be not null now");
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
            Chess.Board.Render();
        }
    });
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

        // Delete state before set code to -1
        if (code === 5 || code === 95) {
            var _index = Chess.Board.PawnFirstMove.indexOf(to.row + "-" + to.col);
            if (_index > -1) {
                Chess.Board.PawnFirstMove.splice(_index, 1);
            }
        }
        Chess.Board.CurrentState[from.row - 1][from.col - 1] = -1;

        Chess.Board.CurrentState[to.row - 1][to.col - 1] = code;

        Chess.Board.MovedPieces.push(from.row + "-" + from.col);

        // State for "Nhap thanh"
        var _pawn_from, _pawn_to;
        if (code === 5) {
            // White pawn
            _pawn_from = 7;
            _pawn_to = 5;
        } else if (code === 95) {
            // Black pawn
            _pawn_from = 2;
            _pawn_to = 4;
        }
        if (from.row === _pawn_from && to.row === _pawn_to) {
            if (Chess.Board.PawnFirstMove.indexOf(to.row + "-" + to.col) === -1) {
                Chess.Board.PawnFirstMove.push(to.row + "-" + to.col);
            }
        } else {
            var _index = Chess.Board.PawnFirstMove.indexOf(from.row + "-" + from.col);
            if (_index > -1) {
                Chess.Board.PawnFirstMove.splice(_index, 1);
            }
        }



        // Rule: Nhap thanh
        if (Chess.Board.GetPosition(to).hasClass('change')) {
            if (to.col === 3) {
                Chess.Board.CurrentState[to.row - 1][3] = Chess.Board.CurrentState[to.row - 1][0];
                Chess.Board.CurrentState[to.row - 1][0] = -1;
            } else if (to.col === 7) {
                Chess.Board.CurrentState[to.row - 1][5] = Chess.Board.CurrentState[to.row - 1][7];
                Chess.Board.CurrentState[to.row - 1][7] = -1;
            }
        }

        // Rule: Phong hau
        if (code === 5 || code === 100 - 5) {
            if (to.row === 1 || to.row === 8) {

                var _newpiece = "";
                var _newcode = -1;
                while (_newpiece === null || _newcode === -1) {
                    _newpiece = prompt("Enter your piece (queen, bishop, knight, rook)", "queen");
                    _newpiece = _newpiece.toLowerCase();
                    switch (_newpiece) {
                        case "queen":
                            _newcode = 1;
                            break;
                        case "bishop":
                            _newcode = 3;
                            break;
                        case "knight":
                            _newcode = 4;
                            break;
                        case "rook":
                            _newcode = 2;
                            break;
                        default:
                            _newcode = -1;
                    }
                }

                if (code < 50) {
                    Chess.Board.CurrentState[to.row - 1][to.col - 1] = _newcode;
                } else {
                    _newcode = 100 - _newcode;
                    Chess.Board.CurrentState[to.row - 1][to.col - 1] = _newcode;
                }
            }
        }

        // Rule: an chot qua duong
        if (Chess.Board.GetPosition(to).hasClass('pawntake')) {
            if (code === 5) {
                // White
                Chess.Board.CurrentState[to.row + 1 - 1][to.col - 1] = -1;
                // col, row + 1
            } else if (code === 95) {
                // black
                Chess.Board.CurrentState[to.row - 1 - 1][to.col - 1] = -1;
                // col, row - 1
            }
        }

    }
    Chess.Board.SelectedPiece = null;
    Chess.Board.Render();
    Push();
};

Chess.Board.SetActive = function(active) {
    if (active) {
        $('#protect').hide();
    } else {
        $('#protect').show();
    }
};
Chess.Board.CloseWaiting = function() {
    $('#waiting').hide();
};
/**
 * Return a code of the right position: use: Chess.Board.GetCode(8,8)
 * @param {type} row
 * @param {type} col
 * @returns {unresolved}
 */
Chess.Board.GetCode = function(row, col) {
    if (row < 1 || row > 8 || col < 1 || col > 8) {
        return null;
    } else {
        return Chess.Board.CurrentState[row - 1][col - 1];
    }
};