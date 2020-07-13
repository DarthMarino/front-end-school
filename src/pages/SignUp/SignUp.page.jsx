import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Users} from '../../services/users'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  withoutLabel: {
    marginBottom: theme.spacing(3),
  }
}));


export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    lastName: '',
    email: '', 
    username: '',
    password: '',
    showPassword: false,
    showSuccessSnackBar: false,
    showErrorSnackBar: false
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      password: values.password,
    }
    // todo: fields show error when empty?
    try {
      await Users.create(data)
      // snackBar success
      setValues({
        ...values, 
        showSuccessSnackBar: true,
        showErrorSnackBar: false
      })
    } catch (e) {
      // snackBar error
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
                Se ha creado el usuario.
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

  return (
    <form>
      <h3>Registrarse</h3>
        <TextField
          className={classes.withoutLabel}
          fullWidth={true}
          id="outlined-basic" 
          label="Nombre" 
          variant="outlined"
          onChange={handleChange('name')}/>
        <TextField
          className={classes.withoutLabel}
          fullWidth={true}
          id="outlined-basic" 
          label="Apellido" 
          variant="outlined"
          onChange={handleChange('lastName')}/>
        <TextField
          className={classes.withoutLabel}
          fullWidth={true}
          id="outlined-basic" 
          label="Correo Electrónico" 
          variant="outlined"
          onChange={handleChange('email')}/>
        <TextField
          className={classes.withoutLabel}
          fullWidth={true}
          id="outlined-basic" 
          label="Nombre de usuario" 
          variant="outlined"
          onChange={handleChange('username')} />
      <FormControl variant="outlined" fullWidth={true}>
        <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
        <OutlinedInput
          className={classes.withoutLabel}
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={100}
        />
      </FormControl>
      <button 
      type="submit" 
      className="btn btn-primary btn-block"
      onClick={handleSubmit}>
        Registrarse
      </button>

      <p className="forgot-password text-right">
        Ya tienes una cuenta con nosotros?{" "}
        <Link to="/sign-in">Entra aquí</Link>
      </p>
      {showSnackBar(values.showSuccessSnackBar, values.showErrorSnackBar)}
    </form>
  );
}
