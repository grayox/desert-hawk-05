// inspired by // https://material-ui.com/demos/menus/

import React, { useState, } from 'react';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import { Link, } from 'react-router-dom';
import {
  Menu, MenuItem, Icon, IconButton,
} from '@material-ui/core';

// import { getComponentsNavConfig, } from 'app/config/AppConfig';

// function SimpleMenu() {
const WidgetMenu = ({ mobile=false, links, onOpenDialog, }) => {
  // console.log('React Version: ', React.version); // 16.6.3 -> 16.8.6
  const [ anchorEl, setAnchorEl, ] = useState(null);

  // function handleClick(event) {
  //   setAnchorEl(event.currentTarget);
  // }
  const handleClick = event => setAnchorEl(event.currentTarget);

  // function handleClose() {
  //   setAnchorEl(null);
  // }
  const handleClose = () => setAnchorEl(null);

  const handleSelectDialog = () => {
    onOpenDialog();
    handleClose();
  }

  // const handleOpenDialog = () => alert('Open info dialog here');

  return (
    <React.Fragment>
      {
      // <Button
      //   aria-owns={anchorEl ? 'simple-menu' : undefined}
      //   aria-haspopup="true"
      //   onClick={handleClick}
      // >
      //   Open Menu
      // </Button>
      }
      <IconButton aria-label="more"
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  >
        <Icon>{ mobile ? 'more_horiz' : 'more_vert' }</Icon>
      </IconButton>
      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {
          // <MenuItem onClick={handleClose}>Profile</MenuItem>
          // <MenuItem onClick={handleClose}>My account</MenuItem>
          // <MenuItem onClick={handleClose}>Logout</MenuItem>
          // <MenuItem onClick={handleClose} component={Link} to="/archive">My action</MenuItem>
          links.map( ({ label, id, }) =>
          // links.map( link => {
            // // console.log('link\n', link,);
            // const componentsNavConfig = getComponentsNavConfig();
            // const targetComponentArray = componentsNavConfig.filter(r => (r.id === link.id));
            // // console.log('targetComponentArray\n', targetComponentArray,);
            // const targetComponent = targetComponentArray[0];
            // // console.log('targetComponent\n', targetComponent,);
            // const pathTo = targetComponent.path;
            // const getLink = () =>
            //   <MenuItem key={link.id} onClick={handleClose} component={Link} to={pathTo}>{link.label}</MenuItem>
            // // const getComponent = () => console.log('Component goes here') // deprecate component
            // // return ( ( link && link.id ) ? getLink() : getComponent() );
            // return getLink();
          // }
            <MenuItem key={id} onClick={handleClose} component={Link} to={`/${id}`}>
              {label}
            </MenuItem>
          )
        }
        <MenuItem onClick={handleSelectDialog}>Help</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

// export default SimpleMenu;
export default WidgetMenu;