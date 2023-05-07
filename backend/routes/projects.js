const express = require("express");
const router = express.Router();




router.get("/",(req,res)=>{
    res.json({msg:"get all projects"})
})

router.get("/:id",(req,res)=>{
    res.json({msg:"get a single project"})
})

router.post("/",(req,res)=>{
    res.json({msg:"post a new project"})
})

router.delete("/:id",(req,res)=>{
    res.json({msg:"delete a project"})
})

router.patch("/:id",(req,res)=>{
    res.json({msg:"update a project"})
})

module.exports = router