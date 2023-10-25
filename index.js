const express= require('express');
const studentRoutes = require('./src/student/routes')
const teacherRoutes = require('./src/teacher/routes')
const procRoutes = require('./routes/procedureRoutes.js')
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000;
const pdRouter = require("./routes/productroutes.js")
const ctRouter = require("./routes/categoryRoutes.js")
const mergeRouter = require("./routes/mergeRoutes.js")
const seq = require('./routes/employeeRoutes.js')

// middleware
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended : true}))

// routes
app.use("/api/students",studentRoutes)
app.use("/api/teachers",teacherRoutes)
app.use("/api/procedure",procRoutes)
app.use("/api/employees",seq)
app.use("/api/products",pdRouter)
app.use("/api/category",ctRouter)
app.use("/api/mergeProc",mergeRouter)


// testing api
app.get('/',(req,res)=>{
  res.json({message:'hello from api'})
})

app.listen(port,()=>{
    console.log(`Server up and running on port ${port}`);
})

