// // // routes/employeeRoutes.js
// const express = require('express');
// const router = express.Router();
const employeeController = require('../controllers/employeeController.js');
const router = require('express').Router()

router.post('/addEmployee', employeeController.addEmployee);
router.get('/getAllEmployees', employeeController.getAllEmployees);
router.get('/getOneEmployee/:id', employeeController.getOneEmployees);
router.put('/updateEmployee/:id', employeeController.updateEmployee);
router.delete('/deleteEmployee/:id', employeeController.deleteEmployee);

module.exports = router;