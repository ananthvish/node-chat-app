var socket = io();
socket.on('connect', function () {
    console.log('Connection successful');

    socket.emit('createMessage', {
        from : 'Ananth',
        body : 'Works'
    })
});

socket.on('newMessage', function (newMessage) {
    console.log('new message', newMessage);
})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});




