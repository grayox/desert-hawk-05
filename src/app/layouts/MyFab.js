import React, { Component } from 'react';
import {
  withStyles, Zoom, Fab, Icon,
  Button, Dialog, DialogActions,
  DialogContent, DialogTitle,
  // TextField, DialogContentText, 
} from '@material-ui/core';

import UserMultiForm from 'app/components/forms/UserMultiForm';

const styles = theme => ({
  fab: {
    position: 'absolute',
    // zIndex: theme.zIndex.appBar + 1,
    zIndex: 1202, // undefined: // zIndex: theme.zIndex.bottomNavigation + 1,
    // // candidate 0 - spec
    // bottom : theme.spacing.unit * 2 ,
    // right  : theme.spacing.unit * 2 ,
    // // candidate 1
    // bottom : theme.spacing.unit * 8 ,
    // right  : theme.spacing.unit * 1 ,
    // // candidate 2
    // top    : theme.spacing.unit * 3 ,
    // right  : theme.spacing.unit * 9 ,
    // // candidate 3
    // bottom : theme.spacing.unit *  3 ,
    // right  : theme.spacing.unit * 12 ,
    // candidate 4
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 0.5,
  },
})

class MyFab extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, } = this.props; // theme
    const { handleClickOpen, } = this;

    return (
      <div>
        {
          // <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          //   Open form dialog
          // </Button>
        }
        <Zoom
          // key={fab.color}
          in unmountOnExit
          // timeout={transitionDuration}
          timeout={500}
          style={{
            transitionDelay: '500ms',
          }}
        >
          <Fab
            className={classes.fab}
            color='primary' //'secondary' // accent
            onClick={handleClickOpen}
          >
            <Icon>add</Icon>
          </Fab>
        </Zoom>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create new lead</DialogTitle>
          <DialogContent>
            {
            // <DialogContentText>
            //   To subscribe to this website, please enter your email address here. We will send
            //   updates occasionally.
            // </DialogContentText>
            // <TextField
            //   autoFocus
            //   margin="dense"
            //   id="name"
            //   label="Email Address"
            //   type="email"
            //   fullWidth
            // />
            }
            <UserMultiForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(MyFab);