import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios'
const FileDownload = require('js-file-download');

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none'
    }
  }));

export default function DialogDeliverAssignment(props) {
  const assignment = props.assignment
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [deliverableState, setDeliverableState] = useState({
    deliverable: null
  });

const onSubmitDeliverable = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('file', deliverableState.deliverable)
    const url = 'http://localhost:5000'
    axios.post(`${url}/deliverables/assignment/${assignment._id}`, data, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem("userToken")}` },
      responseType: 'arraybuffer'
    }).then(function(response) {
        console.log("Everything went well")
    }).catch(function(error) {
      console.log('Errorrrrr!!', error);
    });
}

const getDeliverable = (e) => {
    const url = 'http://localhost:5000'
    axios.get(`${url}/deliverables/assignment/${assignment._id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("userToken")}` },
        responseType: 'arraybuffer'
    }).then((response) => {
        console.log(response.data)
        FileDownload(response.data, `${assignment.title}.pdf`);
    }).catch(function(error) {
        console.log('Errorrrrr!!', error);
    })
}


  return (
    <div>
      <MenuItem onClick={handleClickOpen}>Entrega</MenuItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{assignment.title}</DialogTitle>
        <DialogContent className={classes.root}>
            <input
                accept=".pdf"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => setDeliverableState({deliverable: e.target.files[0]})}
            />
            <label htmlFor="contained-button-file">
                <Button 
                  variant="contained" color="primary" component="span">
                    Subir Archivo
                </Button>
            </label>
            <Button
              onClick={getDeliverable} 
              variant="contained" 
              color="secondary">
                Descargar
            </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={onSubmitDeliverable} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
