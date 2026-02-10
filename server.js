const WebSocket = require('ws');

const server = new WebSocket.Server({
    port: 3000
});  
// socket.on => connection, message
// socket.send
//

server.on('connection', (socket) => {

    console.log("Client connected");

    socket.send("Welcome client!");
    socket.send("hoe you are doing great");

    socket.on('message', (message) => {

        console.log("Received:", message.toString());

        // broadcast to everyone
        server.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN){
                client.send(message.toString());
            }
        });

    });

    socket.on('close', () => {
        console.log("Client disconnected");
    });

});
