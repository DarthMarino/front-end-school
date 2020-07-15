import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
const moment = require('moment')

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#1976D2',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
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

export default function Rubric(props) {
  const rubric = props.rubric? props.rubric: {evaluativeCriteria:[{evaluativeCriteriaDetail:[]}]} 
  const classes = useStyles();
  const getRubricCreatedAt = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a'); 
        // July 14th 2020, 7:46:54 pm
  }
  return (
    <div className={classes.root}> 
        <Typography variant="h3" component="h2" className={classes.headers}>
            {rubric.name}
        </Typography>
        <Typography variant="h5" component="h2" className={classes.headers}>
            {rubric.description}
        </Typography>
        <div style={{marginTop: 15, marginLeft: 40, marginBottom: 30}}>
          <Typography variant="body2" component="h2" color="textSecondary">
            Rango de puntuación: {rubric.minScore} - {rubric.maxScore} 
          </Typography>
          <Typography variant="body2" component="h2" color="textSecondary">
            Fecha de creación: { getRubricCreatedAt(rubric.createdAt) }
          </Typography>
        </div>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Criterio</StyledTableCell>
                <StyledTableCell>Peso</StyledTableCell>
                {
                    Array.from({length: rubric.maxScore + 1}, (value, key) => {
                        return <StyledTableCell align="right">{key}</StyledTableCell>
                    })
                }
            </TableRow>
            </TableHead>
            <TableBody>
            {rubric.evaluativeCriteria.map((evaluativeCriteria) => <StyledTableRow key={evaluativeCriteria._id}>
                <StyledTableCell component="th" scope="row">
                    {evaluativeCriteria.name}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                    {evaluativeCriteria.weight}
                </StyledTableCell>
                {
                    evaluativeCriteria.evaluativeCriteriaDetail.map((evaluativeCriteriaDetail) => {
                        return <StyledTableCell 
                        key={evaluativeCriteriaDetail._id}
                        align="right">{evaluativeCriteriaDetail.qualityDefinition}
                        </StyledTableCell>
                    })
                }
                </StyledTableRow>
            )}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}