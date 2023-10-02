import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import {Server} from "socket.io";
const io = new Server(server);
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let join;
let disconnect;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
io.on('error', (error) => {
    console.error(error);
});
server.listen(3001, () => {
    console.log('listening on *:3001');
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');

    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);

    });
});
