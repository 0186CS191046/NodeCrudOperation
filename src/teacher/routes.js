const { Router } = require('express');
const router = Router();
const controller = require('./controller');

router.get('/' ,controller.getTeachers);
router.get('/:teacher_id' ,controller.getTeacherById);
router.post('/' ,controller.postTeacher);
router.delete('/:teacher_id' ,controller.removeTeacher);
router.put('/:teacher_id' ,controller.putTeacher);


module.exports = router;