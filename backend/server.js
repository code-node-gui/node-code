require("dotenv").config();
const express = require("express");
const projects = require("./routes/projects")
const mongoose = require("mongoose")

const app = express();

app.use(express.json())

app.use((req,res,next)=>{
  console.log(req.path,req.method)
  next()
})




app.use("/api/projects/",projects)

mongoose.connect(process.env.MONG_URI).then(()=>{
  console.log("connecting done")
  app.listen(process.env.PORT,()=>{
    console.log('server running')
  })
}).catch((err)=>{
  console.log(err)
})
