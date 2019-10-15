import React from 'react';
import classNames from 'classnames';
import { withStyles } from "@material-ui/core";

import { Typography, Icon, } from '@material-ui/core';

const styles = theme => ({
  root: {
    height: 'calc(100vh - 128px)',
  },
});

const ErrorMaintenance = props => {
  const { classes, } = props;
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Icon>build</Icon>
      <Typography className={classNames(classes.root, "text-40 mb-16")} color="textSecondary">Temporarily down for maintenance</Typography>
    </div>
  );
}

export default withStyles(styles)(ErrorMaintenance);