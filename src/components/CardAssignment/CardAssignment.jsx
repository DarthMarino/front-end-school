import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import StudentMenuCardAssignment from '../StudentMenuCardAssignment/StudentMenuCardAssignment'
import DatesBlockAssignment from '../DatesBlockAssignment/DatesBlockAssignment'
import TeacherMenuCardAssignment from '../TeacherMenuCardAssignment/TeacherMenuCardAssignment'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900
  }
}));

export default function CardAssignment(props) {
  const isTeacher = props.isTeacher
  const assignment = props.assignment
  console.log(assignment)
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          (isTeacher)? <TeacherMenuCardAssignment assignment={assignment}></TeacherMenuCardAssignment>
          : <StudentMenuCardAssignment assignment={assignment}></StudentMenuCardAssignment>
        }
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
