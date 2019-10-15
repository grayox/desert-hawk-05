import { Component } from 'react';
// import React, { Component } from 'react';
// import PropTypes from "prop-types";

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateSettings } from 'app/store/actions/my-actions';

// import { withStyles, } from '@material-ui/core';
import { loadSettingsData } from 'app/containers/LoadAsync';

const INITIAL_STATE = {
  items: null,
  isError: false,
  isLoading: true,
};

class FetchSettings extends Component {

  state = INITIAL_STATE;

  // constructor(props) {
  //   super(props);
  //   this.state = INITIAL_STATE;
  // }

  componentDidMount() {
    this.handleLoad();
  }

  componentWillUnmount() {
    this.handleCancel();
  }

  getPath() {
    // console.log('props\n', this.props);
    if(!this.props.user) return;
    const uid = this && this.props && this.props.user &&
                // this.props.user.data && this.props.user.data.uid;
                this.props.user.uid;
    // old data structure: subcollections: https://firebase.google.com/docs/firestore/manage-data/structure-data#nested_data_in_documents
    // return uid ? [ 'users' , uid , 'settings' , ].join('/') : null;
    // new data structure: root-level collections: https://firebase.google.com/docs/firestore/manage-data/structure-data#root-level_collections
    return uid ? [ 'settings' , uid , ].join('/') : null;
  }

  // refs: https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data
  // https://stackoverflow.com/a/55093394 | https://codesandbox.io/s/lrvwm88pv7
  // handleLoad() {
  //   this._asyncRequest = loadSettingsData().then(
  //     externalData => {
  //       this._asyncRequest = null;
  //       this.setState({externalData});
  //     }
  //   );
  // }
  handleLoad = async () => {
    // console.log('props\n', this.props);
    const settingsPath = this.getPath();
    // console.log('settingsPath\n', settingsPath);

    this.setState({
      isLoading: true,
    });
    // this._asyncRequest = loadSettingsData();
    this._asyncRequest = loadSettingsData(settingsPath);
    const settings = await this._asyncRequest;
    this.props.updateSettings(settings);
    // console.log('settings\n', settings);

    this._asyncRequest = null;
    this.setState({
      settings,
      isLoading: false,
    });
  }

  handleCancel = () => {
    this.setState(INITIAL_STATE);
    if (this._asyncRequest) {
      // this._asyncRequest.cancel();
      this._asyncRequest = null;
    }
  };
  
  render() {
    return null;
  }

}

FetchSettings.propTypes = {
  // classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  // console.log('state\n', state);
  // const settings = state.firestore.ordered.users
  //               && state.firestore.ordered.users[0]
  //               && state.firestore.ordered.users[0].settings
  //               && state.firestore.ordered.users[0].settings[0];
  const user = state.auth.user; // better source might be: const profile = state.firebase.profile;
  // const leads = state.firestore.ordered.leads;
  // const profile = state.firebase.profile;
  // const dataHasLoaded = user && leads && profile && settings;
  
  // console.log('user\n', user);
  // console.log('leads\n', leads);
  // console.log('profile\n', profile);
  // console.log('settings\n', settings);
  // console.log('dataHasLoaded\n', dataHasLoaded);
  
  // return { user, profile, settings, leads, dataHasLoaded, }
  //          YES   YES      NO        NO     NO
  return { user, }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSettings: settings => dispatch(updateSettings(settings)),
  }
}

export default compose(
  // withStyles(styles, { withTheme: true }),
  connect( mapStateToProps, mapDispatchToProps, ),
  // connect( mapDispatchToProps, ),
)(FetchSettings)
