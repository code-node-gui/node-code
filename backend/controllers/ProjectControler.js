const Project = require("../models/Project")
const mongoose = require("mongoose")
// get all projects

const getAllProjects = async(req,res)=>{
    const projects = await Project.find({}).sort({createdAt: -1 })
    res.status(200).json(projects)
}

//get a single project
const getProject = async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such project"})
    }

    const project = await Project.findById(id)

    if(!project){
        return res.status(404).json({error:"no such project"})
    }

    res.status(200).json(project)
}



// create new project
const createProject= async(req,res)=>{
    const {title,owner,security,description} = req.body
    try{
        const project = await Project.create({
            title,
            owner,
            security,
            description
        })
        res.status(200).json(project)
    }catch (error){
        res.status(400).json({error:error.message})
    }
}

/// deleting  project


const deleteProject = async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such project"})
    }

    const project = await Project.findOneAndDelete({_id : id})

    if(!project){
        return res.status(404).json({error:"no such project"})
    }

    res.status(200).json(project)
}

// update a project 
const updateProject = async (req,res)=>{
    const {id}=req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"no such project"})
    }

    const project = await Project.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!project){
        return res.status(404).json({error:"no such project"})
    }

    res.status(200).json(project)
    
}


module.exports = {
    createProject,getAllProjects,getProject,deleteProject, updateProject
}