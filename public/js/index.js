var socket = io();
socket.on('connect',function(){
    console.log('User connected');
});

socket.on('disconnect',function(){
    console.log('Disconnected');
});