import React, { useState } from 'react'
import { cats } from '../assets/cats'
import { Avatar } from '@mui/material'


import ControlCameraRoundedIcon from '@mui/icons-material/ControlCameraRounded';
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import OutputRoundedIcon from '@mui/icons-material/OutputRounded';
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import AllInboxRoundedIcon from '@mui/icons-material/AllInboxRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';


function NodeCats({HandleCatSelect,catSelected}) {
    const [catsIcons,setCatsIcons]=useState([
        <ControlCameraRoundedIcon/>,
        <InputRoundedIcon/>,
        <OutputRoundedIcon/>,
        <EmojiObjectsRoundedIcon/>,
        <CalculateRoundedIcon/>,
        <AllInboxRoundedIcon/>,
        <CodeRoundedIcon/>,
        <ExtensionRoundedIcon/>,
        <StyleRoundedIcon/>
    ])
  return (
            <div id="workspace" className="flex border-x  justify-between flex-col py-4">
              <div className="flex flex-col">
              {
                cats.map((cat,key)=>{
                  return(
                  <button key={key} onClick={()=>HandleCatSelect(cat.name)} className={"px-3 rounded-lg mx-1  py-2 "+(cat.name==catSelected?"bg-blue-400 text-white":" text-gray-700 ")}>
                    <div className="text-sm font-semibold text-start">{catsIcons[key]} {cat.name.toUpperCase()}</div>
                  </button>
                  )
                })
              }
              </div>
            </div>
  )
}

export default NodeCats