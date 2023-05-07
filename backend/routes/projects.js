const express = require("express");
const Project = require("../models/Project")
const router = express.Router();




router.get("/",(req,res)=>{
    res.json({msg:"get all projects"})
})

router.get("/:id",(req,res)=>{
    res.json({msg:"get a single project"})
})

router.post("/",async(req,res)=>{
    const {title,owner} = req.body
    try{
        const project = await Project.create({
            title,
            owner
        })
        res.status(200).json(project)
    }catch (error){
        res.status(400).json({error:error.message})
    }
    res.json({msg:"post a new project"})
})

router.delete("/:id",(req,res)=>{
    res.json({msg:"delete a project"})
})

router.patch("/:id",(req,res)=>{
    res.json({msg:"update a project"})
})

module.exports = router