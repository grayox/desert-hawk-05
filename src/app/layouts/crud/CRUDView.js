import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import compose from 'recompose/compose';
import { connect, } from 'react-redux';
import { createItem, updateItem, deleteItem, actionItem, } from './store/actions';

import _ from '@lodash';

import { updateUserData, } from 'app/store/actions/my-actions'; // updateSettings, updateDashboard, saveUserDataToFirestore,
import FetchUserData from 'app/containers/FetchUserData';

// @material-ui/core
import { withStyles, withWidth, Grid, Snackbar, } from '@material-ui/core';

import ViewEmpty from './ViewEmpty';
import ListPane from './list/ListPane';
import DetailPane from './detail/DetailPane';
import { CreateDialog, UpdateDialog, DeleteDialog, ActionDialog, } from './ItemDialogs';

import MediaWidth from 'app/layouts/MediaWidth';
import {
  getFormFields, getIdHash, getAlert, getCreateItem, // getMaskedValue,
  // getForm, getSearchableFields, getItemsFilteredBySearch,
} from 'app/config/AppConfig';


const styles = theme => ({
  root: {
    // height: '100%',
    // temp-border
    // border: 'solid black 4px',
    height: 'calc(100vh - 116px)',
    boxSizing: 'border-box',
    display: 'flex',
  },
  wrapper: {
    // temp-border
    // border: 'solid red 4px',
    // height: '100%',
    // maxHeight: '100%',
    height: 'calc(100vh - 116px - 48px)',
    flexGrow: 1, // extends content to right edge of viewport
    boxSizing: 'border-box',
    // overflow: 'auto',
  },
  // progress: {
  //   margin: theme.spacing.unit * 2,
  // },
});

// const AUTOHIDE_DURATION = 4500;
const AUTOHIDE_DURATION = 2000;

const STATE_OPEN_UPDATE_DIALOG = {
  createDialogIsOpen : false ,
  updateDialogIsOpen : true  ,
  deleteDialogIsOpen : false ,
  actionDialogIsOpen : false ,
}

const STATE_OPEN_DELETE_DIALOG = {
  createDialogIsOpen : false ,
  updateDialogIsOpen : false ,
  deleteDialogIsOpen : true  ,
  actionDialogIsOpen : false ,
}

const STATE_OPEN_ACTION_DIALOG = {
  createDialogIsOpen : false ,
  updateDialogIsOpen : false ,
  deleteDialogIsOpen : false ,
  actionDialogIsOpen : true  ,
}

const INITIAL_STATE_DIALOG = {
  createDialogIsOpen : false     ,
  updateDialogIsOpen : false     ,
  deleteDialogIsOpen : false     ,
  actionDialogIsOpen : false     ,
  crudForm           : undefined ,
  crudFormErrors     : {}        ,
  crudFormIdHash     : undefined ,
  crudFormTimestamp  : undefined ,
}

const INITIAL_STATE_SNACKBAR = {
  snackbarIsOpen  : false ,
  snackbarMessage : null  ,
}

const INITIAL_STATE_DETAIL = {
  detail        : undefined ,
  selectedIndex : undefined ,
}

const INITIAL_STATE = {
  ...INITIAL_STATE_DETAIL,
  ...INITIAL_STATE_DIALOG,
  ...INITIAL_STATE_SNACKBAR,
}

const SNACKBAR_MESSAGE = 'Processing...';

class CRUDView extends Component {

  state = INITIAL_STATE;

  // constructor(props) {
  //   super(props);
  //   this.state = INITIAL_STATE;
  // }

  // componentWillMount = () => {
  //   // this.setCreateFormInitialState(this.props.creatable.fields);
  // }

  // componentDidMount = () => {
  //   window.scrollTo(0, 0,);
  //   // this.getInitialItemsFromProps();
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.dashboard !== prevProps.dashboard) {
  //     const newDashboard = this.fetchData(this.props.userID);
  //     this.props.updateUserData('dashboard', newDashboard,);
  //   }
  // }

  // getInitialItemsFromProps = () => this.setState({items: this.props.items,})

  getStateOpenCreateDialog = () => {
    const crudFormTimestamp = Date.now();
    const crudFormIdHash = getIdHash(this.props.profile.uid, crudFormTimestamp,);
    const out = {
      crudFormIdHash             ,
      crudFormTimestamp          ,
      createDialogIsOpen : true  ,
      updateDialogIsOpen : false ,
      deleteDialogIsOpen : false ,
      actionDialogIsOpen : false ,
    }
    // console.log('out\n', out,);
    return out;
  }

  handleChangeUserData = ( path, newData, ) => { // saveDataToFirestore, 
    // console.log('handleChangeUserData-path\n', path,)
    // console.log('handleChangeUserData-data\n', newData,)
    // console.log('saveDataToFirestore\n', saveDataToFirestore,)
    const { updateUserData, } = this.props; // saveUserDataToFirestore, 
    updateUserData( path, newData, ); // updates global state
    // if(saveDataToFirestore) {
    //   const dataPath = [ 'users' , uid , path , ].join('/');
    //   saveUserDataToFirestore( dataPath, newData, ); // updates firebase
    // }
  }

  handleOpenUpdateDialog  = () => this.setState({ ...STATE_OPEN_UPDATE_DIALOG, });
  handleOpenDeleteDialog  = () => this.setState({ ...STATE_OPEN_DELETE_DIALOG, });
  handleOpenActionDialog  = () => this.setState({ ...STATE_OPEN_ACTION_DIALOG, });
  handleClickCreateButton = () => this.setState(
    this.getStateOpenCreateDialog()
    // , () => console.log('state\n', this.state,)
  );
  handleOpenSnackbar = snackbarMessage => this.setState({snackbarIsOpen: true, snackbarMessage,});

  handleCloseSnackbar = ( event, reason, ) => {
    if (reason === 'clickaway') {
      this.handleRefresh();
      return;
    }
    // setSnackbarIsOpen(false);
    this.setState({snackbarIsOpen: false,}, () => this.handleRefresh());
  }

  // handleChangeFormObject = event => {
  handleChangeForm = event => {
    const { crudForm, } = this.state;
    
    const target = event && event.target;
    // console.log('target\n', target);

    // // below does not work to fix cursor jumping bug
    // // ref: https://stackoverflow.com/a/49648061/1640892
    // const caret = event.target.selectionStart
    // const element = event.target
    // window.requestAnimationFrame(() => {
    //   element.selectionStart = caret
    //   element.selectionEnd = caret
    // });
    
    const { id, value, } = target;
    // console.log('value\n', value,);
    // let id, value;
    // if ( event.target && event.target.id && event.target.value ) {
    //   id = event.target.id;
    //   value = event.target.value;
    // } else {
    //   id = 'phone';
    //   value = event;
    // }

    // console.log('id\n', id); // 'name'
    // console.log('value\n', value); // 'john doe'
    // console.log('crudForm\n', crudForm); // 'john doe'
    const targetFieldIndex = crudForm.findIndex( field => field.id === id );
    // console.log('targetFieldIndex\n', targetFieldIndex); // 'john doe'

    // // begin mask
    // // console.log('targetFieldIndex\n', crudForm[targetFieldIndex],);
    crudForm[targetFieldIndex].value = value;
    // // const maskedValue = getMaskedValue( value, crudForm[targetFieldIndex].mask, );
    // // crudForm[targetFieldIndex].value = maskedValue;
    // // end mask

    this.setState({ crudForm, }
      ,() => console.log('state\n', this.state)
    );
  }

  // handleChangeFormString = callback => {
  //   console.log('callback\n', callback,);
  //   // id = 'phone'; value = event;
  // }

  // getChangeFormConfig = () => ({
  //   string: this.handleChangeFormString,
  //   object: this.handleChangeFormObject,
  // })

  // handleChangeForm1 = event => {
  //   const value = event && event.target && event.target.value;
  //   console.log('value\n', value,);
  //   // const type = typeof callback;
  //   // console.log('type\n', type,);
  //   // const changeFormConfig = this.getChangeFormConfig();
  //   // const out = changeFormConfig[type](callback);
  //   // console.log('out\n', out,);
  //   // return out;
  // } 

  handleEnterDialog = type =>
    // type: string: enum: 'loadNewData' | 'loadSavedData'
    this.setState(
      { crudForm : getFormFields(type, this.props.creatable.fields, this.state.detail,) }
      // ,() => { console.log('state\n', this.state); debugger; }
    )

  handleRefresh = () => this.props.onRefresh()
  handleCloseDialog = () => this.setState(INITIAL_STATE_DIALOG)

  handleCreateItem = e => {
    // console.log('state\n', this.state);
    const { handleCloseDialog, handleOpenSnackbar, } = this; // handleRefresh,
    const { crudForm, crudFormTimestamp, crudFormIdHash, } = this.state;
    const { createItem, creatable, } = this.props; // profile, settings, dashboard,
    // const { uid, } = profile;
    // const { path, } = creatable;

    const errors = getCreateItem({ e, crudForm, crudFormTimestamp, crudFormIdHash, createItem, creatable, });
  
    if(!_.isEmpty(errors)) {
      this.setState({ crudFormErrors: errors, },);
      console.log('errors\n', errors,);
      return null;
    } else {
      handleCloseDialog();
      // handleRefresh();
      // handleOpenSnackbar('Item created');
      handleOpenSnackbar(SNACKBAR_MESSAGE);
    }
  }
  
  handleUpdateItem = () => {
    // console.log('state\n', this.state);
    // console.log('props\n', this.props);
    const { handleCloseDialog, handleOpenSnackbar, } = this; // handleRefresh,
    const { detail, crudForm, } = this.state; // selectedIndex,
    const { readable, updatable, updateItem, } = this.props; // items, profile, // settings,
    // const { uid, } = profile;
    // console.log('selectedIndex', selectedIndex,);
    // console.log('selectedItem', items[selectedIndex],);
    // const item = items[selectedIndex];
    // const docId = item.docId;
    const docId = detail.docId;
    // console.log('docId', docId,);

    const newItem = {};
    crudForm.forEach( item => {
      let newVal = item.value;
      if(newVal === undefined || newVal === null) return; // newVal = null; //
      newItem[item.id] = newVal;
    });

    // old item: detail
    // new item: crudForm => newItem
    updateItem( readable, docId, newItem, detail, updatable, ); // note: readable is the path // uid, // settings,
    handleCloseDialog();
    // handleRefresh();
    // handleOpenSnackbar('Item updated');
    handleOpenSnackbar(SNACKBAR_MESSAGE);
  }

  handleDeleteItem = () => {
    // console.log('state\n', this.state);
    // console.log('props\n', this.props);
    const { handleCloseDialog, handleOpenSnackbar, } = this; // handleRefresh,
    const { selectedIndex, } = this.state;
    const { items, readable, deletable, deleteItem, profile, dashboard, } = this.props; // settings,
    const { uid, } = profile;
    // console.log('selectedIndex', selectedIndex,);
    // console.log('selectedItem', items[selectedIndex],);
    const item = items[selectedIndex];
    const docId = item.docId;
    // console.log('docId', docId,);
    deleteItem( readable, docId, uid, dashboard, deletable, ); // readable is the path // settings,
    handleCloseDialog();
    // handleRefresh();
    // handleOpenSnackbar('Item deleted');
    handleOpenSnackbar(SNACKBAR_MESSAGE);
  }

  handleListItemClick = ( event, selectedIndex, ) => {
    this.setState({ selectedIndex, });
  };

  handleNavBack = () => {
    const { items, } = this.props;
    const { selectedIndex, } = this.state;
    const newSelectedIndex = selectedIndex - 1;
    this.setState({
      selectedIndex: Math.max(0, newSelectedIndex,),
      detail: items[newSelectedIndex],
    });
  };
  
  handleNavNext = () => {
    const BUFFER = 1;
    const { items, } = this.props;
    const { selectedIndex, } = this.state;
    const limit = items.length - 1;
    const newSelectedIndex = selectedIndex + 1;
    this.setState({
      selectedIndex: Math.min(limit, newSelectedIndex),
      detail: items[newSelectedIndex],
    });
    // fetch more data if we hit the last item
    if(newSelectedIndex === (limit - BUFFER)) this.props.onNext();
  };

  handleAction = e => {
    // alert('You clicked me!');
    // console.log('state\n', this.state);
    // console.log('props\n', this.props);
    const { handleCloseDialog, handleOpenSnackbar, } = this; // handleRefresh,
    const { detail, } = this.state;
    const { actionItem, actionable, } = this.props; // settings, profile, dashboard, readable, navComponentId,
    // const { uid, } = profile;

    // console.log('uid\n', uid,)
    // console.log('dashboard\n', dashboard,)
    // const { docId } = detail;
    actionItem( detail, actionable, ); // uid, navComponentId, dashboard,

    handleCloseDialog();
    // handleRefresh();
    // handleOpenSnackbar('Action complete');
    handleOpenSnackbar(SNACKBAR_MESSAGE);
  }

  handleToggle = ( detail, side, selectedIndex, ) => {
    // console.log('model\n', model);
    // const { detail } = this.state;
    const isList = (side === 'list');
    this.setState({ ...INITIAL_STATE_DETAIL, }
      // promise completes animation effect
      ,() => { if(isList) this.setState({ detail, selectedIndex, }) }
    );
  }

  handleClickStar = ( index, starred, ) => {
    console.log('index\n', index,);
    console.log('starred\n', starred,);
    // consider array membership
    // ref: https://firebase.google.com/docs/firestore/query-data/queries#array_membership
  }

  render() {
    const {
      detail, deleteDialogIsOpen, actionDialogIsOpen, selectedIndex,
      createDialogIsOpen, updateDialogIsOpen,
      crudForm, crudFormErrors, crudFormTimestamp, crudFormIdHash,
    } = this.state;
    const {
      classes, profile, settings, dashboard, items, condensed, onNext, hasMore, miniDashboard, navComponentId,
      creatable, readable, updatable, deletable, actionable, searchable, sortable, filterable, starrable, alertable,
      searchMenuOptions, filterMenuOptions, sortMenuOptions, searchFilterSortModelWithLabels,
      onSearchFilterSort, onResetSearchFilterSort,
    } = this.props;
    const {
      handleCloseDialog, handleDeleteItem, handleChangeUserData,
      handleClickCreateButton, handleClickStar, handleToggle, handleAction,
      handleOpenUpdateDialog, handleOpenDeleteDialog, handleOpenActionDialog,
      handleEnterDialog, handleChangeForm, handleCreateItem, handleUpdateItem,
      handleNavBack, handleNavNext, // getFormFields,
    } = this;

    // console.log('props\n', this.props,);
    // console.log('state\n', this.state,);
    // console.log('items\n', items,);
    // console.log('detail\n', detail,);
    // console.log('miniDashboard\n', miniDashboard,);

    const ready1 = !!profile;
    if(!ready1) return null;

    const { uid, } = profile;
    
    const getFetchUserData = () =>
      <FetchUserData
        // path="dashboard"
        path="settings"
        uid={uid}
        onChange={handleChangeUserData}
      />

    const getViewEmpty = () =>
      <React.Fragment>
        { getCreateDialog() }
        <ViewEmpty
          side="list" onClick={handleClickCreateButton} creatable={creatable}
          searchFilterSortModelWithLabels={searchFilterSortModelWithLabels}
          onResetSearchFilterSort={onResetSearchFilterSort}
        />
      </React.Fragment>

    const getSnackbar = message =>
      <Snackbar
        className="mb-24" 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center', // 'left',
        }}
        open={this.state.snackbarIsOpen}
        autoHideDuration={AUTOHIDE_DURATION}
        onClose={this.handleCloseSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.snackbarMessage}</span>}
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
    
    const getCreateDialog = () =>
      <CreateDialog
        crudForm={crudForm} crudFormTimestamp={crudFormTimestamp}
        crudFormIdHash={crudFormIdHash} crudFormErrors={crudFormErrors}
        creatable={creatable} createDialogIsOpen={createDialogIsOpen}
        onEnterDialog={handleEnterDialog} onChangeForm={handleChangeForm}
        onCloseDialog={handleCloseDialog} onCreateItem={handleCreateItem}
      />

    const getUpdateDialog = () =>
      <UpdateDialog
        detail={detail} crudForm={crudForm} crudFormErrors={crudFormErrors}
        updatable={updatable} updateDialogIsOpen={updateDialogIsOpen}
        onChangeForm={handleChangeForm} onCloseDialog={handleCloseDialog}
        onUpdateItem={handleUpdateItem} onEnterDialog={handleEnterDialog}
      />

    const getDeleteDialog = () =>
      <DeleteDialog
        isOpen={deleteDialogIsOpen} onCancel={handleCloseDialog}
        onDelete={handleDeleteItem} onClose={handleCloseDialog}
      />
    
    const getActionDialog = () =>
      <ActionDialog
        isOpen={actionDialogIsOpen} actionable={actionable} onAction={handleAction}
        onCancel={handleCloseDialog} onClose={handleCloseDialog}
      />

    const getListPane = () =>
      <ListPane
        items={items}
        selectedIndex={selectedIndex}
        hasMore={hasMore}
        
        navComponentId={navComponentId}
        creatable={creatable}
        readable={readable}
        searchable={searchable}
        filterable={filterable}
        sortable={sortable}
        starrable={starrable}

        dashboard={dashboard}
        miniDashboard={miniDashboard}
        searchMenuOptions={searchMenuOptions}
        filterMenuOptions={filterMenuOptions}
        sortMenuOptions={sortMenuOptions}
        // for initial state after re-render following data fetch...
        searchFilterSortModelWithLabels={searchFilterSortModelWithLabels}

        onNext={onNext}
        onClickStar={handleClickStar}
        onToggle={handleToggle}

        onClickCreateButton={handleClickCreateButton}
        onSearchFilterSort={onSearchFilterSort}
      />
    const getDetailPane = () =>
      <DetailPane
        detail={detail}
        condensed={condensed}
        itemsLength={items.length}
        selectedIndex={selectedIndex}
        navComponentId={navComponentId}
        creatable={creatable}
        readable={readable}
        updatable={updatable}
        deletable={deletable}
        actionable={actionable}
        starrable={starrable}
        dashboard={dashboard}
        miniDashboard={miniDashboard}
        onClickStar={handleClickStar}
        onToggle={handleToggle}
        onUpdate={handleOpenUpdateDialog}
        onDelete={handleOpenDeleteDialog}
        onAction={handleOpenActionDialog}
        onNavBack={handleNavBack}
        onNavNext={handleNavNext}
        // getFormFields={getFormFields}
        // index={index} // never select summary on detail side
      />    

    const getMobileContent = () => detail ? getDetailPane() : getListPane()
    const getTabletContent = () => getMobileContent()
    const getLaptopContent = () =>
      <Grid container spacing={16}>
        <Grid item xs={6}>{getListPane()}</Grid>
        <Grid item xs={6}>{getDetailPane()}</Grid>
      </Grid>

    const getMediaContent = () =>
      <div className={classes.wrapper}>
        <MediaWidth
          mobile={getMobileContent()}
          tablet={getTabletContent()}
          laptop={getLaptopContent()}
        />
      </div>
    
    const getMainContent = () => // {
      // console.log('settings\n', settings,);
      // return (
        <React.Fragment>
          { getFetchUserData() } {/* updates dashboard after CRUD task */}
          { getCreateDialog()  }
          { getUpdateDialog()  }
          { getDeleteDialog()  }
          { getActionDialog()  }
          { getSnackbar()      }
          { getMediaContent()  }
        </React.Fragment>
      // );
    // }

    const getCrudView = () =>
      // <FuseScrollbars className="overflow-auto">
      <div
        key={settings}
        className={classes.root}
      >
        {
          ( items && !!items.length )
          ?
          getMainContent()
          :
          getViewEmpty()
        }
      </div>   
      // </FuseScrollbars>

    const getAltertable = () => alertable ? getAlert(dashboard, getCrudView(),) : getCrudView()

    return getAltertable();
  }

}

CRUDView.propTypes = {
  createItem: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,

  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  navComponentId: PropTypes.string.isRequired,
  miniDashboard: PropTypes.array,
  condensed: PropTypes.bool, // one-line per list item in detail pane
  starrable: PropTypes.bool,
  alertable: PropTypes.bool,
  searchable: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  sortable: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  filterable: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),

  actionable: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  creatable: PropTypes.oneOfType([ // create button in list pane
    PropTypes.object,
    PropTypes.bool,
  ]),
  readable: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  updatable: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  deletable: PropTypes.bool,
};

CRUDView.defaultProps = {
  navComponentId: '',
  miniDashboard: [],
  condensed: false,
  searchable: false,
  sortable: false,
  filterable: false,
  starrable: false,
  // actionable: false,
  alertable: false,
  creatable: false,
  // readable: false,
  updatable: false,
  deletable: false,
};

const mapDispatchToProps = dispatch => ({
  // CRUD item
  // common mistakes: 1. forget to use this.props... when calling function in class 2. copy/paste forget to change function name in mapStateToProps => dispatch
  createItem: ( item, creatable, ) => dispatch(createItem( item, creatable, )), // uid, settings, path , dashboard, // inspired by: src/app/components/forms/CreateLead.js
  updateItem: ( path   , docId , newItem , oldItem   , updatable , ) => dispatch(updateItem( path , docId , newItem , oldItem   , updatable , )),
  deleteItem: ( path   , docId , uid     , creatable , ) => dispatch(deleteItem( path , docId , uid     , creatable , )), // dashboard, 
  actionItem: ( detail, actionable, ) => dispatch(actionItem( detail, actionable, )), // uid, navComponentId, dashboard, 
  // update dashboard
  updateUserData: (path, newData,) => dispatch(updateUserData(path, newData,)),
})

// export default CRUDView;
// export default withStyles(styles)(CRUDView);
export default compose(
  withStyles(styles),
  withWidth(),
  // connect( mapStateToProps, mapDispatchToProps, ),
  connect( null, mapDispatchToProps, ),
)(CRUDView);