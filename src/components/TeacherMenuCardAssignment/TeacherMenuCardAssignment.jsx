import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FullScreenDialog from '../FullScreenDialog/FullScreenDialog'
import DialogDetailAssignment from '../DialogDetailAssignment/DialogDetailAssignment'


export default function TeacherMenuCardAssignment(props) {
  const assignment = props.assignment
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <FullScreenDialog option="Asignación"> <DialogDetailAssignment assignment={assignment}/> </FullScreenDialog>
        <MenuItem onClick={handleClose}>Entregables</MenuItem>
      </Menu>
    </div>
  );
}