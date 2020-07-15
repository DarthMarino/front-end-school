import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./classRoom.css";
import { InputGroup, FormControl } from "react-bootstrap";
import {Classrooms} from '../../services/classrooms'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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
  },
  blankPageTitle: {
      margin: theme.spacing(15),
      color: '#455A64',
      textAlign: 'center'
  }
}));


export default function CreateClassRoom(props)  {
  const classes = useStyles();
  const [state, setState] = useState({
    name: '',
    description: '',
    error: false
  });
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
                Se ha creado el aula.
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
  const handleSubmitClassroom = async (e) => {
    e.preventDefault();
    const { name, description } = state;
    const body = { name, description };
    try {
      await Classrooms.create(body)
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
  };
  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value, error: false });
  };
  return (
    <div className={classes.root}>
    <Paper>
      <Typography variant="h3" component="h3" className={classes.title}>
        Crear Aula
      </Typography>
        <form>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Nombre del aula:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="name"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Aula"
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Descripción</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="description"
              as="textarea"
              aria-label="With textarea"
              placeholder="Escriba una breve descripción para la nueva aula"
              onChange={handleChange}
            />
          </InputGroup>

          <hr />
          <Link to="/classrooms">
            <button
              onClick={handleSubmitClassroom}
              type="submit"
              className="btn btn-outline-primary btn-block"
            >
              Crear aula
            </button>
          </Link>
          <hr />
          <Link to={"/classrooms"}>
            <button className="btn btn-outline-success btn-block">
              Ver aulas
            </button>
          </Link>
        </form>
      </Paper>
      {showSnackBar(values.showSuccessSnackBar, values.showErrorSnackBar)}
    </div>
    );
}
