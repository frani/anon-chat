const uuid = require('uuid/v4');

const express = require('express');
const app = express();

const http = require('http');
const httpServer = http.Server(app);

const socket = require('socket.io');
const io = socket(httpServer);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', socket => {
    let userUUID = uuid();
    console.log('a user connected, uuid: ', userUUID);
    socket.on('disconnect', () => {
        console.log('user is disconnected, uudi: ', userUUID)
    });
    socket.on('chat message', msg => {
        console.log('message: ', msg);
        io.emit('chat message', msg);
    })
});



httpServer.listen(8080, () => {
    console.log(`Server started on 8080`);
});