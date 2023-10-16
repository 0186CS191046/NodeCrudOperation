// models/employee.js
const emp = (sequelize, DataTypes) => {
    const Employee = sequelize.define('employee', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
      },
    });
  
    return Employee;
  };

  module.exports = emp;

//   console.log(emp)
  