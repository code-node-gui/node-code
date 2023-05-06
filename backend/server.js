const express = require("express");
require("dotenv").config();

const app = express();

app.get("/",(req,res)=>{
    res.json({msg:"welcome to the app"})
})

app.listen(process.env.PORT,()=>{
  console.log('server running')
})