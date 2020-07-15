import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

// import MenuCardAssignment from '../menuCardAssignment/menuCardAssigment'
import DatesBlockAssignment from '../DatesBlockAssignment/DatesBlockAssignment'
// import TeacherMenuCardAssignment from '../teacherMenuCardAssignment/teacherMenuCardAssignment'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900
  }
}));

export default function CardAssignment(props) {
  const isTeacher = props.isTeacher
  const assignment = props.assignment
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        // action={
        //   (isTeacher)? <TeacherMenuCardAssignment></TeacherMenuCardAssignment>
        //   : <MenuCardAssignment></MenuCardAssignment>
        // }
        title={assignment.title}
        subheader={assignment.classroom.name}
      />
      <CardContent>
        <DatesBlockAssignment
          openingDate={assignment.openingDate}
          deliveryDate={assignment.deliveryDate}
          deadline={assignment.deadline}></DatesBlockAssignment>
      </CardContent>
    </Card>
  );
}
