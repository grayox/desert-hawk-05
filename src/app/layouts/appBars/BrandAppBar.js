// inspired by
// https://material-ui.com/demos/app-bar/#simple-app-bar
// src/main/MainNavbarHeader.js

import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles, } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography,
  withStyles, Tooltip, Zoom, 
  // CssBaseline, IconButton, Icon,
} from '@material-ui/core';

import { brand } from 'app/config/AppConfig';

const styles = {
  root: {
    // flexGrow: 1, // moves drawer contents to align flush / justify with the bottom of screen
  },

};

function BrandAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar
        elevation={0}
        // position="fixed" // overlays MyAppBar
        position="static"
        // color="default"
      >
        <Toolbar className="justify-center">
          {
            ( brand && brand.logoPath )
            ?
            <Tooltip TransitionComponent={Zoom} title={brand.tagLine}>
              <img className="h-24" src={brand.logoPath} alt="logo" />
            </Tooltip>
            :
            <Typography variant="h6" color="inherit">
              {(brand && brand.appName) || 'Photos'}
            </Typography>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

BrandAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BrandAppBar);