import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 260,
    backgroundColor: theme.palette.background.paper,
  }
}));

export default function DateAssignment(props) {
  const name = props.name
  const date = props.date
  const time = props.time
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
      <ListItem>
          <ListItemText primary={name} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EventIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText secondary={date} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ScheduleIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText secondary={time} />
        </ListItem>
      </List>
    </div>
  );
}
