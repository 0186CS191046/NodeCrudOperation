const pool = require('../../config/db')
const queries = require('./queries');
const axios = require('axios');

const getTeachers = (req, res) =>{
    pool.query(queries.getTeachers,(error,results) =>{
        if (error) throw error;
        res.status(200).json(results.rows)
        // pool.end();
    });
}

const getTeacherById = (req, res) =>{
    const id = parseInt(req.params.teacher_id);
    pool.query(queries.getTeacherById,[id],(error,results) =>{
        const TeacherFound = !results.rows.length;
        if (TeacherFound) {
            res.send("Teacher Does not exist in the databse")
        }
        else{
        res.status(200).json(results.rows)
        }
        // pool.end();
    });
}

const postTeacher = (req, res)=> {
    const {name,subject} = req.body;
    pool.query(queries.postTeacher,[name,subject],(error,results) =>{
        if (error) throw error;
        res.status(201).send("Teachers Created Successfully!")
        // pool.end();
    })
}

const removeTeacher = (req,res)=>{
    const id = parseInt(req.params.teacher_id);
    pool.query(queries.removeTeacher,[id],(error,results)=>{
        const noTeacherFound = !results.rows.length;
        if (noTeacherFound){
            res.send("Teacher Does not exist in the databse")
        }
        // pool.end();
    });
};

const putTeacher = (req,res) => {
    const id = parseInt(req.params.teacher_id);
    const { name, subject } =  req.body;
    pool.query(queries.getTeacherById,[id],(error,results) =>{
        const noTeacherFound = !results.rows.length;
        if (noTeacherFound) {
        res.send("Teacher Does not exist in the databse")
        }
        pool.query(queries.putTeacher, [name,subject,id], (error,results) => {
            if (error) throw error;
            res.status(200).send("Teacher updated successfully!")
            // pool.end();
    });   
    });
}

const upsert_data = async(req,res) => {
    try{
        const { teacher_id, name, subject, email } = req.body;
        await pool.query(queries.upsert, [teacher_id, name, subject, email]);
        res.status(200).json({ message: 'Teacher upserted successfully' });
        pool.end();
  } catch (error) {
    console.error('Error calling stored procedure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// const { user } = require('../../sequelize/models/user');

// Create a new teacher using Sequelize
const seq_user = async (req, res) => {
  try {
    const { id, name, city } = req.body;
    const users = await user.create({id, name, city });
    res.status(201).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    getTeachers,
    getTeacherById,
    postTeacher,
    putTeacher,
    removeTeacher,
    upsert_data,
    seq_user
};


