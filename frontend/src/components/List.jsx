import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { ArrowForwardIosRounded, ArrowForwardRounded, ContentCopyRounded, DeleteForeverRounded, MoreHorizRounded, OpenInFull, PlayArrowRounded, StartRounded } from '@mui/icons-material';
import api from '../assets/api';
import { NodesContext } from '../context/NodesContext';

export default function BasicMenu({project}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { setUpdateProjects }=React.useContext(NodesContext);


  const deleteProject = ()=>{
    api.delete("/projects/"+project._id,{
    }).then((res)=>{
        handleClose();
        setUpdateProjects(p=>p+1)
    })
  }



  return (
    <div>

            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                    <MoreHorizRounded/>
            </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{Width:300}}
      >
        <MenuItem onClick={handleClose}> 
        <ListItemIcon><ArrowForwardRounded/></ListItemIcon>
        <ListItemText>Open</ListItemText>
         </MenuItem>
        <MenuItem onClick={handleClose}>
        <ListItemIcon><PlayArrowRounded/></ListItemIcon>
        <ListItemText >Play</ListItemText>
         </MenuItem>
        <MenuItem onClick={handleClose}> 
        <ListItemIcon><ContentCopyRounded/></ListItemIcon>
        <ListItemText>Duplicate</ListItemText>
         </MenuItem>
        <MenuItem onClick={deleteProject}>
        <ListItemIcon><DeleteForeverRounded/></ListItemIcon>
        <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}