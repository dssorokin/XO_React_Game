const express = require("express");
const fs = require("fs");
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const players = {};
let counter = 0;
// const connections


app.use(express.static("client/build"));

io.on('connection', function (socket) {
    console.log('conection fine');

    socket.on('searching', function(playerName) {
        socket.playerName = playerName;
        console.log(playerName, 'joined the game');

        counter++;

        if (counter === 2) {
            socket.broadcast.emit('game begin');
        }

        if (!players[playerName]) {
            players[playerName] = socket;
        } else {
    
        }
    
        // console.log(players);
    });

    socket.on('USER_MOVE', function(stepInfo) {
        console.log(stepInfo);
        const { playerName, cellId } = stepInfo;
        let opponentConnection;

        for (var name in players) {
            console.log('name', name);
            if (name != playerName) {
                opponentConnection = players[name];
            }
        }

        console.log(opponentConnection.playerName);

        opponentConnection.emit('OPPONENT_MOVE', cellId);

    });

});


server.listen(3002, () => {
    console.log(`Find the server at: http://localhost:3001}/`); // eslint-disable-line no-console
});


