    io.on('connection', (socket) => {
    console.log('client connected', socket.id);
    socket.emit("client_ready", 'Welcome Client');
    // socket.emit('connection','Hello client');

    let id
    socket.on('id', (userId) => {
        id = userId
        console.log('userId : ', id);
        // io.emit('id', id)
        socket.emit('id', id)

    });

    socket.on('message', (msg) => {
        
        console.log('received: ', msg);
        // socket.emit('message', 'only to client') // broadcast only to the connection
        const data = {
            message: msg,
            id: id
        }
        // socket.emit('message', data) // broadcast only to the connection
        io.emit('message', data) // global broadcasting
    });

})