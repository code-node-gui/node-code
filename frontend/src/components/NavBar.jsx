import { FavoriteBorderOutlined } from '@mui/icons-material'
import { Avatar, Button } from '@mui/material'
import React from 'react'
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
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
        <Avatar src="https://avatars.githubusercontent.com/u/115560200?s=400&u=724c093e867f4a640be09692400a33f2049ff121&v=4"> TS</Avatar>
    </div>
  )
}

export default NavBar