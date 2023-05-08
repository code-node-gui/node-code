import { AddRounded, MoreHorizRounded, PlusOneRounded, SearchOffRounded, SearchRounded } from "@mui/icons-material";
import { Avatar, Button, IconButton  } from "@mui/material";
import React from "react";
import { Link } from 'react-router-dom';
import List from "../components/List"

function Profile() {
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
                <button className="px-2 pr-4 py-2 bg-blue-400 flex gap-1 text-white rounded-xl">
                    <AddRounded/>
                    new
                </button>
            </div>


            <div className="grid grid-cols-2 gap-2 py-4">



                {
                    new Array(3).fill("hello").map((e)=>{
                        return (
                <div className="p-4 rounded-xl shadow-sm border duration-150 gap-4 bg-white flex ">
                    <Avatar sx={{background:"rgb(96 165 250)"}}>:)</Avatar>
                    <div>
                    <Link to="/work-space">
                      <h1>name of the project</h1>
                    </Link>
                    <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio beatae exercitationem distincti</p>
                    </div>
                    <div className="text-gray-600">
                            <List/>
                        {/* </IconButton> */}
                    </div>
                </div>
                
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
