import React from 'react';

import { Typography, AppBar, Toolbar, } from '@material-ui/core';
import HashAvatar from 'app/components/HashAvatar';

// const getAppBar = ( title, name, message, ) => (
const DialogAppBar = ({ title, name, message, }) => (
  <AppBar position="static" elevation={1}>
    <Toolbar className="flex w-full">
      <Typography variant="subtitle1" color="inherit">
        {title}
      </Typography>
    </Toolbar>
    <div className="flex flex-col items-center justify-center pb-24">
      {
        // <Avatar className="w-96 h-96" alt="contact avatar" src={this.state.avatar} />
      }
      <HashAvatar
        className="p-8"
        message={message}
      // size="90" // 50
      // variant={item.value} //"uic" //"robohashx" //"robohash4" //"retro" //"monsterid" //"wavatar" //"adorable" //"identicon" //"mp" //"ui" //"random"(deprecated)
      />
      {
        // contactDialog.type === 'edit' && (
      }
      <Typography variant="h6" color="inherit" className="pt-8">
        {
          // this.state.name
          // 'Name goes here'
          name || 'Name'
        }
      </Typography>
    </div>
  </AppBar>
)

export default DialogAppBar;