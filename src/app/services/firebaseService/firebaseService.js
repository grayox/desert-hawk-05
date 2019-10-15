import config from './firebaseServiceConfig';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// begin insert from marioplan/src/config/firebaseConfig.js
import 'firebase/firestore';
import { pickUserFromAuth } from 'app/config/AppConfig';
// end insert

class firebaseService {

  init() {
    firebase.initializeApp(config); // could cause duplicate initialization problems
    this.db = firebase.database();
    this.auth = firebase.auth();
    // move the following to src.store.js; see README.md steps 27-28
    // my add
    this.firestore = firebase.firestore();
    // end my add
    // begin insert from marioplan/src/config/firebaseConfig.js
    // firebase.initializeApp(config);
    // firebase.firestore().settings({ timestampsInSnapshots: true });
    // end insert
    // begin modify my add with mariplan insert
    // this.firestore = firebase.firestore().settings({ timestampsInSnapshots: true });
    // end modify my add with mariplan insert
  }

  // getUserData_orig = (userId) => {
  //   if (!firebase.apps.length) {
  //     return;
  //   }
  //   return new Promise((resolve, reject) => {
  //     this.db.ref(`users/${userId}`)
  //       .once('value')
  //       .then((snapshot) => {
  //         const user = snapshot.val();
  //         resolve(user);
  //       });
  //   });
  // };

  // begin my add
  userRef = ({ uid, }) => {
    try {
      return this.firestore //.doc(`users/${user.uid}`);
        // Note: The following line assumes a collection named 'users' already exists in the firestore
        // If this is not the case, you must manually create a colloection named 'users'.
        .collection('users')
        .doc(uid);
    } catch (e) {
      // console.warn(e.message);
      return false;
    }
  }

  getUserData = user => {
    // console.log('user', user); // debugger;
    const { userRef, } = this;
    // getUserData = userId =>
    // console.log('userId', userId);
    // console.log('firebase.apps\n', firebase.apps);
    return new Promise((resolve, reject,) => {
      if (!firebase.apps.length) {
        reject();
      }

      // ref: https://firebase.google.com/docs/firestore/query-data/get-data
      // const docRef = this.firestore.doc('users/azZBg5YjnyNFfk73nKZGolm9Mmg2');
      // const docRef = this.firestore.doc(`users/${userId}`);
      // const docRef = this.firestore //.doc(`users/${user.uid}`);
      //   .collection('users')
      //   .doc(user.uid);

      // docRef.get().then(doc => {
      if (userRef(user)) {
        userRef(user)
          .get()
          .then(doc => {
            if (doc.exists) {
              const data = doc.data();
              // console.log('Document data:\n', data);
              // debugger;
              resolve(data);
            } else {
              // // doc.data() will be undefined in this case
              // console.log('No such document!');
              // // begin my add
              // // console.log('Beginning to update user data...');
              // // console.log('user\n', user);
              // // debugger;
              // // this.updateUserData(user);
              resolve(user);
              // end my add
              // reject();
            }
          }).catch(error => {
            // console.log('Error getting document:\n', error);
            // console.log('user\n', user);
            // // debugger;
            // // TODO: fix following errors which occurs when offline or bad internet connection
            // // Uncaught (in promise) TypeError: userRef.set is not a function
            // // and/or
            // // Unhandled Rejection (TypeError): userRef.set is not a function
            // // Maybe show a grphic that says: "Check your internet connection.\nIt appears slow."

            // // userRef
            // //   .set(user)
            // //   .then(user => this.updateUserData(user))
            alert('Check your internet connection.\nIt appears slower than usual.')
            
            reject();
          });
      } else {
        // console.log('Saving user to firebase: uid:\n', user.uid);
        this.saveDocToFirestore(user.uid, `users/user/${user.uid}`);
        resolve(user);
      }
    });
  }

  // updateUserData_orig = (user) => {
  //   if (!firebase.apps.length) {
  //     return;
  //   }
  //   return this.firestore.doc(`users/${user.uid}`)
  //     .set(user);
  // };

  updateUserData = user => {
    // console.log('user\n', user);
    // debugger;
    if (!firebase.apps.length) {
      return;
    }
    // return this.db.ref(`users/${user.uid}`)
    // begin my add
    const {
      userRef,
      saveDocToFirestore,
      // auth,
      auth: { currentUser },
      auth: { currentUser: { uid } }, }
      = this;
    const createdAt = Date.now();
    const picked = pickUserFromAuth(currentUser);
    return userRef(picked) ? userRef(picked)
      .set({ ...picked, createdAt, })
      :
      saveDocToFirestore( picked, `users/user/${uid}`, )

    // // maybe we have no reason to pick fields and should just save the entire authuser object
    // // ref: https://stackoverflow.com/a/51551781
    // const picked = _.pick(user, [
    //   'uid', 'displayName', 'photoURL', 'email', 'emailVerified', 'phoneNumber', 'isAnonymous', 'providerData',
    // ]);
    // // const picked = _.pick(user, ['displayName', 'email',]); // ref: https://stackoverflow.com/a/51551781
    // // console.log('picked\n', picked);
    // const photoURLTemp = picked && picked.providerData && picked.providerData[0] && picked.providerData[0].photoURL;
    // // console.log('photoURLTemp\n', photoURLTemp);
    // const photoURL = photoURLTemp || null;
    // return this.userRef(user)
    //   .set({...picked, createdAt, photoURL, });
    //   // .set(user);

    // return this.firestore //.doc(`users/${user.uid}`);
    //   .collection('users')
    //   .doc(user.uid)
    // ref: https://stackoverflow.com/a/48158848
    // .set(user);
    // .set(Object.assign({}, user));
    // .set({ ...user});
    // .set({
    //   displayName: user.displayName,
    //   email: user.email,
    //   photoURL: user.photoURL,
    // });
    // end my add
  };

  onAuthStateChanged = (callback) => {
    if (!this.auth) {
      return;
    }
    // console.log('auth\n', this.auth);
    // debugger;
    this.auth.onAuthStateChanged(callback);
  };

  signOut = () => {
    if (!this.auth) {
      return;
    }
    this.auth.signOut();
  }

  // start my add

  saveDocToFirestore = (data, path,) => {
    const collectionRef = this.firestore.collection(path);
    // console.info('submitting...', model);  
    collectionRef.add(data)
      .then(docRef => {
        // console.log('Document written with ID: ', docRef.id);
      })
      .catch(error => {
        // console.error('Error adding document: ', error);
      });
    // console.info('submitted: ', model);
  }

  //  end my add

}

const instance = new firebaseService();

export default instance;