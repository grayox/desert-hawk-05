import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classNames from 'classnames';

import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
});

class SettingsDialog extends Component {
  render() {
    // console.log('props\n', this.props);
    const {
      dialogIsOpen, dialogTitle, dialogContent, dialogContentText,
      dialogFieldName, isDialogTextField, dialogTextFieldLabel, 
      onKeyPress, onChange, onClose, onCancel, onSave,
    } = this.props;
    return (
      <Dialog
        open={dialogIsOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          {dialogContentText &&
            (
              <DialogContentText className='mb-8'>
                {dialogContentText}
              </DialogContentText>
            )
          }
          {isDialogTextField &&
            (
              <TextField
                id={dialogFieldName}
                name={dialogFieldName}
                type="text"
                margin="dense"
                variant="outlined"
                label={dialogTextFieldLabel}
                onChange={onChange}
                onKeyPress={onKeyPress}
                autoFocus
                fullWidth
              />
            )
          }
          {dialogContent}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={onSave} id="saveButton" color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

SettingsDialog.propTypes = {
  classes              : PropTypes.object.isRequired,
  dialogContent        : PropTypes.element, // <GeoStepper ... />
  dialogContentText    : PropTypes.string,  // 'To subscribe to this website, please enter your email address here. We will send updates occasionally.'
  dialogFieldName      : PropTypes.string,  // 'name',
  dialogIsOpen         : PropTypes.bool,    // false
  isDialogTextField    : PropTypes.bool,    // true
  dialogTextFieldLabel : PropTypes.string,  // 'first and last'
  dialogTitle          : PropTypes.string,  // 'Name'
  onChange             : PropTypes.func,
  onClose              : PropTypes.func,
  onCancel             : PropTypes.func,
  onSave               : PropTypes.func,
}

export default withStyles(styles, { withTheme: true })(SettingsDialog);
