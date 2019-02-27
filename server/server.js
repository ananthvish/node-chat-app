    const path = require('path');
    const express = require('express');
    const http = require('http');
    const socketIO = require('socket.io');

    const messages = require('./utils/message');

    var app = express();
    const port = process.env.PORT || 3000;

    const publicPath = path.join(__dirname, '../public');
    const server = http.createServer(app);
    var io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('New user connected');

        socket.emit('newMessage', messages.generateMessage('Admin','Welcome to the chat application'));

        socket.broadcast.emit('newMessage',messages.generateMessage('Ananth','New user joined the chat application'));

        socket.on('createMessage',(message)=>{
            console.log('received from client ', message);

            io.emit('newMessage', messages.generateMessage(message.from,message.body));
            /*socket.broadcast.emit('newMessage',{
                from : message.from,
                body : message.body,
                createdAt : new Date().getTime()
            })*/
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
