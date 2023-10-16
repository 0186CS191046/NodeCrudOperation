const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'crudapp',
    password: 'kajal@123',
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



