import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';

import CommentsBox from '../CommentsBox/CommentsBox'
import ListAssignment from '../ListAssignment/ListAssignment'
import ContextAssignment from '../ContextAssignment/ContextAssignment'
import InformationTableAssignment from '../InformationTableAssignment/InformationTableAssignment'
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

export default function DialogDetailAssignment(props) {
  const getDate = (date) => moment(date).format('MMMM Do YYYY, h:mm:ss a')
  const assignment = props.assignment
  const classes = useStyles();
  const rowsInformationAssignment = [
      {
          name: 'Puntuación base',
          description: assignment.baseScore
      }, {
          name: 'Fecha de apertura',
          description: getDate(assignment.openingDate)
      }, {
          name: 'Fecha de entrega',
          description: getDate(assignment.deliveryDate)
      }, {
          name: 'Fecha de cierre',
          description: getDate(assignment.deadline)
      }, {
          name: 'Puntos a descontar por retraso',
          description: assignment.missedPointsDelay
      }, {
          name: 'Unidad de tiempo por retraso',
          description: assignment.delayTimeUnit
      }
  ]
  const rowsDeliverableRequirements = [
      {
          name: 'Tipo de documento',
          description: assignment.documentType
      }, {
          name: 'Formato de referencias',
          description: assignment.format
      }, {
          name: 'Mínimo de referencias',
          description: assignment.minReferences
      }
  ]
  const rowsDeliverableSections = assignment.documentSections.map((documentSection) => {
    return {
      name: documentSection.name,
      description: `${documentSection.minExtension} - ${documentSection.maxExtension}`
    }
  })
  return (
    <div className={classes.root}> 
        <Typography variant="h3" component="h2" className={classes.headers}>
          {assignment.title}
        </Typography>
        <div style={{marginTop: 15, marginLeft: 40}}>
          <Typography variant="body2" component="h2" color="textSecondary">
            Aula: {assignment.classroom.name}
          </Typography>
          <Typography variant="body2" component="h2" color="textSecondary">
            Tiempo estimado para completar la asignación: {assignment.estimatedTime} hora
          </Typography>
        </div>
        <div style={{marginTop: 15}}>
        <Typography variant="h5" component="h2" className={classes.headers}>
          Tema: {assignment.topic}
        </Typography>
        </div>
        <div style={{marginTop: 15}}>
        <ListAssignment 
          listOptions={{
            title: 'Objetivos de aprendizaje',
            fieldName: 'objective',
            icon: <LabelImportantIcon />
        }} 
          items={assignment.learningObjectives} />
        </div>
        <div style={{marginTop: 15}}>
          <ContextAssignment context={assignment.context}/>
        </div>
        <div style={{marginTop: 50}}>
          <Typography variant="h5" component="h2" color="textSecondary" className={classes.headers}>
                Información sobre la entrega
          </Typography>
          <InformationTableAssignment 
          rows={rowsInformationAssignment} 
          headers={[
            'Categoría',
            'Descripción'
          ]}/>
        </div>
        <div style={{marginTop: 50}}>
          <Typography variant="h5" component="h2" color="textSecondary" className={classes.headers}>
              Requisitos del entregable
          </Typography>
          <InformationTableAssignment 
          rows={rowsDeliverableRequirements}
          headers={[
            'Categoría',
            'Descripción'
        ]}/>
        </div>
        <div style={{marginTop: 50}}>
          <InformationTableAssignment 
          rows={rowsDeliverableSections} 
          headers={[
            'Partes del entregable',
            'Extensión (páginas)'
          ]}/>
        </div>
        <div style={{marginTop: 50}}>
          <ListAssignment 
          listOptions={{
            title: 'Fuentes de investigación no permitidas',
            fieldName: 'source',
            icon: <LabelIcon />
          }} 
          items={assignment.bannedSources} />
        </div>
        <Typography variant="h5" component="h2" color="textSecondary" className={classes.headers}>
            Comentarios del docente
        </Typography>
        <CommentsBox comment={assignment.comment}/>
    </div>
  );
}