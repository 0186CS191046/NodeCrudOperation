// For student crud operation
const getStudents = "SELECT * FROM student";
const getStudentById = "SELECT * FROM student WHERE id = $1";
const postStudent = "INSERT INTO student (name,age,address,teacher_id,email) VALUES($1,$2,$3,$4,$5) ";
const removeStudent = "DELETE FROM student WHERE id = $1";
const putStudent = "UPDATE student SET name=$1, age=$2, address=$3 ,teacher_id=$4,email=$5 WHERE id=$6"


module.exports = {
    getStudents,
    getStudentById,
    postStudent,
    removeStudent,
    putStudent,
   
}
