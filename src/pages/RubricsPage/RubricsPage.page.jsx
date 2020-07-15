import React, { useState, useEffect } from "react";
import RubricList from "../../components/RubricList/RubricList.component";
import {Rubrics} from '../../services/rubrics'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    maxWidth: 'auto-fit',
    '& > *': {
      margin: theme.spacing(5),
      height: 'auto-fit',
      padding: theme.spacing(10),
    },
  },
  button: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  containerRubricList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "center",
  },
  blankPageTitle: {
    margin: theme.spacing(15),
    color: '#455A64',
    textAlign: 'center'
  }
}));

export default function RubricsPage() {
  const classes = useStyles();

  const [rubricListState, setRubricListState] = useState({
    rubricList: <h1 className={classes.blankPageTitle}> Espere un momento... </h1>,
  });

  useEffect(() => {
    async function getRubrics() {
      try {
        const rubrics = await Rubrics.index()
        if(rubrics.statusCode === '404'){
          setRubricListState({ rubricList: <h1 className={classes.blankPageTitle}> Aún no tienes rúbricas</h1> });
        } else {
          setRubricListState({
            rubricList: <RubricList rubrics={rubrics}></RubricList>
          });
        }
      } catch (e) {
        setRubricListState({ rubricList: <h1 className={classes.blankPageTitle}> Ocurrió un error</h1> });
      }
    }
    getRubrics();
  }, []);

  return (
    <div className={classes.root}>
      <Paper>
        <Typography variant="h2" component="h2">
          Tus Rúbricas
        </Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          href="/createRubric">
            Crea una rúbrica
        </Button>
        <Paper elevation={0} classes={classes.containerRubricList}>
          {rubricListState.rubricList}
        </Paper>
      </Paper>
    </div>
  );
}