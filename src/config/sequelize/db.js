const {default : config} = require("../index.js");

module.exports = {
  HOST : config.db_host,
  USER : config.db_user,
  PASSWORD : config.db_password,
  DB : config.db_name,
  dialect: 'postgres',
  logging:false,
  pool: {
    max:5,
    min:0,
    acquire:30000,
    idle : 10000
  }
}
