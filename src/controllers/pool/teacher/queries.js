

const getTeachers = "SELECT * FROM teacher";
const getTeacherById = "SELECT * FROM teacher WHERE id = $1"; 
const postTeacher = "INSERT INTO teacher (name,email,subject) VALUES($1,$2,$3) ";
const removeTeacher = "DELETE FROM teacher WHERE id = $1";
const putTeacher = "UPDATE teacher SET name=$1, email=$2 ,subject=$3  WHERE id=$4"



module.exports = {
    getTeachers,
    getTeacherById,
    postTeacher,
    removeTeacher,
    putTeacher,
    
}