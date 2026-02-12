const { handleMessage, handleUserId, privateMessage } = require('./socket.controller.js')
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const sockAuth = require('./../middleware/socketAuth.js')
module.exports = (io) => {
    try {
        io.use(sockAuth);
        io.on('connection', (socket) => {
            const data = socket.user
            const user_name = data.user_name
            const id = data.id
            console.log('client connected', socket.id);
            socket.emit("client_ready", `Welcome ${user_name}`);

            // register events

            socket.on('id', (userId) => {
                handleUserId(socket, io, userId);
            });

            socket.on('message', (msg) => {
                const data = {
                    id: id,
                    user_name: user_name,
                    message: msg
                }
                handleMessage(socket, io, data);
            });

            socket.on('private_message', (data) => {
                data.from_id = id
                data.from_user = user_name
                privateMessage(socket, io, data);


            })

        });
    } catch (err) {
        socket.emit('server-error', {
            status: 400,
            message: 'Invalid data provided'
        });
    }


}