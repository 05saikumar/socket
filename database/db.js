const { Pool } = require('pg');


const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});

// Test connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err.stack);
        return;
    }
    console.log('PostgreSQL connected successfully');
    release();
});

module.exports = pool;
