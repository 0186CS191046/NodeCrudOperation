
const pool = require('../../config/db')
const queries = require('./queries');
// For students
const getStudents = (req, res) =>{
    pool.query(queries.getStudents,(error,results) =>{
        if (error) throw error;
        res.status(200).json(results.rows)
        // pool.end();  
    });
}

const getStudentById = (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById,[id],(error,results) =>{
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student Does not exist in the databse")
        }
        else{
        res.status(200).json(results.rows)
        }
        // pool.end();
    });
}

const postStudent = (req, res)=> {
    const {name, age, address,teacher_id,email} = req.body;
    pool.query(queries.postStudent,[name,age,address,teacher_id,email],(error,results) =>{
        if (error) throw error;
        res.status(201).send("Students Created Successfully!")
        // pool.end();
    })
}

const removeStudent = (req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.removeStudent,[id],(error,results)=>{
        const noStudentFound = !results.rows.length;
        if (noStudentFound){
            res.send("Student Does not exist in the databse")
        }
        // pool.end();
    });
};

const putStudent = (req,res) => {
    const id = parseInt(req.params.id);
    const { name, age, address,teacher_id,email } =  req.body;
    pool.query(queries.getStudentById,[id],(error,results) =>{
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
        res.send("Student Does not exist in the databse")
        }
        pool.query(queries.putStudent, [name,age,address,teacher_id,email,id], (error,results) => {
            if (error) throw error;
            res.status(200).send("Student updated successfully!")
            // pool.end();
    });   
    });
}

const upsert_data = async(req,res) => {
    try{
        const { id, name,age,address, email, teacher_id } = req.body;
        await pool.query(queries.upsert, [id, name, age,address, email, teacher_id]);
        res.status(200).json({ message: 'Student upserted successfully' });
        // pool.end();
  } catch (error) {
    console.error('Error calling stored procedure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
    getStudents,
    getStudentById,
    postStudent,
    removeStudent,
    putStudent,upsert_data
};