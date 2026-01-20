const { default: config } = require("../../config/index.js");
const prisma = require("../../config/prisma/db.js")
const pgp = require('pg-promise')();
const connectionString = config.database_url
const db = pgp(connectionString);


const proceMerge = async (req, res) => {
  const { id, name, city } = req.body;
  try {
    // Execute the stored procedure with the MERGE statement
    const result = await db.any('CALL mergeEmployee($1, $2, $3);', [id,name,city]);
    res.json({ message: 'Data merged successfully'},);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while merging data' });
  }
    };
module.exports = {
    proceMerge
}