import React from 'react';
import classNames from 'classnames';
import { withStyles } from "@material-ui/core";

import { Typography, LinearProgress, } from '@material-ui/core';
// import Skeleton from './Skeleton';

const styles = theme => ({
  root: {
    height: 'calc(100vh - 128px)',
  },
});

const Loading = props => {
  const { classes, } = props;
  return (
    // <React.Fragment>
    //   <LinearProgress color="secondary" />
    //   <Typography variant="body1">Loading...</Typography>
    // </React.Fragment>
    // reference: src/@fuse/components/FuseLoadable/Loading.js
    <div className={classNames(classes.root, "flex flex-1 flex-col items-center justify-center")}>
      <Typography className="text-20 mb-16" color="textSecondary">Loading...</Typography>
      <LinearProgress className="w-xs" color="secondary"/>
      {
      // <Skeleton />
      }
    </div>
  );
}
 
export default withStyles(styles)(Loading);