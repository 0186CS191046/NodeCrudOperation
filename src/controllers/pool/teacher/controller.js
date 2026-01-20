const pool = require('../../../config/pool/db')
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
    const {name,email,subject} = req.body;
    pool.query(queries.postTeacher,[name,email,subject],(error,results) =>{
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
    const { name,email,subject } =  req.body;
    pool.query(queries.getTeacherById,[id],(error,results) =>{
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
        res.send("TeacherDoes not exist in the databse")
        }
        pool.query(queries.putTeacher, [name,email,subject,id], (error,results) => {
            if (error) throw error;
            res.status(200).send("Teacher updated successfully!")
            // pool.end();
    });   
    });
}

// const { user } = require('../../sequelize/models/user');

// Create a new teacher using Sequelize


module.exports = {
    getTeachers,
    getTeacherById,
    postTeacher,
    putTeacher,
    removeTeacher
};


