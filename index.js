const express= require('express');
// const studentRoutes = require('./src/student/routes')
// const teacherRoutes = require('./src/teacher/routes')
// const userRoutes = require('./')
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
// const db = require('./models/server')
// const router = require('./routes/employeeRoutes.js')
const pdRouter = require("./routes/productroutes.js")
// const seq = require('./routes/employeeRoutes')
// const userRoutes = require('./practice/kajal')

// middleware
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended : true}))

// routes
// app.use("/api/students",studentRoutes)
// app.use("/api/teachers",teacherRoutes)
// app.use("/api/employees",router)
app.use("/api/products",pdRouter)

// testing api
app.get('/',(req,res)=>{
  res.json({message:'hello from api'})
})

app.listen(port,()=>{
    console.log(`Server up and running on port ${port}`);
})

