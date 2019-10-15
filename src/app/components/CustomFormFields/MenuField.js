// inspired by
// https://material-ui.com/components/menus/#selected-menus

import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// const options = [
//   'Show some love to Material-UI',
//   'Show all notification content',
//   'Hide sensitive notification content',
//   'Hide all notification content',
// ];

const HEADER = 'Select one';

const MenuField = ({onChange, id, label, options, required, error,}) => {
  // console.log('id\n', id,);
  // console.log('icon\n', icon,);
  // console.log('options\n', options,);

  if(options[0].label !== HEADER) options.unshift({label: HEADER,},);

  // const classes = useStyles();
  const [anchorEl, setAnchorEl,] = React.useState(null);
  const [selectedIndex, setSelectedIndex,] = React.useState(1);

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuItemClick = (event, index,) => {
    // const { target, } = event;
    // console.log('target\n', target,);
    // console.log('index\n', index,);
    // console.log('id\n', id,);
    setSelectedIndex(index);
    setAnchorEl(null);

    const arg = {
      target: {
        id, // maps to key in app/config/AppConfig.formFieldConfig // must be customized for custom components
        value: options[index].value,
      },
    };

    onChange(arg);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div
      // {classes.root}
      className="mb-24 w-full"
    >
      <List component="nav" aria-label={`${label} menu`}>
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          // aria-label="When device is locked"
          aria-label={label}
          onClick={handleClickListItem}
        >
          <ListItemText
            // primary="When device is locked"
            primary={label}
            secondary={options[selectedIndex].label}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          // options.map(( option, index, ) => (
          options.map(( { value, label, error, }, index, ) => (
            <MenuItem
              // key={option}
              key={value}
              error={error}
              disabled={index === 0}
              selected={index === selectedIndex}
              onClick={event => handleMenuItemClick(event, index,)}
            >
              {/* {option} */}
              {label}
            </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default MenuField;
// makeStyles(styles, { withTheme: true })(FormTemplate);