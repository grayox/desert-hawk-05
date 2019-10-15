// inspired by: https://material-ui.com/demos/menus/#selected-menus

import React, { useState, } from 'react';
import { makeStyles } from '@material-ui/styles';
import { MenuItem, Menu, Icon, IconButton, Tooltip, Zoom, } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
}));

// const options = [
//   // 'Show some love to Material-UI',
//   // 'Show all notification content',
//   // 'Hide sensitive notification content',
//   // 'Hide all notification content',
//   'Filter by', 'All', 'Starred', 'Unstarred', 'Challenged', 'Pending', 'Resolved', 'Won', 'Lost',
// ];

const icons = {
  search: 'search',
  filter: 'filter_list',
  sort: 'sort',
}

// function SimpleListMenu() {
const SortFilterMenu = ({variant, searchMenuOptions, filterMenuOptions, sortMenuOptions, onMenuItemClick,}) => {
  const classes = useStyles();
  const [ anchorEl      , setAnchorEl      , ] = useState(null);
  const [ selectedIndex , setSelectedIndex , ] = useState(1);

  const optionsConfig = {
    search: searchMenuOptions,
    filter: filterMenuOptions,
    sort: sortMenuOptions,
  }

  const options = optionsConfig[variant];

  const handleClickIconButton = event => setAnchorEl(event.currentTarget);

  const handleMenuItemClick = (event, selectedIndex) => {
    // console.log('variant\n', variant,);
    // console.log('selectedIndex\n', selectedIndex,);
    const selectedString = options[selectedIndex];
    // console.log('selectedItem\n', selectedString,);
    setSelectedIndex(selectedIndex);
    setAnchorEl(null);
    onMenuItemClick({ variant, selectedIndex, selectedString, });
  }

  const handleClose = () => setAnchorEl(null);

  return (
    <div className={classes.root}>
      {
      // <List component="nav">
      //   <ListItem
      //     button
      //     aria-haspopup="true"
      //     aria-controls="lock-menu"
      //     aria-label="When device is locked"
      //     onClick={handleClickIconButton}
      //   >
      //     <ListItemText primary="When device is locked" secondary={options[selectedIndex]} />
      //   </ListItem>
      // </List>

      // filterable &&
      // <Tooltip TransitionComponent={Zoom} placement="bottom" title="Filter">
      //   <span className="mx-3">
      //     <IconButton color="inherit" aria-label="Filter"
      //       onClick={onClickFilter}
      //     >
      //       <Icon>filter_list</Icon>
      //     </IconButton>
      //   </span>
      // </Tooltip>
      
      // sortable &&
      // <Tooltip TransitionComponent={Zoom} placement="bottom" title="Sort">
      //   <span className="mx-3">
      //     <IconButton color="inherit" aria-label="Sort"
      //       onClick={onClickSort}
      //     >
      //       <Icon>sort</Icon>
      //     </IconButton>
      //   </span>
      // </Tooltip>
      }
      <Tooltip TransitionComponent={Zoom} placement="bottom" title={variant}>
        <IconButton onClick={handleClickIconButton}>
          <Icon>{icons[variant]}</Icon>
        </IconButton>
      </Tooltip>
      <Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option, index,) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

// export default SimpleListMenu;
export default SortFilterMenu;