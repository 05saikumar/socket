require("dotenv").config();
const express = require('express')
const http = require('http');
const { Server } = require('socket.io')

const socketRouter = require('./socket/socket.router')

const { isUserExist } = require('./middleware/common')
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


// Plug socket router
socketRouter(io);

// app.get('/:id', isUserExist, (req, res) => {
//     res.send(`Hello from server ${id}`)
// })
app.get('/:id', isUserExist, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
})



const port = process.env.PORT
server.listen(port, () => {
    console.log(`server running on port ${port}`)
})





