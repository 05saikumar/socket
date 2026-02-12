const socketService = require('./socket.service')
const users = {};

exports.handleUserId = (socket, io, userId) => {
    // console.log(id)
    users[socket.id] = userId
    socket.emit('id', userId);
}

exports.handleMessage = (socket, io, data) => {
    socket.emit('message', data);
}

exports.privateMessage = (socket, io, data) => {
    console.log(data, '...')
    // data = { msg: 'helo sai', receiver_id: '1', from_id: '1', from_user: 'sai' } 

    const refined_data = {
        sender_id: data.from_id,
        sender_name: data.from_user,
        message: data.msg,
    }
    const toUserId = data.receiver_id
    if(toUserId === data.from_id){
        console.log('same same')
        socket.emit("message", refined_data);
        return
    }

    socket.to(toUserId).emit("private_message", refined_data);

};
