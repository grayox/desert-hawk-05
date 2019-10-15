import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as userActions from 'auth/store/actions';
import * as userActions from './store/actions';
import { bindActionCreators } from 'redux';
// import * as Actions from 'store/actions';
import * as Actions from 'app/store/actions';
// import firebaseService from 'firebaseService';
import firebaseService from 'app/services/firebaseService';

import { pickUserFromAuth } from 'app/config/AppConfig'; // my add

class Auth extends Component {
  constructor(props) {
    super(props);
    // firebaseService.init(); // factory deleted in v1.2.8 // moved from componentDidMount() to firebaseCheck()
    this.firebaseCheck();
  }
  firebaseCheck = () => {
    firebaseService.init(); // factory added in v1.2.8
    firebaseService.onAuthStateChanged(authUser => {
      if (authUser) {
        // console.log('authUser\n', authUser); // my add
        // debugger;
        this.props.showMessage({ message: 'Logging in' });
        // Retrieve user data from Firebase
        const picked = pickUserFromAuth(authUser); // my add
        firebaseService.getUserData(picked/*authUser*v/.uid*/)
          .then(user => {
            // debugger;
            // this.props.setUserDataFirebase(user, authUser);
            this.props.setUserDataFirebase(user, picked);  // my add
            this.props.showMessage({ message: 'Logged in' });
          })
          // begin my add
          .catch(error => {
            console.error('error in firebaseCheck() in Auth.js (src/auth/Auth.js)\n', error);
          });
        // end my add
      }
    });
  };
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserDataFirebase: userActions.setUserDataFirebase,
    showMessage: Actions.showMessage,
    hideMessage: Actions.hideMessage,
  },
    dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
