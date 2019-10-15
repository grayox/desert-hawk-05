import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';

import { avatarOptions } from 'app/config/AppConfig';
import HashAvatar from 'app/components/HashAvatar';

// material-ui
import {
  // Avatar, Button, Icon, IconButton, AppBar, Card, CardContent, 
  // Toolbar, Menu, List, ListItem, ListItemSecondaryAction, ListItemText,
  withStyles, MenuList, MenuItem, Typography, 
} from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

const timestamp = Date.now();

class AvatarSelect extends Component {

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
    // const { classes } = this.props;
    // const { anchorEl } = this.state;

    return (
      <MenuList
        // id="menu2"
        // anchorEl={anchorElMenu1}
        // open={Boolean(anchorElMenu1)}
        // // onClose={this.onCloseMenu1}
        // onClose={onCloseMenu1}
      >
        {
          // optionsMenu1.map((option, index) => (
          avatarOptions.map( item =>
            <MenuItem
              key={item.label}
              // className="m-4"
              // disabled={index === 0}
              // selected={index === this.state.selectedIndex}
              // selected={index === settings.darkBackground}
              // onClick={event => this.onMenuItemClickMenu1(event, index)}
              // onClick={event => onMenuItemClickMenu1(event, index)}
              onClick={this.handleClose}
            >
              <HashAvatar
                className="p-8"
                message={timestamp} // this is demo only; in practice, message would be: getIdHash(uid, timestamp,)
                variant={item.value} //"uic" //"robohashx" //"robohash4" //"retro" //"monsterid" //"wavatar" //"adorable" //"identicon" //"mp" //"ui" //"random"(deprecated)
              />
              <Typography className="ml-12">
                {item.label}
              </Typography>
            </MenuItem>
          )
        }
      </MenuList>
    );
  }
}
 
// export default AvatarSelect;
export default withStyles(styles)(AvatarSelect);