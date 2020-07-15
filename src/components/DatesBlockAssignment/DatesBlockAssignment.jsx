import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import DateAssignment from '../DateAssignment/DateAssignment'
const moment = require('moment')

const useStyles = makeStyles((theme) => ({
  root: {
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
  },
}));

export default function DatesBlockAssignment(props) {
  const classes = useStyles();
  const openingDate = props.openingDate
  const deliveryDate = props.deliveryDate
  const deadline = props.deadline
  const getTime = (date) => moment(date).format('h:mm:ss a')
  const getDate = (date) => moment(date).format('MMMM Do YYYY')
  return (
    <div>
      <Grid container alignItems="center" className={classes.root}>
        <DateAssignment 
          date={getDate(openingDate)} 
          time={getTime(openingDate)}
          name="Fecha de apertura"/>
        <Divider orientation="vertical" flexItem />
        <DateAssignment 
          date={getDate(deliveryDate)} 
          time={getTime(deliveryDate)}
          name="Fecha de entrega"/>
        <Divider orientation="vertical" flexItem />
        <DateAssignment  
          date={getDate(deadline)} 
          time={getTime(deadline)} 
          name="Fecha de cierre"/>
      </Grid>
    </div>
  );
}
