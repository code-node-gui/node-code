import { FavoriteBorderOutlined } from '@mui/icons-material'
import { Avatar, Button, IconButton } from '@mui/material'
import React from 'react'
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Link } from 'react-router-dom';
import GoProfile from './GoProfile';
function NavBar({screen,setScreen}) {
  return (
    <div className='flex justify-between items-center flex-col p-3'>
        <div className='flex flex-col '>
            <Button onClick={()=>setScreen(0)} sx={{padding:2,color:screen==0&&"white",background:screen==0&&"rgb(96 165 250)"}}>
                <ElectricBoltRoundedIcon/>
            </Button>
            <Button onClick={()=>setScreen(1)} sx={{padding:2,color:screen==1&&"white",background:screen==1&&"rgb(96 165 250)"}}>
                <PlayArrowRoundedIcon/>
            </Button>
            {/* <Button onClick={()=>setScreen(1)} sx={{padding:2,color:screen==1&&"white",background:screen==1&&"rgb(96 165 250)"}}>
                <FolderRoundedIcon/>
            </Button>
            <Button onClick={()=>setScreen(2)} sx={{padding:2,color:screen==2&&"white",background:screen==2&&"rgb(96 165 250)"}}>
                <ExtensionRoundedIcon/>
            </Button>
            <Button onClick={()=>setScreen(3)} sx={{padding:2,color:screen==3&&"white",background:screen==3&&"rgb(96 165 250)"}}>
                <FileUploadRoundedIcon/>
            </Button> */}
        </div>
        <GoProfile/>
    </div>
  )
}

export default NavBar