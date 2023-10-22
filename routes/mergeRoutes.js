const mergeController = require('../controllers/mergeController.js');
const router = require('express').Router()

router.post('/merge',mergeController.proceMerge);
module.exports = router;