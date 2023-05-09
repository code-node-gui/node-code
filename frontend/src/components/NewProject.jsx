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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewProject() {
  const [open, setOpen] =useState(false);
  const [security,setSecurity]=useState("public");
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")

  const { setUpdateProjects }=React.useContext(NodesContext);


  const create = ()=>{
    api.post("/projects",{
        title,
        description,
        security,
        owner:12345678
    }).then((res)=>{
        handleClose();
        setUpdateProjects(p=>p+1)
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

    <button onClick={handleClickOpen} className="px-2 pr-4 py-2 bg-blue-400 flex gap-1 text-white rounded-xl">
        <AddRounded/>
        new
    </button>
      <Dialog
        sx={{borderRadius:"30px"}}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Create a new Project"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText>
                <input placeholder="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="mt-2 outline-blue-400  rounded-xl text-gray-600  border flex items-center px-2 bg-white py-2 w-[500px]"></input>
                <textarea placeholder="description"  value={description} onChange={(e)=>{setDescription(e.target.value)}} className="mt-2 outline-blue-400 w-full rounded-xl text-gray-600  border flex items-center px-2 bg-white py-2 "></textarea>
                <div className='flex gap-2 mt-2'>
                    <button onClick={()=>setSecurity("public")} className={"px-4 py-2  flex gap-1 text-white rounded-xl "+(security=="public"?"bg-blue-300":"bg-gray-400")}>
                        {security=="public"?<CheckCircle></CheckCircle>:<Circle></Circle>}
                        Public</button>
                    <button onClick={()=>setSecurity("privet")} className={"px-4 py-2  flex gap-1 text-white rounded-xl "+(security=="privet"?"bg-red-300":"bg-gray-400")}>
                        {security=="privet"?<CheckCircle></CheckCircle>:<Circle></Circle>}
                        Privet</button>
                </div>
        </DialogContent>
        <DialogActions>
        <button onClick={handleClose} className="px-4 py-2 bg-gray-400 flex gap-1 text-white rounded-xl">
            Close
        </button>
        <button onClick={create} className="px-4 py-2 bg-blue-400 flex gap-1 text-white rounded-xl">
            Create
        </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}