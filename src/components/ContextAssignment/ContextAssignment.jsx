import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 'auto-fit',
  }
});

export default function ContextAssignment(props) {
  const context = props.context
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader 
        title={
          <Typography gutterBottom variant="h5" component="h2" color="textSecondary">
            Contexto de la asignación
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
          {context}
        </Typography>
      </CardContent>
    </Card>
  );
}
