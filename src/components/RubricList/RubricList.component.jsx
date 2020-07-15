import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import FullScreenDialog from '../FullScreenDialog/FullScreenDialog'
import RubricTable from '../RubricTable/RubricTable'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'auto-fit',
    marginBottom: theme.spacing(3)
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const rubrics = props.rubrics ? props.rubrics : [];
  return (
    <div>
    {
      rubrics.map((rubric) =>
      <Card className={classes.root} key={rubric._id}>
        <CardHeader
          action={
            <FullScreenDialog option="Ver Rúbrica"> <RubricTable rubric={rubric}/> </FullScreenDialog>
          }
          title={rubric.name}
          subheader={rubric.description}
        />
      </Card>
      )
    }
    </div>
  );
}

