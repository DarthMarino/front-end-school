import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    maxWidth: 'auto-fit',
    padding: 15
  }
});

export default function CommentsBox(props) {
  const comment = props.comment
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
        <Typography variant="body1" color="textPrimary" component="p">
          {comment}
        </Typography>
    </Paper>
  );
}
