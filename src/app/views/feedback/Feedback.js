// inspired by src/main/content/pages/faq/FaqPage.js

import React, { useState, } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import compose from 'recompose/compose';
import { connect, } from 'react-redux';
import { createItem, } from 'app/layouts/crud/store/actions'; // updateItem, deleteItem, actionItem,

import ErrorBoundary from 'app/containers/ErrorBoundary';

import { Typography, Snackbar, } from '@material-ui/core';
import { FuseAnimate, } from '@fuse';

import NarrativeForm from './NarrativeForm';
import RatingSelect from './RatingSelect';

const styles = theme => ({
  root: {
    width: '100%',
  },
  wrapper: {
    verticalAlign: 'top', // overcomes default
    // paddingTop: '56px', // clears <AppBar />
  },
  card: {},
  cardHeader: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.getContrastText(theme.palette.grey[800]),
  },
  header: {
    background: "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover',
    color: '#fff',
  },
  content: {},
  panel: {
    margin: 0,
    borderWidth: '1px 1px 0 1px',
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '&:first-child': {
      borderRadius: '16px 16px 0 0',
    },
    '&:last-child': {
      borderRadius: '0 0 16px 16px',
      borderWidth: '0 1px 1px 1px',
    },
  },
});

const AUTOHIDE_DURATION = 4500;
const SNACKBAR_MESSAGE = 'Feedback sent';

const Feedback = props => {
  const { classes, createItem, profile: { uid, }, } = props;

  const [ snackbarIsOpen, setSnackbarIsOpen, ] = useState(false);

  const handleSave = ( value, type, ) => {
    // console.log('event\n', event,);
    // console.log('value\n', value,);
    // console.log('type\n', type,);
    const getNewItem = value => {
      let out;
      if(typeof value === 'object') out = value;
      else out = { value, };
      return out;
    }
    const newItem = getNewItem(value);
    // console.log('newItem\n', newItem,);
    const creatable = {
      addOns: {
        createdAt: Date.now(),
        createdBy: uid,
      },
      getCreatable: () => null,
      path: type,
    }
    createItem( newItem, creatable, ); // uid, settings, path, dashboard,
    setSnackbarIsOpen(true);
  }

  const handleCloseSnackbar = ( event, reason, ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarIsOpen(false);
  }

  const getSnackbar = () =>
    <Snackbar
      className="mb-24" 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center', // 'left',
      }}
      open={snackbarIsOpen}
      autoHideDuration={AUTOHIDE_DURATION}
      onClose={handleCloseSnackbar}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{SNACKBAR_MESSAGE}</span>}
      // action={[
      //   <Button key="undo" color="secondary" size="small" onClick={handleClose}>
      //     UNDO
      //   </Button>,
      //   <IconButton
      //     key="close"
      //     aria-label="close"
      //     color="inherit"
      //     className={classes.close}
      //     onClick={handleClose}
      //   >
      //     <CloseIcon />
      //   </IconButton>,
      // ]}
    />

  const getMain = () =>
    <div className={classNames(classes.root, classes.wrapper, "")}>

      <div className={classNames(classes.header, "flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360")}>
      {/* <div className="flex flex-col flex-1 md:pr-32"> */}
        <FuseAnimate animation="transition.slideDownIn" duration={400} delay={300}>
          <Typography color="inherit" className="text-36 sm:text-56 font-light">
            Send feedback
          </Typography>
        </FuseAnimate>
      </div>

      <div className={classNames(classes.content, "md:flex md:mx-24")}>
      
        <FuseAnimate animation="transition.slideLeftIn" duration={600} delay={600}>
          <ErrorBoundary>
            {/* <div className="border border-red border flex-1 max-w-xl mx-auto px-16 sm:px-24 py-24 sm:py-32"> */}
            <div className="flex-1 my-24 md:mr-12">
              <RatingSelect
                initialRating={undefined}
                forwardMinimum={6} // effectively, shuts off forwarding option as scale top ends at 5
                onSave={ data => handleSave(data, 'ratings',)}
              />
            </div>
          </ErrorBoundary>
        </FuseAnimate>

        <FuseAnimate animation="transition.slideRightIn" duration={800} delay={900}>
          <ErrorBoundary>
            {/* <div className="border border-red flex-1 max-w-xl mx-auto px-16 sm:px-24 py-24 sm:py-32"> */}
            <div className="flex-1 my-24 md:ml-12">
              <NarrativeForm
                onSave={ data => handleSave(data, 'narratives',)} // radio
              />
            </div>
          </ErrorBoundary>
        </FuseAnimate>

      </div>
    </div>

  const getFeedback = () =>
    <React.Fragment>
      {getMain()}
      {getSnackbar()}
    </React.Fragment>
  
  return getFeedback();
}

const mapStateToProps = state => {
  // console.log('state\n', state);
  // const settings = state.firestore.ordered.users
  //               && state.firestore.ordered.users[0]
  //               && state.firestore.ordered.users[0].settings
  //               && state.firestore.ordered.users[0].settings[0];
  // const settings = state.settings;
  // const settings = state
  //               && state.myApp
  //               && state.myApp.reducers
  //               && state.myApp.reducers.userDataReducer
  //               && state.myApp.reducers.userDataReducer.settings;
  const profile = state
               && state.firebase
               && state.firebase.profile;
  // replace user with profile; user contains default settings
  // const user = state.auth.user;
  // const leads = state.firestore.ordered.leads;
  const dataHasLoaded = !!profile; // && !!settings; // && !!leads && !!user && 
  
  // // console.log('user\n', user);
  // // console.log('leads\n', leads);
  // console.log('profile\n', profile);
  // console.log('settings\n', settings);
  // console.log('dataHasLoaded\n', dataHasLoaded);
  
  // //       YES   YES      YES       NO     NO
  // return { user, profile, settings, leads, dataHasLoaded, }
  return { profile, dataHasLoaded, } // settings,
}

// below this line borrowed from CRUDview
const mapDispatchToProps = dispatch => ({
  // CRUD item
  // common mistakes: 1. forget to use this.props... when calling function in class 2. copy/paste forget to change function name in mapStateToProps => dispatch
  createItem: ( item, creatable, ) => dispatch(createItem( item, creatable, )), // uid, settings, path , dashboard, // inspired by: src/app/components/forms/CreateLead.js
  // updateItem: ( path   , docId , newItem , oldItem   , updatable , ) => dispatch(updateItem( path , docId , newItem , oldItem   , updatable , )),
  // deleteItem: ( path   , docId , uid     , creatable , ) => dispatch(deleteItem( path , docId , uid     , creatable , )), // dashboard, 
  // actionItem: ( detail, actionable, ) => dispatch(actionItem( detail, actionable, )), // uid, navComponentId, dashboard, 
  // update dashboard
  // updateUserData: (path, newData,) => dispatch(updateUserData(path, newData,)),
})

// export default Feedback;
// export default withStyles(styles)(Feedback);
// export default withStyles(styles, { withTheme: true })(Feedback);
export default compose(
  withStyles(styles),
  // withWidth(),
  // connect( mapStateToProps, mapDispatchToProps, ),
  connect( mapStateToProps, mapDispatchToProps, ),
)(Feedback);
