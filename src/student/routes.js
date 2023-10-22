const { Router } = require('express');
const router = Router();
const controller = require('./controller');

// For students
router.get('/' ,controller.getStudents);
router.get('/:id' ,controller.getStudentById);
router.post('/' ,controller.postStudent);
router.delete('/:id' ,controller.removeStudent);
router.put('/:id' ,controller.putStudent);1



module.exports = router;