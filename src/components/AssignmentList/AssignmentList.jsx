import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import {useParams} from "react-router-dom"
import {Assignments} from '../../services/assignments'
import CardAssignment from '../CardAssignment/CardAssignment'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'auto-fit',
    '& > *': {
      margin: theme.spacing(5),
      height: 'auto-fit',
      padding: theme.spacing(10),
    },
  },
  containerAssignmentList: {
    marginTop: theme.spacing(5)
  },
  blankPageTitle: {
    margin: theme.spacing(15),
    color: '#455A64',
    textAlign: 'center'
  },
  containerAssignmentCard: {
    marginBottom: theme.spacing(5)
  },
}));

export default function AssignmentList(props) {
  const classes = useStyles();
  const isTeacher = props.isTeacher
  const [assignmentListState, setAssignmentListState] = useState({
    assignmentList: <h1 className={classes.blankPageTitle}> Espere un momento... </h1>,
  });
  
  useEffect(() => {
    async function getAssignments() {
      try {
        const assignments = (isTeacher)? await Assignments.indexIsTeacher() : await Assignments.indexIsStudent()
        if(assignments.statusCode === '404'){
            setAssignmentListState({ assignmentList: <h1 className={classes.blankPageTitle}> Aún no tienes Asignaciones</h1> });
        } else {
            setAssignmentListState({
              assignmentList: assignments.map((assignment) => 
                <div 
                  key={assignment._id}
                  className={classes.containerAssignmentCard}> 
                  <CardAssignment 
                    isTeacher={isTeacher} 
                    assignment={{...assignment}}/>
                </div>)
          });
        }
      } catch (e) {
        setAssignmentListState({ assignmentList: <h1 className={classes.blankPageTitle}> Ocurrió un error</h1> });
      }
    }
    getAssignments();
  }, []);

  return (
    <div className={classes.root}>
      <Paper>
        <Typography variant="h2" component="h2">
          Tus Asignaciones
        </Typography>
        <Paper elevation={0} className={classes.containerAssignmentList}>
          {assignmentListState.assignmentList}
        </Paper>
      </Paper>
    </div>
  );
}











// import React, { Component } from "react";
// import RubricList from "../../components/RubricList/RubricList.component";
// import {Rubrics} from '../../services/rubrics'
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import 'fontsource-roboto';

// // const useStyles = makeStyles((theme) => ({
// //   root: {
// //     maxWidth: 'auto-fit',
// //     '& > *': {
// //       margin: theme.spacing(5),
// //       height: 'auto-fit',
// //       padding: theme.spacing(10),
// //     },
// //   },
// //   button: {
// //     marginTop: theme.spacing(5),
// //     marginBottom: theme.spacing(5),
// //   },
// //   containerAssignmentList: {
// //     display: 'flex',
// //     flexWrap: 'wrap',
// //     justifyContent: "center",
// //   },
// //   blankPageTitle: {
// //     margin: theme.spacing(15),
// //     color: '#455A64',
// //     textAlign: 'center'
// //   }
// // }));

// export default class AssignmentList extends Component {
//     constructor() {
//         super()
//         // this.classes = useStyles();
//     }
//     componentDidMount() {
//         if (this.props.match.params) {
//             console.log('************************')
//             console.log(this.props.match.params)
//         }
//     }
//   // const classes = useStyles();
// //   const isTeacher = props.match.params.isTeacher
// //   const [assignmentListState, setAssignmentListState] = useState({
// //     assignmentList: <h1 className={classes.blankPageTitle}> Espere un momento... </h1>,
// //   });

// //   useEffect(() => {
// //       console.log(props)
//     // async function getAssignments() {
//     //   try {
//     //     const assignments = (isTeacher)? await Assignments.index() : await Assignments.indexIsTeacher()
//     //     if(rubrics.statusCode === '404'){
//     //       setRubricListState({ rubricList: <h1 className={classes.blankPageTitle}> Aún no tienes rúbricas</h1> });
//     //     } else {
//     //       setRubricListState({
//     //         rubricList: <RubricList rubrics={rubrics}></RubricList>
//     //       });
//     //     }
//     //   } catch (e) {
//     //     setRubricListState({ rubricList: <h1 className={classes.blankPageTitle}> Ocurrió un error</h1> });
//     //   }
//     // }
//     // getAssignments();
// //   }, []);

// render() {  
// return (
//     <div>
//      {/* className={this.classes.root}> */}
//       <Paper>
//         <Typography variant="h2" component="h2">
//           Tus Asignaciones
//         </Typography>
//         <Paper elevation={0}>
//          {/* classes={this.classes.containerAssignmentList}> */}
//           {/* {assignmentListState.assignmentList} */}
//         </Paper>
//       </Paper>
//     </div>
//   );
// }
// }