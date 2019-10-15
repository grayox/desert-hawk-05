import React from 'react';
import PropTypes from 'prop-types';
import { FuseAnimateGroup } from '@fuse'; // FuseScrollbars, FuseAnimate,
import _ from '@lodash';

import { withStyles, Zoom, Button, Tooltip, Typography, Icon, } from '@material-ui/core';

const styles = theme => ({
  root: {
    // temp-border
    // border: 'solid green 4px',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    paddingTop: 32,
    marginTop: 32,
    justifyContent: 'center',
    // align middle // https://stackoverflow.com/a/25311805
    display: 'flex',
    // flexDirection: 'column',
  },
})

const getReset = onResetSearchFilterSort =>
  <div className="h-full w-full flex flex-col justify-center content-center">
    <Typography variant="h6" color="textSecondary">
      No items found
    </Typography>
    <Button
      className="mt-32 max-w-lg self-center"
      // color="secondary"
      // variant="contained"
      variant="outlined"
      size="large"
      onClick={onResetSearchFilterSort}
    >
      Reset search and filters
    </Button>
  </div>

// getEmpty = () => (<img src="https://via.placeholder.com/800x900.png/e91e63/fff?text=Detail+goes+here"/>)
const getEmpty = ( side, creatable, onClick, searchFilterSortModelWithLabels, onResetSearchFilterSort, ) => {

  const getList = () =>
    <div className="h-full w-full flex flex-col justify-center content-center">
      <Icon className="opacity-25 self-center" fontSize="large">add_circle_outline</Icon>
      <Typography variant="h6" color="textSecondary">
        There are no items in this list
      </Typography>
      {
        !!creatable &&
        <Button
          className="mt-32 max-w-lg self-center"
          color="secondary"
          variant="contained"
          size="large"
          onClick={onClick}
        >
          Add item
        </Button>
      }
    </div>

  const getDetail = () =>
    <Tooltip TransitionComponent={Zoom} placement="top" title="Detail shows here after clicking a list item">
      <div>
        <Icon className="mt-32 opacity-25" fontSize="large">library_books</Icon>
        <Typography variant="body1" color="textSecondary">
          Select an item to view
        </Typography>
      </div>
    </Tooltip>

  const emptyConfig = {
    list: getList(),
    detail: getDetail(),
  }

  const getEmptyConfig = side => emptyConfig[side]

  const out =
    _.isEmpty(searchFilterSortModelWithLabels)
    ?
    getEmptyConfig(side)
    :
    getReset(onResetSearchFilterSort);
    
  return out;
}

const ViewEmpty = ({
  classes, side, creatable, onClick,
  searchFilterSortModelWithLabels, onResetSearchFilterSort,
}) => (
  <div className={classes.root}>
    {
    // <FuseAnimate animation="transition.expandIn" delay={100}>
    //   <Typography variant="h1" color="inherit" className="font-medium mb-16">
    //     Detail
    //   </Typography>
    //   <Avatar>
    //     <BeachAccessIcon />
    //   </Avatar>
    // </FuseAnimate>
    }
    <FuseAnimateGroup
      delay={500}
      enter={{ animation: "transition.expandIn" }}
      leave={{ animation: "transition.expandOut" }}
    // className="hidden md:flex md-flex-1"
    >  
      { getEmpty( side, creatable, onClick, searchFilterSortModelWithLabels, onResetSearchFilterSort, ) }
    </FuseAnimateGroup>
  </div>
)

ViewEmpty.propTypes = {
  classes: PropTypes.object.isRequired,
  side: PropTypes.oneOf([ 'list', 'detail', ]).isRequired,
  onClick: PropTypes.func,
  creatable: PropTypes.oneOfType([ // create button in list pane
    PropTypes.object,
    PropTypes.bool,
  ]),
  searchFilterSortModelWithLabels: PropTypes.object,
  onResetSearchFilterSort: PropTypes.func,
};

ViewEmpty.defaultProps = {
  creatable: false,
};

// export default ViewEmpty;
export default withStyles(styles)(ViewEmpty);