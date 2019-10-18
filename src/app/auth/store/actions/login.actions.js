import axios from 'axios/index';
// import firebaseService from 'firebaseService';
import firebaseService from 'app/services/firebaseService';
// import { setUserData } from 'auth/store/actions/user.actions';
import { setUserData } from 'app/auth/store/actions/user.actions';
// import * as Actions from 'store/actions';
import * as Actions from 'app/store/actions';

// begin my add
import { pickUserFromAuth } from 'app/config/AppConfig';
// end my add

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({ email, password }) {
  const request = axios.get('/api/auth', {
    data: {
      email,
      password
    }
  });
  return (dispatch) =>
    request.then((response) => {
      if (!response.data.error) {
        dispatch(setUserData(response.data));
        return dispatch({
          type: LOGIN_SUCCESS,
        });
      }
      else {
        return dispatch({
          type: LOGIN_ERROR,
          payload: response.data.error
        });
      }
    });
}

export function loginWithFireBase({ username, password }) {
  // console.log('username\n', username, 'password\n', password);
  return (dispatch) =>
    firebaseService.auth && firebaseService.auth.signInWithEmailAndPassword(username, password)
      .then(() => {
        return dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch(error => {
        const usernameErrorCodes = [
          'auth/email-already-in-use',
          'auth/invalid-email',
          'auth/operation-not-allowed',
          'auth/user-not-found',
          'auth/user-disabled'
        ];
        const passwordErrorCodes = [
          'auth/weak-password',
          'auth/wrong-password'
        ];

        const response = {
          username: usernameErrorCodes.includes(error.code) ? error.message : null,
          password: passwordErrorCodes.includes(error.code) ? error.message : null
        };

        if (error.code === 'auth/invalid-api-key') {
          dispatch(Actions.showMessage({ message: error.message }));
        }

        return dispatch({
          type: LOGIN_ERROR,
          payload: response
        });
      });
}

// begin my adds

export function googleAuthProvider() {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    // ref: https://firebase.google.com/docs/auth/web/google-signin
    const provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // firebase.auth().languageCode = 'pt';
    // // // To apply the default browser preference instead of explicitly setting it.
    // // firebase.auth().useDeviceLanguage();
    // provider.setCustomParameters({
    //   'login_hint': 'user@example.com'
    // });
    // firebaseService.auth && firebaseService.auth().signInWithPopup(provider).
    firebase.auth().signInWithPopup(provider)
      .then( result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken;
        // The signed-in user info.
        const { user, } = result;
        // ...
        // begin my add
        // console.log('token\n', token);
        console.log('user\n', user);
        // debugger;
        const role = 'user';
        const data = pickUserFromAuth(user);
        const auth = { role, data, };
        console.log('auth\n', auth);
        // debugger;
        dispatch(setUserData(auth));
        dispatch({
          type: LOGIN_SUCCESS,
          // payload: user,
        });
        return user;
      })
      // .then(user => {
      //   console.log('user', user);
      //   debugger;
      // })
      .catch(error => {
        // // Handle Errors here.
        console.warn('error\n', error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential;
        // ...
        // const { code, message, email, credential } = error;
        return dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
  }
}

// end my adds