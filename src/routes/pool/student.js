const { Router } = require('express');
const router = Router();
const controller = require('../../controllers/pool/student/controller');

router.get('/' ,controller.getStudents);
router.get('/:id' ,controller.getStudentById);
router.post('/' ,controller.postStudent);
router.delete('/:id' ,controller.removeStudent);
router.put('/:id' ,controller.putStudent);1


module.exports = router;