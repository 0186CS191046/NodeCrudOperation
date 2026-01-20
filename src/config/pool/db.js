const { Pool } = require('pg');
const {default : config} = require("../index.js")

const pool = new Pool({
    user: config.db_user,
    host: config.db_host,
    database:config.db_name,
    password: config.db_password,
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



