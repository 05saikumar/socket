const { handleMessage, handleUserId, privateMessage, loadChat } = require('./socket.controller.js')
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const sockAuth = require('./../middleware/socketAuth.js');
const { getUsers } = require('./socket.service.js');
module.exports = (io) => {

    io.use(sockAuth);
    io.on('connection', async (socket) => {
        const data = socket.user
        const user_name = data.user_name
        const id = data.id
        console.log(`client ${socket.user.id} connected`);
        const users = await getUsers()
        // console.log(users_list,'logggg')
        socket.emit("client_ready", `Welcome ${user_name}`,);
        socket.emit('users_list', users);

        // register events

        socket.on('id', (userId) => {
            handleUserId(socket, io, userId);
        });

        socket.on('message', (message) => {
            const data = {
                sender_id: id,
                sender_name: user_name,
                message: message
            }
            handleMessage(socket, io, data);
        });

        socket.on('private_message', (data) => {
            data.sender_id = id
            data.sender_name = user_name
            privateMessage(socket, io, data);
        })

        socket.on('load_conversation', (receiver_id) => {
            const payload = {
                sender_id: id,
                receiver_id: receiver_id
            }
            // console.log(payload,'load...')
            loadChat(socket,io,payload)
        })




        socket.on("error", (err) => {
            console.error("Socket error:", err.message);
        });

        // # disconnect
        socket.on("disconnect", () => {
            console.log(`client ${socket.user.id} disconnected`);
        });

    });



}