const pool = require('../database/db');
const jwt = require('jsonwebtoken');
const cookie = require("cookie");


module.exports = {
    isUserExist: async (req, res, next) => {
        try {
            id = req.params.id
            query = `SELECT * FROM users WHERE id = $1`
            const result = await pool.query(query, [id])
            // console.log(!result.rows[0],'resultttt')

            if (!result.rows[0]) {
                return res.send('You are not authorized')
            }
            data = result.rows[0]
            // # jwt 
            const token = jwt.sign(
                { user_data: data },
                process.env.JWT_SECRET
            )

            // # sending cookie
            res.cookie('token', token, {
                httpOnly: true
            })
            
            // console.log(req.user,'ddddd')
            next()

        } catch (err) {
            return res.status(500).json({
                message: err && err.message ? err.message : 'Internal Server Error'
            })
        }

    }
}


