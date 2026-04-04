const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 1e8 
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('User Terhubung: ' + socket.id);
    socket.on('chat', (data) => {
        io.emit('chat', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log('-------------------------------------------');
    console.log('SISTEM AKTIF: English Dept. Chatting Room');
    console.log(`Akses di: http://localhost:${PORT}`);
    console.log('-------------------------------------------');
});