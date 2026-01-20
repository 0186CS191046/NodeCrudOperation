const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
    max:10,
    idleTimeoutMillis: 30000,
})

pool.connect((err) => {
    if (err) {
        console.log('connection error',err.stack)
    }
    else{
    console.log("connected to database.")
    }
})

module.exports = pool;



