const {saveMessage, loadMessages} = require('./socket.service')
module.exports = {
    handleUserId: (socket, io, userId) => {
        // console.log(id)
        socket.emit('id', userId);
    },


    handleMessage: (socket, io, data) => {
        socket.emit('message', data);
    },

    privateMessage: async (socket, io, data) => {
        // console.log(data, '...')
        // data = { message: 'helo dhanu', receiver_id: '2', sender_id: '1', sender_name: 'sai'}
        const msg_payload = data
        // console.log(payload,'dddd')
        const toUserId = String(data.receiver_id)
        if (toUserId === data.from_id) {
            // console.log('same same')
            socket.emit("message", msg_payload);
            return
        }
        // console.log(msg_payload,'payload')
        const savedMsg = await saveMessage(msg_payload)
        socket.emit('message', msg_payload);
        socket.to(toUserId).emit("private_message", msg_payload);

    },
    loadChat : async(socket,io,payload) => {
        const messages = await loadMessages(payload)
        socket.emit('conversation_loaded',messages)
    }

}