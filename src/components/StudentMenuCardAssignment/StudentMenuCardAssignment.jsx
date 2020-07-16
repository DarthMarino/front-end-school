import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import DialogDeliverAssignment from '../DialogDeliverAssignment/DialogDeliverAssignmnet'
import FullScreenDialog from '../FullScreenDialog/FullScreenDialog'
import DialogDetailAssignment from '../DialogDetailAssignment/DialogDetailAssignment'
import DialogEvaluationAssignment from '../DialogEvaluationAssignment/DialogEvaluationAssignment'
import RubricTable from '../RubricTable/RubricTable'

export default function StudentMenuCardAssignment(props) {
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
        <FullScreenDialog option="Asignación"> <DialogDetailAssignment assignment={assignment} /> </FullScreenDialog>
        <DialogDeliverAssignment assignment={assignment}/>
        <FullScreenDialog option="Evaluación"> <DialogEvaluationAssignment assignment={assignment}/> </FullScreenDialog>
        <FullScreenDialog option="Rúbrica"> <RubricTable rubric={assignment.rubric}/> </FullScreenDialog>
      </Menu>
    </div>
  );
}
