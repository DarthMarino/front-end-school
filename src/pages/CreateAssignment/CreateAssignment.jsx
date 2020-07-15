import React, { useState, useEffect } from "react";
import {Rubrics} from '../../services/rubrics'
import {Classrooms} from '../../services/classrooms'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AssignmentForm from '../../components/AssignmentForm/AssignmentForm'
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 'auto-fit',
        '& > *': {
            margin: theme.spacing(5),
            height: 'auto-fit',
            padding: theme.spacing(10),
        },
    },
    title: {
        marginBottom: '15px',
    },
    blankPageTitle: {
        margin: theme.spacing(15),
        color: '#455A64',
        textAlign: 'center'
    }
}));

export default function CreateAssignment() {
  const classes = useStyles();
  const [assignmentFormPageState, setAssignmentFormPageState] = useState({
    assignmentFormPage: <h1 className={classes.blankPageTitle}> Espere un momento... </h1>,
  });

  useEffect(() => {
    async function getRubricsAndClassrooms() {
      try {
        const rubrics = await Rubrics.index()
        if(rubrics.statusCode === '404'){
            setAssignmentFormPageState({ 
                assignmentFormPage: <h1 className={classes.blankPageTitle}> 
                Aun no tienes rúbricas. Sin rúbricas no podrás crear asignaciones.
            </h1> });
        } else {
            const classrooms = await Classrooms.indexTeacher()
            if(classrooms.statusCode === '404'){
                setAssignmentFormPageState({ 
                    assignmentFormPage: <h1 className={classes.blankPageTitle}> 
                    Aun no tienes aulas. Sin aulas no podrás crear asignaciones.
                </h1> });
            } else {
                setAssignmentFormPageState({ assignmentFormPage: 
                <AssignmentForm rubrics={rubrics} classrooms={classrooms}></AssignmentForm> });
            }
        }
      } catch (e) {
        setAssignmentFormPageState({ assignmentFormPage: <h1 className={classes.blankPageTitle}> Ocurrió un error</h1> });
      }
    }
    getRubricsAndClassrooms();
  }, []);
  return (
    <div className={classes.root}>
    <Paper>
      <Typography variant="h3" component="h3" className={classes.title}>
        Crear Asignación
      </Typography>
        {assignmentFormPageState.assignmentFormPage}
      </Paper>
    </div>
  );
}