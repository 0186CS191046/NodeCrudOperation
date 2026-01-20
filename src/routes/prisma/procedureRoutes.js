const procedureController = require('../../controllers/prisma/procedureController.js');
const router = require('express').Router()

router.post('/upsertstudent',procedureController.procedureStudent);
router.post('/upsertteacher',procedureController.proceTeacher);
router.post('/upsert',procedureController.procedu);

module.exports = router;