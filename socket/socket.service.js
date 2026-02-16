const pool = require('../database/db');
module.exports = {
    saveMessage: async (msgData) => {
        // data = { message: '', receiver_id: '', sender_id: '', sender_name: ''}
        console.log(msgData, 'datamsg')
        const { message, receiver_id, sender_id } = msgData
        query = `INSERT INTO messages(sender_id, receiver_id, message) VALUES ($1,$2,$3)`
        const result = await pool.query(query, [sender_id, receiver_id, message])

    },
    getUsers: async () => {
        query = 'select id, user_name from users'
        const result = await pool.query(query);
        return result.rows
    },
    loadMessages: async (payload) => {
        const { sender_id, receiver_id } = payload

        // query = `select * from messages where
        //     (sender_id = $1 and receiver_id = $2) or  
        //     (sender_id = $2 and receiver_id = $1)
        //     order by created_at asc
        //     `
        
        query = `
            SELECT  m.*, u.user_name as sender_name
            FROM 
            messages AS m JOIN users AS u 
            ON u.id = m.sender_id
            WHERE 
                (m.sender_id = $1 AND m.receiver_id = $2)
                OR
                (m.sender_id = $2 AND m.receiver_id = $1)
            ORDER BY m.created_at ASC;

        `
        const chat_msgs = await pool.query(query, [sender_id, receiver_id])
        // console.log(chat_msgs.rows)
        return chat_msgs.rows
    }
}