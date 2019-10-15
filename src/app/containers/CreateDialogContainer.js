import React, { useState, useEffect, } from 'react';
import { CreateDialog, } from 'app/layouts/crud/ItemDialogs';

import { compose, } from 'redux';
import { connect, } from 'react-redux';

import { createItem, } from 'app/layouts/crud/store/actions';

import { Snackbar, } from '@material-ui/core'; // withStyles, withWidth, Grid,

import {
  getFormFields, getIdHash, getCreateItem, // getMaskedValue, // app/layouts/crud/CRUDView.js
  getComponentsNavConfig, getFindNested, // app/config/ComponentRouter.js
} from 'app/config/AppConfig';

// const AUTOHIDE_DURATION = 4500;
// const SNACKBAR_MESSAGE = 'Item created';
const AUTOHIDE_DURATION = 2000;
const SNACKBAR_MESSAGE = 'Processing...'

const INITIAL_STATE = {
  errors            : null ,
  creatable         : null ,
  crudForm          : null ,
  crudFormIdHash    : null ,
  crudFormTimestamp : null ,
};

const CreateDialogContainer = ({
  profile, settings, createItem,
  id, dialogIsOpen, snackbarIsOpen, onCloseDialog, onCloseSnackbar,
}) => { // dashboard,

  // state

  // const [ creatable          , setCreatable          , ] = useState( null  );
  // const [ crudForm           , setCrudForm           , ] = useState( null  );
  // const [ crudFormIdHash     , setCrudFormIdHash     , ] = useState( null  );
  // const [ crudFormTimestamp  , setCrudFormTimestamp  , ] = useState( null  );

  const [ state, setState, ] = useState(INITIAL_STATE);

  useEffect(() => {
    setState({
      ...state,
      creatable: getCreatable(),
      crudFormIdHash: getIdHash( profile.uid, state.crudFormTimestamp, ),
    })
  }, [ state.crudFormTimestamp, ],);
  
  // useEffect(() => {
  //   const r = getCreatable();
  //   setCreatable(r);
  // }, [],);

  // useEffect( () => {
  //   console.log('state\n', state,);
  // }, [ state, ],);

  // useEffect( () => {
  //   const creatable = getCreatable();
  //   setState({ ...state, creatable, });
  // }, [], );

  // const handleOpenDialog = () => {
  //   const creatable = getCreatable();
  //   setState({ ...state, creatable, });
  // }

  const getSnackbar = () =>
    <Snackbar
      className="mb-24" 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center', // 'left',
      }}
      open={snackbarIsOpen}
      autoHideDuration={AUTOHIDE_DURATION}
      onClose={onCloseSnackbar}
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

  // // app/layouts/crud/CRUDView.js
  // const getStateOpenCreateDialog = () => {
  //   const crudFormTimestamp = Date.now();
  //   const crudFormIdHash = getIdHash( profile.uid, crudFormTimestamp, );
  //   const out = { crudFormIdHash, crudFormTimestamp, }
  //   // console.log('out\n', out,);
  //   return out;
  // }

  // this: handlers: from: src/app/layouts/crud/CRUDView.js

  // const handleClickCreateButton = () => setState(
  //   getStateOpenCreateDialog()
  //   // , () => console.log('state\n', state,)
  // );

  // app/layouts/crud/CRUDView.js
  const handleCreateItem = e => {
    // console.log('state\n', state);
    // const { handleCloseDialog, handleRefresh, } = this;
    const { crudForm, crudFormTimestamp, crudFormIdHash, creatable, } = state;
    // console.log('creatable\n', creatable);
    // const { createItem, } = props; // profile, settings, dashboard,
    // const { uid, } = profile;
    // const { path, } = creatable;

    const errors = getCreateItem({ e, crudForm, crudFormTimestamp, crudFormIdHash, createItem, creatable, });
    if(errors) setState({...state, errors,});
    else onCloseDialog();
  }

  // app/layouts/crud/CRUDView.js
  const handleChangeForm = event => {
    const { crudForm, } = state;
    // console.log('target\n', event.target);
    const { id, value, } = event.target;
    // console.log('id\n', id); // 'name'
    // console.log('value\n', value); // 'john doe'
    // console.log('crudForm\n', crudForm); // 'john doe'
    const targetFieldIndex = crudForm.findIndex( field => field.id === id );
    // console.log('targetFieldIndex\n', targetFieldIndex); // 'john doe'

    // begin mask
    // console.log('targetFieldIndex\n', crudForm[targetFieldIndex],);
    crudForm[targetFieldIndex].value = value;
    // const maskedValue = getMaskedValue( value, crudForm[targetFieldIndex].mask, );
    // crudForm[targetFieldIndex].value = maskedValue;
    // end mask

    setState({ ...state, crudForm, }
      // ,() => console.log('state\n', state)
    );
  }

  const handleEnterDialog = () => { // type
    const TYPE = 'loadNewData'; // create only, no update
    // type: string: enum: 'loadNewData' | 'loadSavedData'
    // setState(
    //   { ...state, crudForm : getFormFields(type, props.creatable.fields, null,) }
    //   // ,() => console.log('state\n', state)
    // )
    // const { fields, } = creatable;
    const { fields, } = state.creatable;
    const crudForm = getFormFields( TYPE, fields, null, );
    // setCrudForm(crudForm);
    setState({ ...state, crudForm, });
  }

  // const handleCloseDialog = () => {
  //   // setState({
  //   //   ...INITIAL_STATE_DIALOG,
  //   //   crudForm: null, // state.createFormInitialState,
  //   // });
  //   setState(INITIAL_STATE);
  // };

  // props: creatable from: src/app/config/ComponentRouter.js

  const getCreatable = () => {
    const args = { profile, settings, };
    // console.log('args\n', args,);
    const componentsNavConfig = getComponentsNavConfig(args);
    // const matches = _.filter(componentsNavConfig, {id,},);
    // const item = matches[0];
    const item = getFindNested(componentsNavConfig, 'id', id,);
    const { crudConfig, } = item; // type: {component: type,}, dashboardConfig={},
    // console.log('crudConfig\n', crudConfig,);
    const { creatable, } = crudConfig;
    return creatable;
  }

  const getCreateDialog = () => {
    // console.log('dialogIsOpen\n', dialogIsOpen,);
    if(!state.crudFormTimestamp) setState({ ...state, crudFormTimestamp: Date.now(), });
    const { errors, crudForm, creatable, crudFormIdHash, crudFormTimestamp, } = state; //
    return (
      <CreateDialog
        // props
        createDialogIsOpen={dialogIsOpen} // createDialogIsOpen is props in crudView
        // state
        crudFormErrors={errors}
        crudFormIdHash={crudFormIdHash}
        crudFormTimestamp={crudFormTimestamp}
        crudForm={crudForm} creatable={creatable} // creatable is props in crudView
        // "this"
        onEnterDialog={handleEnterDialog} onChangeForm={handleChangeForm}
        onCloseDialog={onCloseDialog} onCreateItem={handleCreateItem}
      />
    );
  }

  // from: src/app/layouts/crud/CRUDView.js
  const getCreateDialogContainer = () =>
    <React.Fragment>
      {getSnackbar()}
      {getCreateDialog()}
    </React.Fragment>

  return getCreateDialogContainer();
}

const mapStateToProps = state => {
  const profile = state
               && state.firebase
               && state.firebase.profile;
  const settings = state
                && state.myApp
                && state.myApp.reducers
                && state.myApp.reducers.userDataReducer
                && state.myApp.reducers.userDataReducer.settings;
  // const dashboard = state
  //                && state.myApp
  //                && state.myApp.reducers
  //                && state.myApp.reducers.userDataReducer
  //                && state.myApp.reducers.userDataReducer.dashboard;
  const { dashboard, } = settings; // fold-in dashboard to subset of settings
  // console.log('profile\n', profile,);
  // console.log('settings\n', settings,);
  // console.log('dashboard\n', dashboard,); 
  return { profile, settings, dashboard, };
}

const mapDispatchToProps = dispatch => ({
  // CRUD item
  // common mistakes: 1. forget to use props... when calling function in class 2. copy/paste forget to change function name in mapStateToProps => dispatch
  createItem: ( item, creatable, ) => dispatch(createItem( item, creatable, )), // uid, settings, path , dashboard, // inspired by: src/app/components/forms/CreateLead.js
  // updateItem: ( path   , docId , newItem , oldItem   , updatable , ) => dispatch(updateItem( path , docId , newItem , oldItem   , updatable , )),
  // deleteItem: ( path   , docId , uid     , creatable , ) => dispatch(deleteItem( path , docId , uid     , creatable , )), // dashboard, 
  // actionItem: ( detail, actionable, ) => dispatch(actionItem( detail, actionable, )), // uid, navComponentId, dashboard, 
  // update dashboard
  // updateUserData: (path, newData,) => dispatch(updateUserData(path, newData,)),
})

// export default ComponentRouter;
// export default CreateDialogContainer;
export default compose(
  // withStyles(styles, { withTheme: true }),  
  connect( mapStateToProps, mapDispatchToProps, ), // 
)(CreateDialogContainer)