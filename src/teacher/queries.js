

const getTeachers = "SELECT * FROM teacher";
const getTeacherById = "SELECT * FROM teacher WHERE teacher_id = $1"; 
const postTeacher = "INSERT INTO teacher (name,subject) VALUES($1,$2) ";
const removeTeacher = "DELETE FROM teacher WHERE teacher_id = $1";
const putTeacher = "UPDATE teacher SET name=$1, subject=$2 WHERE teacher_id=$3"

const upsert = 'SELECT upsert_teacher($1, $2, $3, $4)'

module.exports = {
    getTeachers,
    getTeacherById,
    postTeacher,
    removeTeacher,
    putTeacher,
    upsert
}