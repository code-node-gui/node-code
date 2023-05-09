import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { AddRounded, CheckCircle, Circle } from '@mui/icons-material';
import { useState } from 'react';
import api from '../assets/api';
import { NodesContext } from '../context/NodesContext';
import { Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GoProfile() {
  const [open, setOpen] =useState(false);
  const [security,setSecurity]=useState("public");
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const navigate = useNavigate()
  const { currentProject ,edges,nodes,scrns  }=React.useContext(NodesContext);



  const save = ()=>{
    api.post("/projects/save-data/"+currentProject._id,{
      data:JSON.stringify({edges,nodes,screens:scrns}),
      title:currentProject.title,
    }).then((res)=>{
      navigate('/')
    })
  }



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("")
    setDescription("")
    setSecurity("public")
  };
  return (
    <div>


        <IconButton onClick={handleClickOpen} >
          <Avatar src="https://avatars.githubusercontent.com/u/115560200?v=4">TS</Avatar>
        </IconButton>

      <Dialog
        sx={{borderRadius:"30px"}}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Closing Project confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <p className='w-[400px]'>
            you didnt save your project
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <button onClick={handleClose} className="px-4 py-2 bg-gray-400 flex gap-1 text-white rounded-xl">
            close
        </button>
        <button onClick={()=>navigate("/")} className="px-4 py-2 bg-red-300 flex gap-1 text-white rounded-xl">
            don't save
        </button>
        <button onClick={save} className="px-4 py-2 bg-blue-400 flex gap-1 text-white rounded-xl">
            save
        </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}