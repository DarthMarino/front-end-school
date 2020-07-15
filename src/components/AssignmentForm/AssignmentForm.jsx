import React, { useState } from 'react'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import DateTimePicker from 'react-datetime-picker';
import {documentTypes, formats, delayTimeUnits} from '../../utils/constants'
import {Assignments} from '../../services/assignments'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AssignmentForm(props) {
    const classrooms = props.classrooms
    const rubrics = props.rubrics
    const [assignmentInformationState, setAssignmentInformationState] = useState({
        title: '',
        topic: '',
        context: '',
        estimatedTime: 1,
        learningObjectives: [
            {
                objective: ''
            }
        ]
    });
    const [datesState, setDatesState] = useState({
        openingDate: new Date(),
        deliveryDate: new Date(),
        deadline: new Date(),
    });
    const [deliverableInformationState, setDeliverableInformationState] = useState({
        baseScore: 10,
        missedPointsDelay: 0,
        delayTimeUnit: delayTimeUnits[0],
        minReferences: 0,
        comment: '',
        documentType: documentTypes[0],
        format: formats[0],
        rubric: rubrics[0]._id,
        classroom: classrooms[0]._id
    })
    const [documentSectionsState, setDocumentSectionsState] = useState([
        {
            name: '',
            minExtension: 1,
            maxExtension: 1
        }
    ])
    const [bannedSourcesState, setBannedSourcesState] = useState([
        {
            source: ''
        }
    ])

    //***********Snackbar */
    const [values, setValues] = useState({
        showSuccessSnackBar: false,
        showErrorSnackBar: false
    });
    const [open, setOpen] = useState(false);
    const handleClick = () => setOpen(true);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const showSnackBar = (success, fail) => {
        if(success) {
        return <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Se ha creado la asignación.
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
  //***********Snackbar */

    // Section: "Información sobre la asignación" handlers
    
    const handleTextFieldChange = (e) => {
        setAssignmentInformationState({ ...assignmentInformationState, [e.target.name]: e.target.value })
    }
    const handleEstimatedTimeChange = (e) => {
        const newEstimatedTime = parseInt(e.target.value)
        if (newEstimatedTime > 0) {
            setAssignmentInformationState({
                ...assignmentInformationState, 
                estimatedTime: newEstimatedTime
            })   
        }
    }
    const handleLearningObjectivesChange = (e) => {
        const updatedLearningObjectives = [...assignmentInformationState.learningObjectives];
        updatedLearningObjectives[e.target.dataset.idx].objective = e.target.value;
        setAssignmentInformationState({
            ...assignmentInformationState,
            learningObjectives: updatedLearningObjectives
        })
    }
    const addLearningObjective = () => {
        const newLearningObjectives = [...assignmentInformationState.learningObjectives]
        newLearningObjectives.push( { objective: '' } )
        setAssignmentInformationState({
            ...assignmentInformationState,
            learningObjectives: newLearningObjectives
        })
    }
    const handleDeleteLearningObjectives = (e) => {
        const newLearningObjectives = [...assignmentInformationState.learningObjectives]
        const index = newLearningObjectives.map((objective) => objective.objective).indexOf(assignmentInformationState.learningObjectives[e.target.dataset.idx].objective);
        if (index > -1) {
            newLearningObjectives.splice(index, 1);
        }
        setAssignmentInformationState({
            ...assignmentInformationState,
            learningObjectives: newLearningObjectives
        })
    }

    // Section: "Datos de la entrega" handlers
    const handleBaseScoreChange  = (e) => {
        const newBaseScore = parseInt(e.target.value)
        if (newBaseScore > 0) {
            setDeliverableInformationState({
                ...deliverableInformationState, 
                baseScore: newBaseScore
            })   
        }
    }
    const missedPointsDelayHandler = (e) => {
        const missedPointsDelay = parseInt(e.target.value)
        if (missedPointsDelay < 0 || !e.target.value) {
            return
        }
        setDeliverableInformationState({
            ...deliverableInformationState, 
            missedPointsDelay: missedPointsDelay
        })
    }
    const handleDropdownChange  = (e) => {
        if (e.target.value) {
            let propName = e.target.className
            if (propName.startsWith('rubric')) {
                propName = 'rubric'
            }
            if (propName.startsWith('classroom')) {
                propName = 'classroom'
            }
            setDeliverableInformationState({
                ...deliverableInformationState, 
                [propName]: e.target.value
            })   
        }
    }
    // Section: "Requisitos del entregable" handlers
    const handleMinReferencesChange = (e) => {
        const newMinReferences = parseInt(e.target.value)
        if (newMinReferences >= 0) {
            setDeliverableInformationState({
                ...deliverableInformationState, 
                minReferences: newMinReferences
            })   
        }
    }
    const handledocumentSectionExtension = (e) => {
        const value = parseInt(e.target.value)
        let minExtension = (e.target.name === 'minExtension')? value : documentSectionsState[e.target.dataset.idx].minExtension
        let maxExtension = (e.target.name === 'maxExtension')? value : documentSectionsState[e.target.dataset.idx].maxExtension
        if (minExtension <= maxExtension && minExtension > 0 && maxExtension > 0) {
            const newDocumentSections = [...documentSectionsState]
            newDocumentSections[e.target.dataset.idx].minExtension = minExtension
            newDocumentSections[e.target.dataset.idx].maxExtension = maxExtension
            setDocumentSectionsState(newDocumentSections)
        }
    }
    const handledocumentSectionName = (e) => {
        const newDocumentSections = [...documentSectionsState]
        newDocumentSections[e.target.dataset.idx].name = e.target.value
        setDocumentSectionsState(newDocumentSections)
    }
    const addDocumentSection = (e) => {
        const newDocumentSections = [...documentSectionsState]
        newDocumentSections.push( {
            name: '',
            minExtension: 1,
            maxExtension: 1
        })
        setDocumentSectionsState(newDocumentSections)
    }

    //  TODO: reuse banned source code
    const handleBannedSourceChange = (e) => {
        const updatedBannedSources = [...bannedSourcesState];
        updatedBannedSources[e.target.dataset.idx].source = e.target.value;
        setBannedSourcesState(updatedBannedSources)
    }
    const addBannedSource = () => {
        const newBannedSources = [...bannedSourcesState];
        newBannedSources.push( { source: '' } )
        setBannedSourcesState(newBannedSources)
    }
    const handleDeleteBannedSource = (e) => {
        const newBannedSources = [...bannedSourcesState];
        const index = newBannedSources.map((source) => source.source).indexOf(bannedSourcesState[e.target.dataset.idx].source);
        if (index > -1) {
            newBannedSources.splice(index, 1);
        }
        setBannedSourcesState(newBannedSources)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            ...assignmentInformationState,
            ...datesState,
            ...deliverableInformationState,
            documentSections: [...documentSectionsState],
            bannedSources: [...bannedSourcesState]
        }
        try {
            await Assignments.create(data)
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
    return <div>
        <Form>
        <h3> Información sobre la asignación </h3>
        <Form.Group controlId="AssignmentForm.Name">
            <Form.Label> Nombre </Form.Label>
            <Form.Control type="text" onChange={handleTextFieldChange} name="title" 
            value={assignmentInformationState.title}/>
            <Form.Text className="text-muted">
                Elige un nombre simple e identificable.
            </Form.Text>
        </Form.Group>
        <Form.Group controlId="AssignmentForm.Topic">
            <Form.Label> Tema </Form.Label>
            <Form.Control type="text" onChange={handleTextFieldChange} name="topic" 
            value={assignmentInformationState.topic}/>
            <Form.Text className="text-muted">
                ¿De qué trata la asignación?
            </Form.Text>
        </Form.Group>
        <Form.Group controlId="AssignmentForm.Context">
            <Form.Label>Contexto de la asignación</Form.Label>
            <Form.Control as="textarea" rows="3" onChange={handleTextFieldChange} name="context"
            value={assignmentInformationState.context}
            placeholder="Aquí debes agregar una descripción que instruya a los alumnos con respecto a la relación de la asignación con los temas vistos en clase"/>
        </Form.Group>
        <Form.Group controlId="RubricForm.EstimatedTime">
            <Form.Label>Tiempo estimado para completar la asignación</Form.Label>
            <Form.Control 
                type="number"
                name="estimatedTime"
                value={assignmentInformationState.estimatedTime}
                onChange={handleEstimatedTimeChange}/>
        </Form.Group>
        <br/>
        <h5> Objetivos de aprendizaje </h5>
        <h6 style={{color:'gray'}}> ¿Qué se pretende lograr con la asignación? </h6>
        <br/>
        {
            assignmentInformationState.learningObjectives.map((objective, idx) => {
                const objectiveId = `objective-${idx}`;
                return (
                    <div key={objectiveId}>
                        <InputGroup className="mb-3">
                            <FormControl
                                aria-label={`Objetivo #${idx + 1}`}
                                aria-describedby="basic-addon2"
                                placeholder={`${idx + 1}`}
                                type="text"
                                name="objective"
                                id={objectiveId}
                                data-idx={idx}
                                value={objective.objective}
                                onChange={handleLearningObjectivesChange}
                            />
                            <InputGroup.Append>
                            <Button 
                                data-idx={idx}
                                type="button"
                                onClick={handleDeleteLearningObjectives}
                                variant="outline-secondary">Eliminar</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                )
            })
        }
        <Button variant="info" onClick={addLearningObjective}> Agrega un objetivo </Button> {' '}
        <br/>
        <br/>

        <h3> Datos de la entrega </h3>
        <Form.Group controlId="AssignmentForm.ClassroomsSelect">
            <Form.Label>Aula</Form.Label>
            <Form.Control as="select" className="classroom" onChange={handleDropdownChange}>
                {
                    classrooms.map(classroom => 
                    <option
                        value={classroom._id}
                        key={classroom._id}>
                            {classroom.name}</option>)
                }
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="AssignmentForm.RubricsSelect">
            <Form.Label>Rúbrica</Form.Label>
            <Form.Control as="select" className="rubric" 
            onChange={handleDropdownChange}>
                {
                    rubrics.map(rubric => 
                    <option 
                        value={rubric._id}
                        key={rubric._id}>
                            {rubric.name}</option>)
                }
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="AssignmentForm.BaseScore">
            <Form.Label>Puntuación Base</Form.Label>
            <Form.Control 
                type="number"
                name="baseScore"
                value={deliverableInformationState.baseScore}
                onChange={handleBaseScoreChange}/>
        </Form.Group>
        <Row>
            <Col>
                <Form.Group controlId="AssignmentForm.missedPointsDelay">
                    <Form.Label> Puntos perdidos por unidad de tiempo de retraso </Form.Label>
                    <Form.Control 
                        type="number"
                        name="missedPointsDelay"
                        value={deliverableInformationState.missedPointsDelay}
                        placeholder="Puntos perdidos por unidad de tiempo de retraso"
                        onChange={missedPointsDelayHandler}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="AssignmentForm.delayTimeUnit">
                    <Form.Label> Unidad de tiempo de retraso </Form.Label>
                    <Form.Control as="select" placeholder="Unidad de tiempo de retraso" 
                        value={deliverableInformationState.delayTimeUnit} 
                        onChange={(e) => setDeliverableInformationState({...deliverableInformationState, delayTimeUnit: e.target.value})}>
                        {delayTimeUnits.map((timeUnit) => { return <option key={timeUnit}>{timeUnit}</option>})}
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Form.Label>Fecha de apertura</Form.Label><br />
        <DateTimePicker
            disableClock={true}
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="minute"
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={(date) => setDatesState({...datesState, openingDate: date})}
            value={datesState.openingDate}
            className="openingDate"
        />
        <br /><br />
        <Form.Label>Fecha de entrega</Form.Label><br />
        <DateTimePicker
            disableClock={true}
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="minute"
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={(date) => setDatesState({...datesState, deliveryDate: date})}
            value={datesState.deliveryDate}
            className="deliveryDate"
        />
        <br /><br />
        <Form.Label>Fecha de cierre</Form.Label><br />
        <DateTimePicker
            disableClock={true}
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="minute"
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={(date) => setDatesState({...datesState, deadline: date})}
            value={datesState.deadline}
            className="deadline"
        />


        <br/>
        <br/>

        <h3> Requisitos del entregable </h3>
        <Form.Group controlId="AssignmentForm.DocumentType">
            <Form.Label>Tipo de documento</Form.Label>
            <Form.Control as="select" 
            value={deliverableInformationState.documentType}
            onChange={(e) => setDeliverableInformationState({...deliverableInformationState, documentType: e.target.value})}>
                {
                    documentTypes.map((documentType, index) => <option key={index}>{documentType}</option>)
                }
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="AssignmentForm.DocumentType">
            <Form.Label>Estilo de referencias</Form.Label>
            <Form.Control as="select" 
            value={deliverableInformationState.format}
            onChange={(e) => setDeliverableInformationState({...deliverableInformationState, format: e.target.value})}>
                {
                    formats.map((format, index) => <option key={index}>{format}</option>)
                }
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="AssignmentForm.MinReferences">
            <Form.Label>Mínimo de referencias</Form.Label>
            <Form.Control 
                type="number"
                name="minReferences"
                value={deliverableInformationState.minReferences}
                onChange={handleMinReferencesChange}/>
        </Form.Group>
        <h5> Partes del entregable </h5>
        <Row>
            <Col>
                <h6> Nombre </h6>
            </Col>
            <Col>
                <h6> Extensión mínima</h6>
            </Col>
            <Col>
                <h6> Extensión máxima</h6>
            </Col>
        </Row>
        {
        documentSectionsState.map((documentSection, idx) => {
          const nameId = `name-${idx}`;
          const minExtensionId = `minExtension-${idx}`;
          const maxExtensionnId = `maxExtension-${idx}`;
          return (
            <div key={nameId}>
                <Form.Row>
                    <Col>
                        <Form.Control 
                            type="text"
                            name="name"
                            id={nameId}
                            data-idx={idx}
                            value={documentSection.name}
                            onChange={handledocumentSectionName}
                            placeholder="Nombre de la sección"/>
                    </Col>
                    <Col>
                        <Form.Control 
                            id={minExtensionId}
                            type="number"
                            name="minExtension"
                            data-idx={idx}
                            value={documentSection.minExtension}
                            onChange={handledocumentSectionExtension}/>
                    </Col>
                    <Col>
                        <Form.Control 
                            id={maxExtensionnId}
                            type="number"
                            name="maxExtension"
                            data-idx={idx}
                            value={documentSection.maxExtension}
                            onChange={handledocumentSectionExtension}/>
                    </Col>
                </Form.Row>
                <br/>
            </div>
          )
        })
    }
    <br/>
    <Button variant="info" onClick={addDocumentSection}> Agrega una sección </Button> {' '}
        <br/>
        <br/>
    <h5> Fuentes de investigación no permitidas </h5>
    <br/>
        {
            bannedSourcesState.map((source, idx) => {
                const sourceId = `source-${idx}`;
                return (
                    <div key={sourceId}>
                        <InputGroup className="mb-3">
                            <FormControl
                                aria-label={`Recurso #${idx + 1}`}
                                aria-describedby="basic-addon2"
                                placeholder={`${idx + 1}`}
                                type="text"
                                name="source"
                                id={sourceId}
                                data-idx={idx}
                                value={source.source}
                                onChange={handleBannedSourceChange}
                            />
                            <InputGroup.Append>
                            <Button 
                                data-idx={idx}
                                type="button"
                                onClick={handleDeleteBannedSource}
                                variant="outline-secondary">Eliminar</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                )
            })
        }
        <Button variant="info" onClick={addBannedSource}> Agrega una otra fuente </Button> {' '}
        <br/>
        <br/>
    <Form.Group controlId="AssignmentForm.Comment">
        <Form.Label>Comentarios</Form.Label>
        <Form.Control as="textarea" 
          rows="3" 
          onChange={(e) => setDeliverableInformationState({...deliverableInformationState, comment: e.target.value})} 
          value={deliverableInformationState.comment} 
          name="comment"
          placeholder="¿Necesitas especificar algo más?"/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Crear Asignación
      </Button>
    </Form>
    {showSnackBar(values.showSuccessSnackBar, values.showErrorSnackBar)}
    </div>
}