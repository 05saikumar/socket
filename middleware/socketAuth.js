const cookie = require("cookie");
const jwt = require("jsonwebtoken");

module.exports = (socket, next) => {
    try {
        const rawCookie = socket.handshake.headers.cookie;
        if (!rawCookie) {
            return next(new Error("No cookie found"));
        }

        const parsed = cookie.parse(rawCookie);
        const token = parsed.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded,'dddd')
        data = decoded.user_data
        socket.user = {
            id: data.id,
            user_name: data.user_name
        };

        socket.join(socket.user.id); // creating a channel for each user
        next();

    } catch (err) {
        next(new Error("Authentication failed"));
    }

};
