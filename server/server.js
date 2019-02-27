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

        socket.emit('newMessage', {
            from : 'Admin',
            message : 'Welcome to new User',
            createdAt : new Date().getTime()
        });

        socket.broadcast.emit('newMessage',{
            from : 'Admin',
            message : 'New user joined',
            createdAt : new Date().getTime()
        });

        socket.on('createMessage',(message)=>{
            console.log('received from client ', message);

            io.emit('newMessage', {
                from : message.from,
                body : message.body
            });
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
