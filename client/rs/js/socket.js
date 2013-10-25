var roomName = location.hash.replace('#', '');
if (roomName === "") {
    roomName = "home";
}

var socket = io.connect();

socket.on('startgame', function() {
    console.log("START");
});
socket.on('youareblack', function() {
    Chess.Board.MyColor = 100;
});

socket.on('roomState', function(roomState, pawnstate) {
    if (typeof localStorage[roomName] !== 'undefined') {
        Chess.Board.SetActive(true);
    }
    Chess.Board.CloseWaiting();
    Chess.Board.CurrentState = roomState;
    Chess.Board.PawnFirstMove = pawnstate;
    Chess.Board.Render();
});
socket.on('yourturn', function(myturn) {
    if (myturn) {
        Chess.Board.StateCode = STATUS_READY;
    } else {
        Chess.Board.StateCode = STATUS_WAITING;
    }
});
socket.on('resetGame', function() {
    // Reset rules to initiate state.
    Chess.Board.PawnFirstMove = [];
    Chess.Board.MovedPieces = [];
});

socket.on('youareplayer', function() {
    localStorage[roomName] = true;
    Chess.Board.SetActive(true);
});

socket.emit('join', roomName);

function Push() {
    socket.emit(socket.emit('roomState', roomName, Chess.Board.CurrentState, Chess.Board.PawnFirstMove));
}
function ResetGame() {
    socket.emit(socket.emit('resetGame', roomName));
}
$(function() {
    socket.emit('getRooms', getRooms);
    setInterval(function() {
        socket.emit('getRooms', getRooms);
    }, 3000);
});

function getRooms(rooms) {
    $('#list_room').html('');
    $.each(rooms, function(k, v) {
        if (k !== "") {
            $('#list_room').append('<p><a href="javascript:;" onclick="window.location=\'#' + k.replace("/", "") + '\';location.reload()">#' + k.replace("/", "") + '</a></p>');
        }
    });
}