// inspired by src/store/actions/fuse/settings.actions.js

// begin my add
// import _ from '@lodash';

export const UPDATE_SETTINGS          = '[SETTINGS] UPDATE SETTINGS';
export const UPDATE_SETTINGS_SUCCESS  = '[SETTINGS] UPDATE SETTINGS SUCCESS';
export const UPDATE_SETTINGS_ERROR    = '[SETTINGS] UPDATE SETTINGS ERROR';
export const UPDATE_DASHBOARD_SUCCESS = '[DASHBOARD] UPDATE DASHBOARD SUCCESS';
export const UPDATE_FEEDBACK_RATING   = '[FEEDBACK] UPDATE RATING';
export const UPDATE_FEEDBACK_NOTE     = '[FEEDBACK] UPDATE NOTE';
// end my add

// export const SET_SETTINGS = '[SETTINGS] SET SETTINGS';
// export const SET_DEFAULT_SETTINGS = '[SETTINGS] SET DEFAULT SETTINGS';
// export const RESET_DEFAULT_SETTINGS = '[SETTINGS] RESET DEFAULT SETTINGS';

// export function setSettings(value) {
//   return {
//     type: SET_SETTINGS,
//     value
//   }
// }

// export function setDefaultSettings(value) {
//   return {
//     type: SET_DEFAULT_SETTINGS,
//     value
//   }
// }

// export function resetSettings(value) {
//   return {
//     type: RESET_DEFAULT_SETTINGS,
//     value
//   }
// }

// begin my add

// const syncData = ({ item, pathArray, isSync, }) => {
//   console.log('item\n', item,);
//   console.log('pathArray\n', pathArray,);
//   console.log('isSync\n', isSync,);
//   if(!!isSync) return null; // prevent infinite loop (redundant)
  
//   const syncConfig = {
//     settings  : 'dashboard' ,
//     dashboard : 'settings'  ,
//   }
//   const oldType = pathArray[2]; // 'settings'|'dashboard' // pathArray = ['user', uid, 'settings'|'dashboard',]
//   const newType = syncConfig[oldType]; // 'dashboard'|'settings'
//   const newPathArray = [pathArray[0], pathArray[1], newType,];
//   const newPath = newPathArray.join('/');
//   console.log('newPath\n', newPath,);
//   const newItem = _.pick(item, [ 'geoNation', 'geoRegion', 'geoLocal', 'bizCategory', ]);
//   console.log('newItem\n', newItem,);
//   // xTODOx: 1. get fields common to settings and dashboard >> insert into .pick()
//   //         2. marge newItem into: 'settings'|'dashboard'
//   saveUserDataToFirestore( newPath, newItem, true, );
// }

// updates global state in redux store
// TODO: consider calling updateUserData() inside saveUserDataToFirestore()
export const updateUserData = ( path, value, ) => {
  // path: string: 'settings' | 'dashboard' | 'feedbackRating' | 'feedbackRating'
  // console.log('path\n', path);
  // console.log('value\n', value);
  const typeConfig = {
    // settings: UPDATE_SETTINGS,
    settings: UPDATE_SETTINGS_SUCCESS,
    dashboard: UPDATE_DASHBOARD_SUCCESS,
    feedbackRating: UPDATE_FEEDBACK_RATING,
    feedbackNote: UPDATE_FEEDBACK_NOTE,
  }
  const out = {
    type: typeConfig[path],
    value,
  }
  // console.log('out\n', out);
  return out;
}

// // export function updateSettings(value) {
// export const updateSettings = value => {
//   // console.log('updateSettingsValue\n', value);
//   const newData = value || getInitialValues();
//   return {
//     type: UPDATE_SETTINGS,
//     value: newData, // value,
//   }
// }

// export const updateDashboard = value => {
//   console.log('updateDashboardValue\n', value);
//   const newData = value || getInitialValues();
//   return {
//     type: UPDATE_DASHBOARD,
//     value: newData, // value,
//   }
// }

// end my add

// begin my add 2

// source: https://github.com/iamshaunjp/React-Redux-Firebase-App/blob/lesson-18/marioplan/src/store/actions/projectActions.js
// export const createItem = ( path, item, ) =>
// updates data in firestore
export const saveUserDataToFirestore = ( path, item, ) => // isSync,
  //{
  // console.log('path\n', path,); // don't use this (without curly braces)
  // console.log('item\n', item,); // don't use this (without curly braces)
  // return (dispatch, getState, { getFirebase, getFirestore, }) => {
  // console.log('path\n', path,);
  // console.log('item\n', item,);
  // console.log('isSync\n', isSync,);
  
  // this pattern is called currying
  // this function is called later, by redux
  (dispatch, getState, { getFirebase, getFirestore, }) => {
    // path: string: 'users/<uid>/dashboard' // keeps this method simple and most flexible
    // console.log('path\n', path,); // use this
    // console.log('item\n', item,); // use this

    // fixes bug:
    // Unhandled Rejection (FirebaseError): Invalid path (users//dashboard). Paths must not contain // in them.
    // duplicated at: src/app/containers/LoadAsync.js
    const ready1 = !path.includes('//');
    // console.log('ready1', ready1,);
    if(!ready1) return null;
    
    const pathArray = path.split('/');
    const pathArrayLength = pathArray.length;
    
    // depends on data structure model
    // oot-level collections instead of subcollections vs nested data in a document
    // const ready2 = (pathArrayLength === 2); // === 3 old data structure: subcollections
    const ready2 = !!pathArrayLength;
    if(!ready2) return null;
    
    // console.log('pathArray\n', pathArray,);
    // console.log('pathArray[1]\n', pathArray[1],);
    // console.log('pathArrayLength\n', pathArrayLength,);

    // get dispatch type
    const dispatchTypeConfig = {
      dashboard : UPDATE_DASHBOARD_SUCCESS ,
      settings  : UPDATE_SETTINGS_SUCCESS  ,
    };
    const dispatchType = dispatchTypeConfig[pathArray[0]]; // [2] // 3 old data structure: subcollections

    const timestamp = Date.now();
    const newData = {
      ...item,
      createdAt: timestamp,
      deletedAt: 0, // delete for new data structure (root-level collections)

      // createdAt: new Date(),
      // authorFirstName: 'Net',
      // authorLastName: 'Ninja',
      // authorId: 12345,
    };

    // make async call to database
    const firestore = getFirestore();
    // console.log('item\n', item);
    // console.log('path\n', path,);
    // console.log('newData\n', newData,);
    // console.log('firestore\n', firestore);
    // console.log('getState\n', getState);

    // ref: https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    // firestore.collection('test').add({
    firestore

      // old data structure: subcollections: https://firebase.google.com/docs/firestore/manage-data/structure-data#nested_data_in_documents
      // .collection(path)
      // .add(newData) // adds new doc
      // new data structure: root-level collections: https://firebase.google.com/docs/firestore/manage-data/structure-data#root-level_collections
      .doc(path)
      .set(newData) // overwrites old doc

    .then( docRef => {
      // console.log('item\n', item,);
      // console.log('docRef\n', docRef,);
      // console.log('dispatchType\n', dispatchType,);
      // console.log('Document was written with id: ', docRef.id,);
      // dispatch({ type: 'SAVE_INITIAL_VALUES_SUCCESS' });
      // dispatch({ type: 'CREATE_ITEM_SUCCESS' });
      dispatch({
        type: dispatchType,
        value: item,
      });
      // const out1 = { item, pathArray, isSync, };
      // return out1;
      return item;
    })
    // .then( out1 => {
    //   // console.log('out1\n', out1,);
    //   if(!!out1.isSync) return out1; // prevent infinite loop
    //   syncData(out1);
    // })
    .catch( error => {
      // dispatch({ type: 'CREATE_ITEM_ERROR' }, error);
      // dispatch({ type: 'SAVE_INITIAL_VALUES_ERROR' }, error);
    });
  }//}

// export const updateItem = ( path, docId, newItem , oldItem, ) =>
// (dispatch, getState, { getFirebase, getFirestore, }) => {
//   // ref: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
//   // console.log('path\n', path);
//   // console.log('docId\n', docId);
//   // console.log('getState\n', getState);

//   const timestamp = Date.now();
//   const newData = {
//     ...newItem,
//     updatedAt: timestamp,
//     updates: {
//       replacedAt: timestamp,
//       item: oldItem,
//     },
//   };

//   // make async call to database
//   const firestore = getFirestore();
//   firestore
//     .collection(path)
//     .doc(docId)
//     // .set(newData // do NOT use .set() method because it overwrites the data
//     .update(newData // use .update() method: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
//     // ,{ merge: true, }
//     )
//   .then(() => {
//     dispatch({ type: 'UPDATE_ITEM_SUCCESS' });
//   }).catch( error => {
//     dispatch({ type: 'UPDATE_ITEM_ERROR' }, error);
//   });
// }

// // To "delete" a record, we do NOT use the .delete() method described here: https://firebase.google.com/docs/firestore/manage-data/delete-data
// // Instead, we will update the record with a field: deletedAt: Date.now()
// // https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
// // Then, we will query records without a deletedAt field as described here: https://firebase.google.com/docs/firestore/query-data/queries#compound_queries
// // example: citiesRef.where("state", "==", "CO").where("deletedAt", "==", false)
// export const deleteItem = ( path, docId, ) =>
//   (dispatch, getState, { getFirebase, getFirestore, }) => {
//     // console.log('path\n', path);
//     // console.log('docId\n', docId);
//     // console.log('getState\n', getState);

//     const timestamp = Date.now();
//     const newData = { deletedAt: timestamp, };

//     // make async call to database
//     const firestore = getFirestore();
//     firestore
//       .collection(path)
//       .doc(docId)
//       // .set(newData // do NOT use .set() method because it overwrites the data
//       .update(newData // use .update() method: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
//       // ,{ merge: true, }
//       )
//     .then(() => {
//       dispatch({ type: 'DELETE_ITEM_SUCCESS' });
//     }).catch( error => {
//       dispatch({ type: 'DELETE_ITEM_ERROR' }, error);
//     });
//   }

// end my add 2