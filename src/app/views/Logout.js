import React from 'react';
import { connect, } from 'react-redux';
import { Redirect, } from 'react-router-dom';
// import firebaseService from 'firebaseService';
// import { logoutUser, } from 'auth/store/actions/user.actions';
import { logoutUser, } from 'app/auth/store/actions/user.actions';

const Logout = props => {
  // ref: https://reacttraining.com/react-router/web/example/auth-workflow
  // console.log('Logging out...');
  // alert('Logging out...');
  props.logoutUser();
  // add logout functionality
  // firebaseService.signOut();
  return (
    <Redirect to='/login' />
  );
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
})
 
// export default Logout;
export default connect( null, mapDispatchToProps, )(Logout);