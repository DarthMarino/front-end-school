import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';


export default function ListAssignment(props) {
  const listOptions = props.listOptions ? props.listOptions : {}
  const items = props.items ? props.items : []
  console.log(items)
  return (
    <div> 
        <List subheader={
            <ListSubheader id="nested-list-subheader">
                {
                  <Typography variant="h5" component="h2">
                     {listOptions.title}
                  </Typography>
                }
            </ListSubheader>
         }>
          {
              items.map(item => {
                return <ListItem key={item._id}>
                    <ListItemIcon>
                        {listOptions.icon}
                    </ListItemIcon>
                    <ListItemText primary={item[listOptions.fieldName]}/>
                </ListItem>
              })
          }
        </List>
    </div>
  );
}
