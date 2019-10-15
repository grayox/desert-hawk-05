import * as Actions from 'app/store/actions/my-actions';

// inspired by marioplan...projectActions
export const updateSettings = settings => {
  console.log('settings\n', settings,);
  // prevent saving settings.id of previous settings object
  if(settings && settings.id) delete settings.id;
  return (dispatch, getState, {getFirestore}) => {
    // console.log('Hello, world!');
    // console.log('newSettings\n', newSettings);
    // debugger;

    const state = getState();
    // console.log('state\n', state);
    // const uid = state.auth.user.data.uid; // avoid; instead, use state.firebase.profile.uid
    const uid = state.firebase.profile.uid; // best practice
    // console.log('uid\n', uid);

    const firestore = getFirestore();
    // const profile = getState().firebase.profile;
    // const authorId = getState().firebase.auth.uid;
    
    const targetCollection = firestore

      // old data structure: subcollections: https://firebase.google.com/docs/firestore/manage-data/structure-data#nested_data_in_documents
      // .collection('users')
      // .doc(uid)
      // .collection('settings');

      // new data structure: root-level collections: https://firebase.google.com/docs/firestore/manage-data/structure-data#root-level_collections
      .collection('settings')
      .doc(uid);
      
    // const targetDoc = targetCollection.doc('current');
    const targetContent = {
      ...settings,
      createdAt: Date.now(),
      // createdAt: new Date(),
    };

    // targetCollection.add(targetContent) // archive with unique id
    // targetDoc.update(targetContent)
    // targetDoc.set(targetContent)

    // targetCollection.add(targetContent) // old data structure: subcollections: adds new doc
    targetCollection.set(targetContent)    // new data structure: root-level collections: overwrites old doc

    // targetDoc
    //   .update(targetContent) // update current
    //   .then(() => {
    //     targetCollection.add(targetContent); // archive with unique id
    //   })
    // firestore
    //   .collection('users')
    //   .doc(uid)
    //   .collection('settings')
    //   .add({
    //     ...settings,
    //     createdAt: Date.now(),
    //     // createdAt: new Date(),
    /// }).then(() => {
      .then(() => {
        // dispatch({ type: Actions.UPDATE_SETTINGS });
      dispatch({
        type: Actions.UPDATE_SETTINGS_SUCCESS,
        value: settings,
      });
    }).catch(err => {
      dispatch({
        type: Actions.UPDATE_SETTINGS_ERROR,
        value: settings,
      }, err);
    });
  }
}