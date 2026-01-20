const express= require('express');
const studentRoutes = require('./src/routes/pool/student.js')
const teacherRoutes = require('./src/routes/pool/teacher.js')
const procRoutes = require('./src/routes/prisma/procedureRoutes.js')
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000;
const pdRouter = require("./src/routes/prisma/productroutes.js")
const ctRouter = require("./src/routes/prisma/categoryRoutes.js")
const mergeRouter = require("./src/routes/prisma/mergeRoutes.js")
const seq = require('./src/routes/sequelize/employeeRoutes.js')

// middleware
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended : true}))

// routes
// using pool
app.use("/api/students",studentRoutes)
app.use("/api/teachers",teacherRoutes)

// using sequelize
app.use("/api/employees",seq)

// using prisma
app.use("/api/procedure",procRoutes)
app.use("/api/products",pdRouter)
app.use("/api/category",ctRouter)
app.use("/api/mergeProc",mergeRouter)

app.get('/',(req,res)=>{
  res.json({message:'hello from api'})
})

app.listen(port,()=>{
    console.log(`Server up and running on port ${port}`);
})

