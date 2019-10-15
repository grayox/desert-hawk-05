// source: https://github.com/iamshaunjp/React-Redux-Firebase-App/blob/lesson-18/marioplan/src/store/actions/projectActions.js
export const createLead = lead => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    console.log('lead\n', lead);
    console.log('firestore\n', firestore);
    console.log('getState\n', getState);
    firestore.collection('test').add({
      ...lead,
      authorFirstName: 'Net',
      authorLastName: 'Ninja',
      authorId: 12345,
      createdAt: Date.now(),
      // createdAt: new Date(),
    }).then( () => {
      dispatch({ type: 'CREATE_LEAD_SUCCESS' });
    }).catch( error => {
      dispatch({ type: 'CREATE_LEAD_ERROR' }, error);
    });
  }
};