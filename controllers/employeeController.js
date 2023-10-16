const db = require('../models/server')

// create main model
const Employee = db.employees
// main work

const addEmployee = async (req,res)=>{
    let info = {
        name:req.body.name,
        city:req.body.city
    }
    try {
        const addEmployee = await Employee.create(info)
        if (addEmployee) {
            // res.json({ message: 'Employee created successfully.' });
            res.status(200).send(addEmployee)
          } else {
            res.status(404).json({ error: ' Can not Employee .' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Unable to create the employees.' });
        }
    }

const getAllEmployees = async (req,res)=> {
    try{
        const getEmployees = await Employee.findAll({})
        if (getEmployees) {
            res.status(200).send(getEmployees);
          } else {
            res.status(404).json({ error: 'Employees not found.' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Unable to get the employees.' });
        }
    }
    

const getOneEmployees = async (req,res)=> {
    let id = req.params.id
    try{
    const getEmployee = await Employee.findOne({where: { id:id }})
    if (getEmployee) {
        res.status(200).send(getEmployee);
      } else {
        res.status(404).json({ error: 'Employee not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to get the employee.' });
    }
}
    

const updateEmployee = async (req,res)=> {
    let id = req.params.id
    try{
    const updateEmployee = await Employee.update(req.body, {where: { id:id }})
    if (updateEmployee) {
        res.json({ message: 'Employee updated successfully.' });
      } else {
        res.status(404).json({ error: 'Employee not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to update the employee.' });
    }
}

const deleteEmployee = async (req,res)=> {
    let id = req.params.id
    try{
    const deleteEmployee = await Employee.destroy({where: { id:id }})
    if (deleteEmployee) {
        res.json({ message: 'Employee deleted successfully.' });
      } else {
        res.status(404).json({ error: 'Employee not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to delete the employee.' });
    }
}
module.exports = {
    addEmployee,
    getAllEmployees,
    getOneEmployees,
    updateEmployee,
    deleteEmployee
};