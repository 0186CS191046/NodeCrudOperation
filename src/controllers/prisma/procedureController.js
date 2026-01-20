const express = require('express');
const {default:config}  = require("../../config/index.js")
const app = express();
const pgp = require('pg-promise')();
const connectionString = config.database_url
const db = pgp(connectionString);
const prisma = require('../../config/prisma/db.js')

// ---------------------------------upsertStudent query
// CREATE OR REPLACE PROCEDURE upsertStudent(
//     p_id INTEGER,
//     p_name TEXT,
//     p_age INTEGER,
//     p_address TEXT,
//     p_email TEXT,
//     p_teacher_id INTEGER
// )
// LANGUAGE plpgsql
// AS $$
// BEGIN
//     INSERT INTO student (id, name, age, address, email, teacher_id)
//     VALUES (p_id, p_name, p_age, p_address, p_email, p_teacher_id)
//     ON CONFLICT (id)
//     DO UPDATE SET
//         name = EXCLUDED.name,
//         age = EXCLUDED.age,
//         address = EXCLUDED.address,
//         email = EXCLUDED.email,
//         teacher_id = EXCLUDED.teacher_id;
// END;
// $$;

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

// ------------------------MergeTeacher----------
// CREATE OR REPLACE PROCEDURE mergeTeacher(
//     p_id INTEGER,
//     p_name TEXT,
//     p_subject TEXT,
//     p_email TEXT
// )
// LANGUAGE plpgsql
// AS $$
// BEGIN
//     MERGE INTO teacher t
//     USING (
//         SELECT 
//             p_id AS id,
//             p_name AS name,
//             p_subject AS subject,
//             p_email AS email
//     ) s
//     ON t.id = s.id

//     WHEN MATCHED THEN
//         UPDATE SET
//             name = s.name,
//             subject = s.subject,
//             email = s.email

//     WHEN NOT MATCHED THEN
//         INSERT (id, name, subject, email)
//         VALUES (s.id, s.name, s.subject, s.email);
// END;
// $$;


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




