const dbConfig = require('../../config/sequelize/db.js')
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  
  {
    host:dbConfig.HOST,
    logging :dbConfig.logging,
    dialect:dbConfig.dialect,
    operatorAliases : false,

    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle : dbConfig.pool.idle
    }
  }

  // dialect : 'sqlite',
  // storage : './db.sqlite'
);

sequelize.authenticate()
.then(() => {
    console.log('Database connection has been established successfully using sequelize.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database using sequelize:', err);
  });

  const db = {}

  db.Sequelize = Sequelize
  db.sequelize = sequelize
//   console.log(db.Sequelize)

  db.employees = require('../../models/sequelize/employee.js')(sequelize,DataTypes)
  
  db.sequelize.sync({force: false})
  .then(()=>{
    console.log('yes re-sync done')
    
  })

module.exports = db;
