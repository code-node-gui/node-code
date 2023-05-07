require("dotenv").config();
const express = require("express");
const projects = require("./routes/projects")


const app = express();

app.use(express.json())

app.use((req,res,next)=>{
  console.log(req.path,req.method)
  next()
})

app.use("/api/projects/",projects)


app.listen(process.env.PORT,()=>{
  console.log('server running')
})