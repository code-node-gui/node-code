import { AddRounded, MoreHorizRounded, PlusOneRounded, SearchOffRounded, SearchRounded } from "@mui/icons-material";
import { Avatar, Button, IconButton  } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import List from "../components/List"
import { NodesContext } from "../context/NodesContext";
import api from "../assets/api";
import NewProject from "../components/NewProject";
import ProjectCart from "../components/ProjectCart";

function Profile() {
  
  const { projects,setProjects ,updateProjects }=useContext(NodesContext);
  
  useEffect(() => {
    api.get("/projects").then((res)=>{
        setProjects(res.data);
    })
  }, [updateProjects])

  return (
    <div className="bg-gray-50 min-h-[100vh]">

    <div className="container mx-auto px-4 ">
      <div className=" flex pt-24 relative ">



        <div className=" w-[500px] bg-white  flex flex-col rounded-xl p-4 border shadow-sm h-fit">
          <div className="flex  gap-4  ">
            <IconButton>
              <Avatar
                sx={{ width: 100, height: 100 }}
                src="https://avatars.githubusercontent.com/u/115560200?v=4"
              ></Avatar>
            </IconButton>
            <div className="py-3 flex-1">
              <h3 className="text-lg">tchisama</h3>
              <h3 className="text-sm text-gray-700">#tchi-sama</h3>
            </div>
                  <div className="text-gray-600 ">
                      <IconButton>
                          <MoreHorizRounded/>
                      </IconButton>
                  </div>
          </div>
            <p className="text-sm text-gray-700 p-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
              eaque alias fugit veritatis harum unde! Ut laboriosam voluptatem
              quos repudiandae labore quo voluptatibus velit illum? Quas,
              cumque! Ut, eligendi eius?
            </p>
          </div>


        <div className="px-4 flex-1">
            <h1 className="text-3xl uppercase py-4 text-gray-600">Your projects</h1>

            <div className="py-2 flex justify-between w-full">
                <div className="h-10 rounded-xl text-gray-600  border flex items-center px-2 bg-white ">
                <input placeholder="search" className="outline-none"></input>
                <SearchRounded/>
                </div>
                <NewProject/>
            </div>


            <div className="grid grid-cols-2 gap-2 py-4">



                {
                    projects && projects.map((project)=>{
                        return (
                            <ProjectCart key={project._id} project={project} />
                        )
                    })

                }            


            </div>

        </div>


      </div>
    </div>
    </div>
  );
}

export default Profile;
