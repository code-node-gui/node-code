import { Avatar } from '@mui/material'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import List from "./List"
import api from '../assets/api'
import { NodesContext } from '../context/NodesContext'
function ProjectCart({project}) {
    const Navigate = useNavigate()
    const { currentProject,setCurrentProject }=useContext(NodesContext);
    const openthis = ()=>{
            setCurrentProject(project)
            api.get("/projects/get-data/"+project._id).then((res)=>{
                localStorage.setItem("edges",JSON.stringify(res.data?.edges))
                localStorage.setItem("nodes",JSON.stringify(res.data?.nodes))
                localStorage.setItem("screens",JSON.stringify(res.data?.screens||["app"]))
                
            }).then(()=>{
                Navigate("/work-space")
            })

    }
  return (
                            <div  className="p-4 h-fit pb-1 pr-2 rounded-xl shadow-sm border duration-150 gap-4 bg-white flex flex-col">
                                <div className="flex gap-4">
                                <Avatar sx={{background:"rgb(96 165 250)"}}>:)</Avatar>
                                <div className="flex-1">
                                    <div onClick={openthis} className="pb-4 cursor-pointer">
                                        <h1 className="inline-block">{project.title}</h1>
                                        <span className={"p-1 px-2 inline-block rounded-md text-sm mx-2 "+(project.security=="public"?"bg-blue-100":"bg-red-100")}>{project.security}</span>
                                    </div>
                                <p className="text-sm text-gray-500">{project.description}</p>
                                </div>
                                <div className="text-gray-600">
                                        <List project={project}/>
                                </div>
                                </div>
                                <p className="text-sm text-gray-500 text-end">{project.updatedAt.slice(0,10)}</p>
                            </div>
  )
}

export default ProjectCart