import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Rubrics} from '../../services/rubrics'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    }
  }));

export default function CreateRubric() {
  const classes = useStyles();

  const [values, setValues] = useState({
    showSuccessSnackBar: false,
    showErrorSnackBar: false
  });

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [basicInformationState, setBasicInformationState] = useState({ name: '', description: '' });
  const [scoreLimitsState, setScoreLimitsState] = useState({ minScore: 0, maxScore: 0 });

  const [evaluativeCriteriaState, setEvaluativeCriteriaState] = useState([{
    name: '',
    weight: 0,
    evaluativeCriteriaDetail: [
      {
        score: 0, 
        qualityDefinition: ''
      }
    ]
  }])

  const handleBasicInformation = (e) => setBasicInformationState({
    ...basicInformationState,
    [e.target.name]: e.target.value
  })
  const handleScoreLimits = (e) => {
    const newMaxScore = parseInt(e.target.value)
    const currentMaxScore = scoreLimitsState.maxScore
    if(newMaxScore < 0 || !e.target.value) {
      return
    }
    if(newMaxScore < currentMaxScore) {
      const newEvaluativeCriteria = [...evaluativeCriteriaState];
      const sz = newEvaluativeCriteria.length
      for(let idx = 0; idx < sz; idx++) {
        newEvaluativeCriteria[idx].evaluativeCriteriaDetail = 
        newEvaluativeCriteria[idx].evaluativeCriteriaDetail.slice(0, newMaxScore + 1)
        if(idx === sz - 1) {
          setEvaluativeCriteriaState(newEvaluativeCriteria)
        }
      }
    }
    if (newMaxScore > currentMaxScore) {
      const updatedEvaluativeCriteria = [...evaluativeCriteriaState];
      const sz = evaluativeCriteriaState.length
      updatedEvaluativeCriteria.forEach((criterion, idx) => {
        for(let x = currentMaxScore; x < newMaxScore; x++) {
          criterion.evaluativeCriteriaDetail.push({score: x + 1, qualityDefinition: ''})
        }
        if(idx === sz - 1) {
          setEvaluativeCriteriaState(updatedEvaluativeCriteria)
        }
      })
    }
    setScoreLimitsState({
      ...scoreLimitsState,
      [e.target.name]: parseInt(e.target.value)
    }) 
  }
  const addEvaluativeCriterion = () => {
    const newEvaluativeCriteriaDetail = []
    const maxScore = scoreLimitsState.maxScore
    for(let x = 0; x <= maxScore; x ++) {
      newEvaluativeCriteriaDetail.push({
        score: x, 
        qualityDefinition: ''
      })
      if (x === maxScore) {
        setEvaluativeCriteriaState(
          [...evaluativeCriteriaState, {
          name: '',
          weight: 0,
          evaluativeCriteriaDetail: newEvaluativeCriteriaDetail
        }])
      }
    }
  }
  const handleEvaluativeCriteriaChange = (e) => {
    const updatedEvaluativeCriteria = [...evaluativeCriteriaState];
    updatedEvaluativeCriteria[e.target.dataset.idxy].evaluativeCriteriaDetail[e.target.dataset.idxx].qualityDefinition = e.target.value;
    setEvaluativeCriteriaState(updatedEvaluativeCriteria);
  };

  const handleEvaluativeCriteriaNameChange = (e) => {
    const updatedEvaluativeCriteria = [...evaluativeCriteriaState];
    updatedEvaluativeCriteria[e.target.dataset.idx].name = e.target.value;
    setEvaluativeCriteriaState(updatedEvaluativeCriteria);
  }
  const handleEvaluativeCriteriaWeightChange = (e) => {
    if (e.target.value < 0 || !e.target.value) {
      return
    }
    const updatedEvaluativeCriteria = [...evaluativeCriteriaState];
    updatedEvaluativeCriteria[e.target.dataset.idx].weight = e.target.value;
    setEvaluativeCriteriaState(updatedEvaluativeCriteria);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      ...basicInformationState,
      ...scoreLimitsState,
      evaluativeCriteria: [...evaluativeCriteriaState]
    }
    try {
      await Rubrics.create(data)
      // snackBar success
      setValues({
        ...values, 
        showSuccessSnackBar: true,
        showErrorSnackBar: false
      })
    } catch (e) {
      // snackbar fail
      setValues({
        ...values, 
        showSuccessSnackBar: false,
        showErrorSnackBar: true
      })
    }
    handleClick()
  }
  const showSnackBar = (success, fail) => {
    if(success) {
      return <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Se ha creado la rúbrica.
              </Alert>
            </Snackbar>
    } else if (fail) {
      return <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                Ha ocurrido un error.
              </Alert>
            </Snackbar>
    }
  }

  const handleDeleteEvaluativeCriteria = (e) => {
    const newEvaluativeCriteria = [...evaluativeCriteriaState]
    const index = e.target.dataset.idx
    if (index > -1) {
        newEvaluativeCriteria.splice(index, 1);
    }
    setEvaluativeCriteriaState(newEvaluativeCriteria)
  }

  return (
    <div className={classes.root}>
      <Paper>
        <Typography variant="h3" component="h3" className={classes.title}>
          Crear Rúbrica
        </Typography>
        <Form>
            <Form.Group controlId="RubricForm.RubricName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control 
                type="text" 
                onChange={handleBasicInformation}
                value={basicInformationState.name}
                name="name" 
                placeholder="Escribe el nombre de tu rúbrica" />
            </Form.Group>

            <Form.Group controlId="RubricForm.RubricDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control as="textarea" 
                rows="2" 
                onChange={handleBasicInformation} 
                value={basicInformationState.description} 
                name="description"
                placeholder="Escribe una breve descripción..."/>
            </Form.Group>
            <Form.Group controlId="RubricForm.maxScore">
                <Form.Label>Puntuación máxima</Form.Label>
                <Form.Control 
                type="number"
                name="maxScore"
                value={scoreLimitsState.maxScore}
                onChange={handleScoreLimits}/>
            </Form.Group>
            <Button variant="info" onClick={addEvaluativeCriterion}> Agrega un criterio</Button> {' '}
            <br/>
            <br/>
            {
                evaluativeCriteriaState.map((evaluativeCriteria, idxEvaluativeCriteria) => {
                const criterionId = `criterion-${idxEvaluativeCriteria}`;
                return (
                    <div key={criterionId}>
                    {/* CRITERIO */}
                    <Form.Group>
                        <Form.Label style={{fontSize: 20}}>{`Criterio ${idxEvaluativeCriteria + 1}`}</Form.Label>
                        <Button 
                        data-idx={idxEvaluativeCriteria}
                        type="button"
                        onClick={handleDeleteEvaluativeCriteria}
                        variant="outline-secondary"
                        style={{float:"right"}}>Eliminar</Button>
                        <br/>  <br/>
                        <Form.Control 
                        type="text"
                        name="name"
                        id={criterionId}
                        data-idx={idxEvaluativeCriteria}
                        value={evaluativeCriteria.name}
                        onChange={handleEvaluativeCriteriaNameChange}
                        placeholder="Nombre del criterio de evaluación"/>
                        <br />
                        <Form.Label>Peso del criterio de evaluación</Form.Label>
                        <Form.Control 
                        type="number"
                        name="weight"
                        id={`${criterionId}-weight`}
                        data-idx={idxEvaluativeCriteria}
                        value={evaluativeCriteria.weight}
                        onChange={handleEvaluativeCriteriaWeightChange}
                        placeholder="Peso del criterio de evaluación"/>
                    </Form.Group>
                    {/* Descripcion del criterio para cada score */}
                    {
                        evaluativeCriteria.evaluativeCriteriaDetail.map((val, idx) => {
                        const criteriaId = `criteria-${idxEvaluativeCriteria}-${idx}`;
                        return (
                            <InputGroup className="mb-3" key={criteriaId}>
                            <InputGroup.Prepend>
                                <InputGroup.Text id={criteriaId}>{`${val.score}`}</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="text"
                                name="qualityDefinition" // OJO TIENE QUE SER UNICO? USA CLASS NAME
                                data-idxy={idxEvaluativeCriteria}
                                data-idxx={idx} 
                                id={criteriaId}
                                value={val.qualityDefinition}
                                onChange={handleEvaluativeCriteriaChange}
                                placeholder={`Definición de calidad para puntuación de ${val.score}`}
                            />
                            </InputGroup>
                        );      
                        })
                    }
                    </div>
                )
                })
            }
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Crear Rúbrica
            </Button>
            </Form>
      </Paper>
      {showSnackBar(values.showSuccessSnackBar, values.showErrorSnackBar)}
    </div>
  );
}