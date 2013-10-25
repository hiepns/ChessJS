var DEFAULT_BOARD = [[98, 96, 97, 99, 100, 97, 96, 98],
    [95, 95, 95, 95, 95, 95, 95, 95],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [5, 5, 5, 5, 5, 5, 5, 5],
    [2, 4, 3, 1, 0, 3, 4, 2]];


var app = require('http').createServer(handler)
        , io = require('socket.io').listen(app)
        , fs = require('fs');

app.listen(8818);
function handler(req, res) {
    fs.readFile(__dirname + '/client/' + (req.url.substring(0, 3) !== '/rs' || req.url === '/' ? 'index.html' : req.url),
            function(err, data) {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading resources');
                }
                res.writeHead(200);
                res.end(data);
            });
}


var roomInfoList = new Object();
var turn = 1;

io.sockets.on('connection', function(socket) {

    socket.on('join', function(room) {
        console.log('joining room', room);
        socket.join(room);
        if (io.sockets.clients(room).length >= 2) {
            if (typeof roomInfoList[room] === 'undefined') {
                // Start game
                roomInfoList[room] = new Object();
                roomInfoList[room].started = true;
                roomInfoList[room].state = DEFAULT_BOARD;
                // Send event to start game
                io.sockets.in(room).emit('startgame');
                // The one who join the room first go first
                io.sockets.clients(room)[0].emit('youareplayer');
                io.sockets.clients(room)[1].emit('youareplayer');
                io.sockets.clients(room)[1].emit('youareblack');
                changeTurn(room);
                
                // Send room state for all
                io.sockets.in(room).emit('roomState', roomInfoList[room].state, []);
            } else {
                // Guest joining or player refresh page, send roomState for him
                socket.emit('roomState', roomInfoList[room].state, []);
            }
        }

        if (typeof roomInfoList[room] !== 'undefined') {
            if (roomInfoList[room].started === true) {
                socket.emit('roomState', roomInfoList[room].state);
            }
        }
    });

    socket.on('leave', function(room) {
        console.log('leaving room', room);
        socket.leave(room);
    });
    socket.on('roomState', function(room, state, pawnstate) {
        if (typeof roomInfoList[room] !== 'undefined') {
            // Save the state
            roomInfoList[room].state = state;
            // Send to all client in room
            io.sockets.in(room).emit('roomState', roomInfoList[room].state, pawnstate);
            changeTurn(room);
        }
    });
    socket.on('resetGame', function(room) {
        if (typeof roomInfoList[room] !== 'undefined') {
            roomInfoList[room].state = DEFAULT_BOARD;
            io.sockets.in(room).emit('roomState', roomInfoList[room].state, []);
            io.sockets.in(room).emit('resetGame', roomInfoList[room].state, []);
            turn = 1;
            changeTurn(room);
        }
    });

    socket.on('getRooms', function(fn) {
        fn(io.sockets.manager.rooms);
    });

    socket.on('send', function(data) {
        console.log('sending message');
        io.sockets.in(data.room).emit('message', data);
    });

    changeTurn = function(room) {
        turn = 1 - turn;
        io.sockets.clients(room)[turn].emit('yourturn', true);
        io.sockets.clients(room)[1 - turn].emit('yourturn', false);
    };
});