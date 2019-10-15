// inspired by src/app/apps/contacts/ContactDialog.js

import React, { Component } from 'react';
import {
  TextField, Icon,
  // Button, Dialog, DialogActions, DialogContent, IconButton, Typography, Toolbar, AppBar, Avatar
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles/index';
// import { bindActionCreators } from 'redux';
// import * as Actions from './store/actions';
// import { connect } from 'react-redux';
import _ from '@lodash';

const styles = theme => ({
  root: {},
  formControl: {
    marginBottom: 24
  }
});
const INITIAL_STATE = {
  id       : null ,
  name     : null ,
  lastName : null ,
  avatar   : 'assets/images/avatars/profile.jpg',
  nickname : null ,
  company  : null ,
  jobTitle : null ,
  email    : null ,
  phone    : null ,
  address  : null ,
  birthday : null ,
  notes    : null ,
};

class UserMultiForm extends Component {
  state = { ...INITIAL_STATE };

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   /**
  //    * After Dialog Open
  //    */
  //   if (!prevProps.userMultiForm.props.open && this.props.userMultiForm.props.open) {
  //     /**
  //      * Dialog type: 'edit'
  //      * Update State
  //      */
  //     if (this.props.userMultiForm.type === 'edit' &&
  //       this.props.userMultiForm.data &&
  //       !_.isEqual(this.props.userMultiForm.data, prevState)) {
  //       this.setState({ ...this.props.userMultiForm.data });
  //     }

  //     /**
  //      * Dialog type: 'new'
  //      * Update State
  //      */
  //     if (this.props.userMultiForm.type === 'new' &&
  //       !_.isEqual(INITIAL_STATE, prevState)) {
  //       this.setState({ ...INITIAL_STATE });
  //     }
  //   }
  // }

  handleChange = event => {
    this.setState(
      _.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
      , () => this.props.onChange(this.state)
    );
  };

  // closeComposeDialog = () => {
  //   this.props.userMultiForm.type === 'edit' ? this.props.closeEditUserMultiForm() : this.props.closeNewUserMultiForm();
  // };

  canBeSubmitted() {
    const { name } = this.state;
    return (
      name.length > 0
    );
  }

  render() {
    const { classes, } = this.props; // userMultiForm, addContact, updateContact, removeContact 

    return (
      // <Dialog
      //   classes={{
      //     root: classes.root,
      //     paper: "m-24"
      //   }}
      //   className={classes.root}
      //   {...userMultiForm.props}
      //   onClose={this.closeComposeDialog}
      //   fullWidth
      //   maxWidth="xs"
      // >
      <React.Fragment>

        {
        // <AppBar position="static" elevation={1}>
        //   <Toolbar className="flex w-full">
        //     <Typography variant="subtitle1" color="inherit">
        //       {
        //         // {userMultiForm.type === 'new' ? 'New Contact' : 'Edit Contact'}
        //       }
        //       New Contact
        //     </Typography>
        //   </Toolbar>
        //   {
        //   // <div className="flex flex-col items-center justify-center pb-24">
        //   //   <Avatar className="w-96 h-96" alt="contact avatar" src={this.state.avatar} />
        //   //   {userMultiForm.type === 'edit' && (
        //   //     <Typography variant="h6" color="inherit" className="pt-8">
        //   //       {this.state.name}
        //   //     </Typography>
        //   //   )}
        //   // </div>
        //   }
        // </AppBar>
        }

        {
        // <DialogContent classes={{ root: "p-24" }}>
        }
        <div classes={{ root: "p-24" }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>

            <TextField
              className={classes.formControl}
              label="Name"
              autoFocus
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              variant="outlined"
              required
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
            </div>
            <TextField
              className={classes.formControl}
              label="Last name"
              id="lastName"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">star</Icon>
            </div>
            <TextField
              className={classes.formControl}
              label="Nickname"
              id="nickname"
              name="nickname"
              value={this.state.nickname}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">phone</Icon>
            </div>
            <TextField
              className={classes.formControl}
              label="Phone"
              id="phone"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">email</Icon>
            </div>
            <TextField
              className={classes.formControl}
              label="Email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">domain</Icon>
            </div>
            <TextField
              className={classes.formControl}
              label="Company"
              id="company"
              name="company"
              value={this.state.company}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">work</Icon>
            </div>
            <TextField
              className={classes.formControl}
              label="Job title"
              id="jobTitle"
              name="jobTitle"
              value={this.state.jobTitle}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">cake</Icon>
            </div>
            <TextField
              className={classes.formControl}
              id="birthday"
              label="Birthday"
              type="date"
              value={this.state.birthday}
              onChange={this.handleChange}
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">home</Icon>
            </div>
            <TextField
              className={classes.formControl}
              label="Address"
              id="address"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">note</Icon>
            </div>
            <TextField
              className={classes.formControl}
              label="Notes"
              id="notes"
              name="notes"
              value={this.state.notes}
              onChange={this.handleChange}
              variant="outlined"
              multiline
              rows={5}
              fullWidth
            />
          </div>
        </div>
        {/* </DialogContent> */}

        {/* {userMultiForm.type === 'new' ? (
          <DialogActions className="justify-between pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addContact(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Add
            </Button>
          </DialogActions>
        ) : (
            <DialogActions className="justify-between pl-16">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  updateContact(this.state);
                  this.closeComposeDialog();
                }}
                disabled={!this.canBeSubmitted()}
              >
                Save
              </Button>
              <IconButton
                onClick={() => {
                  removeContact(this.state.id);
                  this.closeComposeDialog();
                }}
              >
                <Icon>delete</Icon>
              </IconButton>
            </DialogActions>
          )} */}
      {/* </Dialog> */}
      </React.Fragment>
    );
  }
}


// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     closeEditUserMultiForm: Actions.closeEditUserMultiForm,
//     closeNewUserMultiForm: Actions.closeNewUserMultiForm,
//     addContact: Actions.addContact,
//     updateContact: Actions.updateContact,
//     removeContact: Actions.removeContact
//   }, dispatch);
// }

// function mapStateToProps({ contactsApp }) {
//   return {
//     // userMultiForm: contactsApp.contacts.userMultiForm
//   }
// }


// export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(UserMultiForm));
export default withStyles(styles, { withTheme: true })(UserMultiForm);
