import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import List from "./List"
function ProjectCart({project}) {
  return (
                            <div  className="p-4 h-fit pb-1 pr-2 rounded-xl shadow-sm border duration-150 gap-4 bg-white flex flex-col">
                                <div className="flex gap-4">
                                <Avatar sx={{background:"rgb(96 165 250)"}}>:)</Avatar>
                                <div className="flex-1">
                                <Link to="/work-space">
                                    <div className="pb-4">
                                        <h1 className="inline-block">{project.title}</h1>
                                        <span className={"p-1 px-2 inline-block rounded-md text-sm mx-2 "+(project.security=="public"?"bg-blue-100":"bg-red-100")}>{project.security}</span>
                                    </div>
                                </Link>
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