var socket = io();
socket.on('connect', function () {
    console.log('Connection successful');
});

socket.on('newMessage', function (newMessage) {
    console.log(newMessage);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});




