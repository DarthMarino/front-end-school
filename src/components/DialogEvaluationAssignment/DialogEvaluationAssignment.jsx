import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CommentsBox from '../CommentsBox/CommentsBox'
import {Evaluations} from '../../services/evaluations'
import InformationTableAssignment from '../InformationTableAssignment/InformationTableAssignment'
import EvaluationTable from '../EvaluationTable/EvaluationTable'

const moment = require('moment')

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(7),
    marginBottom: theme.spacing(7),
    padding: 50
  },
  headers: {
    marginLeft: 15,
    marginBottom: 5
  }
}));

export default function DialogEvaluationAssignment(props) {
  const assignment= props.assignment
  const getDate = (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a')
  const classes = useStyles();
  const [evaluationState, setEvaluationState] = useState({
    evaluation: {
      otherEvaluationData: {},
      evaluationData: []
    },
    error: false
  });

  useEffect(() => {
    async function getEvaluation() {
      try {
        const evaluation = await Evaluations.indexEvaluationDetail(assignment._id)
        if(evaluation.statusCode === '404'){
            setEvaluationState({...evaluationState, error: '404'})
        } else {
            setEvaluationState({evaluation, error: '200'})
        }
      } catch (e) {
        setEvaluationState({...evaluationState, error: '400'})
      }
    }
    getEvaluation();
  }, []);

  const getError = () => {
    if (evaluationState.error === '404') {
      return <h1> Aún no tienes evaluaciones</h1>
    }
    return <h1> Ocurrió un error </h1>
  }
  
  const rowsResultsEvaluation = [
      {
          name: 'Puntos perdidos por tiempo de retraso',
          description: evaluationState.evaluation.otherEvaluationData.missedPointsDelay
      }, {
          name: 'Calificación de la evaluación',
          description: evaluationState.evaluation.otherEvaluationData.grade
      }, {
          name: 'Calificación total obtenida',
          description: evaluationState.evaluation.otherEvaluationData.finalGrade
      }, {
          name: 'Calificación base',
          description: evaluationState.evaluation.otherEvaluationData.baseScore
      }, {
          name: 'Puntuación mínima de la rúbrica',
          description: evaluationState.evaluation.otherEvaluationData.minScore
      }, {
          name: 'Puntuación máxima de la rúbrica',
          description: evaluationState.evaluation.otherEvaluationData.maxScore
      }
  ] 

  return (
    <div className={classes.root}> 
      {
        (evaluationState.error == '200')?
        <div>
        <Typography variant="h3" component="h2" className={classes.headers}>
          {assignment.title}
        </Typography>
        <div style={{marginTop: 15, marginLeft: 40}}>
          <Typography variant="body2" component="h2" color="textSecondary">
            Aula: {assignment.classroom.name}
          </Typography>
          <Typography variant="body2" component="h2" color="textSecondary">
            Fecha de evaluación: {getDate(evaluationState.evaluation.otherEvaluationData.evaluationDate)}
          </Typography>
        </div>
        <div style={{marginTop: 25}}>
          <Typography variant="h5" component="h2" color="textSecondary" className={classes.headers}>
                Resultados de la evaluación
          </Typography>
          <InformationTableAssignment 
          rows={rowsResultsEvaluation} 
          headers={[
            'Nombre',
            'Valor'
        ]}/>
        </div>
        <div style={{marginTop: 50}}>
          <EvaluationTable rows={evaluationState.evaluation.evaluationData}></EvaluationTable>
        </div>
        <div style={{marginTop: 50}}>
          <Typography variant="h5" component="h2" color="textSecondary" className={classes.headers}>
              Comentarios de la evaluación
          </Typography>
          <CommentsBox comment={evaluationState.evaluation.otherEvaluationData.comment}/>
        </div>
        </div>
        : getError()
      }
    </div>
  );
}