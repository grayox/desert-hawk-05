// inspired by https://material-ui.com/demos/menus/#simple-menu

import React, { Component, } from 'react';
import {
  // Button,
  Menu, MenuItem, IconButton, Icon, Tooltip, Zoom,
} from '@material-ui/core';

import { Link, } from 'react-router-dom';
import {
  getComponentsNavConfig, overheadConfig,
  getFilterArrayOfObjectsByPropValueContainedInArray,
} from 'app/config/AppConfig';

const getItems = () => {
  // // const out = getComponentsNavConfig().filter(r => r.overhead); // filters in only objects with overhead property
  // const out = getComponentsNavConfig().filter(r => r && r.type && r.type.component === 'overhead');
  // // console.log('out\n', out,);
  // return out;
  const componentsNavConfig = getComponentsNavConfig();
  const items = getFilterArrayOfObjectsByPropValueContainedInArray( componentsNavConfig, 'id', overheadConfig, );
  return items;
}

// class SimpleMenu extends Component {
class OverflowMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const items = getItems();

    return (
      <div>
        {
        // <Button
        //   aria-owns={anchorEl ? 'simple-menu' : undefined}
        //   aria-haspopup="true"
        //   onClick={this.handleClick}
        // >
        //   Open Menu
        // </Button>
        }
        <Tooltip TransitionComponent={Zoom} title="Links">
          <IconButton
            // className={classes.rightButton}
            color="inherit"
            aria-label="Overflow"

            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <Icon>more_vert</Icon>
          </IconButton>
        </Tooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {
          // <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          // <MenuItem onClick={this.handleClose}>My account</MenuItem>
          // <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          items.map( ({ title, id, }, index) => (
            <Link to={`/${id}`} key={title} className="no-underline text-black">
              <MenuItem onClick={this.handleClose}>{title}</MenuItem>
            </Link>     
          ))
          }
        </Menu>
      </div>
    );
  }
}

// export default SimpleMenu;
export default OverflowMenu;