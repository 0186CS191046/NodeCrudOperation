const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const connectionString = 'postgresql://postgres:root@localhost:5432/postgres?schema=public'; // Replace with your PostgreSQL connection details
const db = pgp(connectionString);
const prisma = require('../../config/prisma/db.js')

const procedureStudent = async(req,res) => {
    const {id,name,age,address,email,teacher_id} = req.body;
    try {  
        const query = `CALL upsertStudent($1,$2,$3,$4,$5,$6)`;
        const result = await db.any(query,[id,name,age,address,email,teacher_id]);
        res.json({ message: 'Procedure called successfully'});
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while calling the procedure' });
      }
}

const proceTeacher = async (req, res) => {
  const { id, name, subject, email  } = req.body;
  try {
    // Execute the stored procedure with the MERGE statement
    const result = await db.any('CALL mergeTeacher($1, $2, $3, $4);', [id,name,subject,email]);
    res.json({ message: 'Data merged successfully'},);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while merging data' });
  }
};


// --------------Using stored procedure in prisma----------
const procedu = async (req,res)=> {
  const {id,name,age,address,email,teacher_id} = req.body;
  try {
      // const rawQuery = 'CALL upsertStudent($1,$2,$3,$4,$5,$6)'
    const result = await prisma.$queryRaw`CALL upsertStudent(${id}, ${name}, ${age}, ${address}, ${email}, ${teacher_id})`;
    // console.log(result);
    res.json({ message: 'Procedure called successfully'},);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
    procedureStudent,
    proceTeacher,
    procedu
};




