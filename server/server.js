const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('createMessage',(message)=>{
        console.log(message);
    });

    socket.emit('newMessage', {
        from: 'Ananth',
        body: 'Hello!',
        createdAt: new Date()
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

});
app.use(express.static(publicPath));

io.on('disconnect', () => {
    console.log('User disconnected');
});

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
