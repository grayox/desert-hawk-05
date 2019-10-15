// inspired by: src/app/store/actions/my-actions/leadsActions.js
// ref: https://firebase.google.com/docs/firestore/quickstart#next_steps

// import { getComponentsNavConfig, } from 'app/config/AppConfig'; // OVERWRITE_OLD_DATA,
// import _ from '@lodash';

// const getNavElement = ({path, settings,}) => {
//   // path: string: 'leads', 'archive', 'outbox'
//   // console.log('path\n', path,);
//   const componentsNavConfig = getComponentsNavConfig(settings,);
//   // console.log('componentsNavConfig\n', componentsNavConfig,);
//   const out = componentsNavConfig.find(x =>
//     (x && x.crudConfig && x.crudConfig.readable && x.crudConfig.readable.path) === path
//   );
//   // console.log('out\n', out,);
//   return out;
// }

// const getComponentNavConfig = ( componentsNavConfig, navComponentId, ) => {
//   // navComponentId: string: 'inbox',
//   // console.log('navComponentId\n', navComponentId,);
//   // console.log('componentsNavConfig\n', componentsNavConfig,);
//   const matches = _.filter(componentsNavConfig, {id: navComponentId,},);
//   const out = matches[0];
//   // console.log('out\n', out,);
//   return out;
// }

// // replace by getIncrement() methed embedded in getCreatable(), getActionable, etc. and imported from AppConfig
// const getDashboardNewData = (path, oldData, incrementer, sourceDocId, creatable,) => {
//   // uid: string: 'abcxyz'
//   // path: string: 'leads'
//   // oldData: object: { net: 5, outbox: 4, ... }
//   // incrementer: string: 'onCreate' | 'onDelete' (deprecated)
//   // incrementer: integer: 1 | -1
//   // console.log('path\n', path,); // 'leads'
//   // console.log('oldData\n', oldData,); // 'abcxyz'
//   // console.log('incrementer\n', incrementer,); // 1
//   // console.log('sourceDocId\n', sourceDocId,); // 'abcxyz'
//   const timestamp = Date.now();
//   // const mapEntityPathNameToDashboard = {
//   //   leads: {
//   //     outbox: 1,
//   //     net: 1,
//   //   },
//   // };

//   // const dashItem = mapEntityPathNameToDashboard[path]; // 'outbox'
//   // const oldCount = oldData[dashItem]; // 4
//   // const newCount = oldCount + incrementer; // 5
//   const out = {
//     ...oldData,
//     // [dashItem]: newCount, // outbox: 5

//     deletedAt: 0,
//     createdAt: timestamp,
//     sourceDocPath: path,
//     sourceDocId,
//   };
//   // console.log('out\n', out,);

//   // const navElement = getNavElement({path,});
//   // const navId = navElement.id; // outbox
//   // console.log('navId\n', navId,); // outbox
//   // console.log('navElement\n', navElement,); // outbox
//   // const dashboardChangeOrders = navElement.dashboardConfig[incrementer]; // deprecated // { archive: 1, withdrawals: 1, net: -1, }
//   // const dashboardChangeOrders = navElement.crudConfig.creatable.dashboard.local;
//   const dashboardChangeOrders = creatable && creatable.dashboard && creatable.dashboard.local;
//   // console.log('dashboardChangeOrders\n', dashboardChangeOrders,); // outbox
//   // ref: https://codeburst.io/javascript-the-difference-between-foreach-and-for-in-992db038e4c2
//   // dashboardChangeOrders.forEach(r => {
//   for (let dashboardItemId in dashboardChangeOrders) {
//     // console.log('dashboardItemId\n', dashboardItemId,); // 'outbox' | 'net'
//     const delta = incrementer * dashboardChangeOrders[dashboardItemId]; // 1
//     // console.log('delta\n', delta,);
//     const oldCount = oldData[dashboardItemId]; // 4
//     // console.log('oldCount\n', oldCount,);
//     const newCount = oldCount + delta; // 5
//     // console.log('newCount\n', newCount,);
//     out[dashboardItemId] = newCount; // outbox: 5
//   };
//   // console.log('out\n', out,); // {net: 5, outbox: 5, ...}
//   return out;
// }

// const handleEditDashboard = ( uid, path, oldData, incrementer, sourceDocId, dispatch, getFirestore, creatable, ) => {
//   // on create
//   // used for createItem() only; actionItem() handles dashboard edits internally
//   // uid: string: 'abcxyz'
//   // path: string: 'leads'
//   // oldData: object: { net: 5, outbox: 4, ... }
//   // incrementer: integer: 1 | -1 (deprecated)
//   // incrementer: string: 'onCreate' | 'onDelete'
//   // console.log('uid\n', uid,); // 'abcxyz'
//   // console.log('path\n', path,); // 'leads'
//   // console.log('oldData\n', oldData,);
//   // console.log('incrementer\n', incrementer,); // 1
//   const newData = getDashboardNewData(path, oldData, incrementer, sourceDocId, creatable,);
//   // console.log('newData\n', newData,); // 1
//   const firestore = getFirestore();
//   firestore

//     // old data structure: subcollections: https://firebase.google.com/docs/firestore/manage-data/structure-data#nested_data_in_documents
//     // .collection('users')
//     // .doc(uid)
//     // .collection('dashboard')
//     // .add(newData) // adds new doc

//     // new data structure: root-level collections: https://firebase.google.com/docs/firestore/manage-data/structure-data#root-level_collections
//     .collection('dashboard')
//     .doc(uid)
//     .set(newData) // overwrites old doc

//     // ref: https://firebase.google.com/docs/firestore/manage-data/add-data#increment_a_numeric_value
//     // .update({
//     //   [dashItem] : firestore.FieldValue.increment(incrementer),
//     // })
//   .then( docRef => {
//     // console.log('docRef\n', docRef,);
//     dispatch({
//       type: 'EDIT_DASHBOARD_SUCCESS',
//       value: newData,
//     });
//   })
//   .catch( error => {
//     // console.log('error\n', error,);
//     dispatch({ type: 'EDIT_DASHBOARD_ERROR', }, error);
//   });
// }

const sendBatchToFirebase = ( protocol, batchConfig, getFirestore, { path='', newData={}, }, ) => { // 
  // protocol: string: 'create' | 'action' | 'update' | 'delete'
  // batchConfig: object: returned by: getCreatable | getActionable | getUpdateable | getDeleteable
  // getFirestore: function: Firestore API
  // path: string (if protocol='create')
  // newData: object: data to send (if protocol='create')
  // const protocolConfig = {
  //   create: getCreatable,
  //   action: getActionable,
  //   update: getUpdateable,
  //   delete: getDeleteable,
  // }

  const db = getFirestore();
  const batch = db.batch();

  switch(protocol) {
    case 'create':
      const newDocRef = db.collection(path).doc(); // .doc() generates autoID
      batch.set( newDocRef, newData, );
      break;
    case 'action':
      // code
      break;
    case 'update':
      // code
      break;
    case 'delete':
      // code
      break;
    default:
      // code
      break;
  }
  batchConfig && batchConfig.forEach(
    ({ collection, doc, data, }) => batch.set(db.collection(collection).doc(doc), data, { merge: true, },)
  );
  batch.commit();
}

// source: https://github.com/iamshaunjp/React-Redux-Firebase-App/blob/lesson-18/marioplan/src/store/actions/projectActions.js
export const createItem = ( item, { addOns, path, getCreatable, }, ) => // uid, settings, path, dashboard,
  (dispatch, getState, { getFirebase, getFirestore, }) => {

    // console.log('path\n', path,);
    // console.log('item\n', item,);
    // console.log('uid\n', uid,);
    // console.log('dashboard\n', dashboard,);
    
    // if(!item.createdAt) {
    //   const timestamp = Date.now();
    //   item.createdAt = timestamp;
    // }

    // // begin addOns
    // // const navElement = getNavElement({path, creatable,});
    // // console.log('navElement\n', navElement,)
    // const addOns = creatable && creatable.addOns;
    // // console.log('addOns\n', addOns,)
    // // end addOns


    // const timestamp = Date.now();
    const newData = {
      ...item,
      ...addOns,
      // createdAt: timestamp,
      // deletedAt: 0,
      // createdBy: uid,
      // createdAt: new Date(),
      // authorFirstName: 'Net',
      // authorLastName: 'Ninja',
      // authorId: 12345,
    };

    // // make async call to database
    // const db = getFirestore();
    // // console.log('item\n', item);
    // // console.log('db\n', db);
    // // console.log('getState\n', getState);
    // // console.log('newData\n', newData);

    // // // replace this:
    // // // ref: https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    // // // db.collection('test').add({
    // // db
    // //   .collection(path)
    // //   .add(newData) // use 'add' for firestore auto generated ID, use 'set' for custom ID
    // // .then( docRef => {
    // //   // console.log('uid\n', uid,); // 'abcxyz'
    // //   // console.log('path\n', path,); // 'leads'
    // //   // console.log('docRef\n', docRef,);
    // //   handleEditDashboard( uid, path, dashboard, 1, docRef.id, dispatch, getFirestore, creatable, );
    // //   // dispatch({ type: 'CREATE_ITEM_SUCCESS', });
    // // })
    // // .catch( error => {
    // //   console.error('error\n', error,);
    // //   dispatch({ type: 'CREATE_ITEM_ERROR', }, error);
    // // });
    // // // end replace this

    // // replace with:
    // const batch = db.batch();
    // const newDocRef = db.collection(path).doc(); // .doc() generates autoID
    // batch.set( newDocRef, newData, );
    // const batchConfig = getCreatable(newData,);
    // batchConfig && batchConfig.map(
    //   ({ collection, doc, data, }) => batch.set(db.collection(collection).doc(doc), data, { merge: true, },)
    // );
    // batch.commit();
    // // end replace with

    const batchConfig = getCreatable(path,);
    const args = { path, newData, }
    sendBatchToFirebase( 'create', batchConfig, getFirestore, args, );
  }

// const assembleBatchWrite = ( db, batch, navComponentId, uid, docId, ) => { // dashboard, use getIncrement()
//   // console.log('navComponentId\n', navComponentId,); // inbox
//   // console.log('uid\n', uid,);
//   // console.log('docId\n', docId,);
//   // console.log('dashboard\n', dashboard,);
  
//   const componentsNavConfig = getComponentsNavConfig({ uid, docId, });
//   // console.log('componentsNavConfig\n', componentsNavConfig,);
//   // console.log('componentNavConfig\n', componentsNavConfig[1],);
  
//   const componentNavConfig = getComponentNavConfig(componentsNavConfig, navComponentId,); // notice the 's', it's a different function than above
//   // console.log('componentNavConfig\n', componentNavConfig,);
//   const { crudConfig, } = componentNavConfig;
//   const { actionable, } = crudConfig;
//   console.log('actionable\n', actionable,);

//   // // ref: https://firebase.google.com/docs/firestore/manage-data/transactions
//   // // Set the value of 'NYC'
//   // const nycRef = db.collection("cities").doc("NYC");
//   // batch.set(nycRef, { name: "New York City" });
//   // // Update the population of 'SF'
//   // const sfRef = db.collection("cities").doc("SF");
//   // batch.update(sfRef, { "population": 1000000 });
//   // // Delete the city 'LA'
//   // const laRef = db.collection("cities").doc("LA");
//   // batch.delete(laRef);

//   const { updates, sets, deletes, dashboard: { local, remotes, }, } = actionable;

//   console.log('updates\n', updates,);
//   console.log('sets\n', sets,);
//   console.log('deletes\n', deletes,);
//   console.log('local\n', local,);
//   console.log('remotes\n', remotes,);

//   if(updates && updates.length) {
//     for(let update of updates) {
//       // console.log('update\n', update,);
//       const dbRef = db.doc(update.path);
//       batch.update(dbRef, update.fields,); // { "population": 1000000 }
//     }
//   }
//   if(sets && sets.length) {
//     for(let set of sets) {
//       // console.log('set\n', set,);
//       const dbRef = db.doc(set.path);
//       batch.set(dbRef, set.fields,); // { name: "New York City" }
//     }
//   }
//   if(deletes && deletes.length) {
//     for(let delet of deletes) { // use delet instead of delete because delete is a reserved word in JS
//       // console.log('delet\n', delet,);
//       const dbRef = db.doc(delet.path);
//       batch.delete(dbRef,);
//     }
//   }
//   // dashboards
//   if(local && (!_.isEmpty(local))) {
//     console.log('local\n', local,);
//     const newDashboard = { dashboard: local, }
//     // old data structure: subcollections
//     // const path = `users/${uid}/dashboard`;
//     // const dbRef = db.collection(path);
//     // new data structure: root-level collections
//     const path = `settings/${uid}`;
//     const dbRef = db.doc(path);
//     // batch.update(dbRef, local,); //.fields
//     // batch.update(dbRef, local,); //.fields
//     batch.update(dbRef, newDashboard,); //.fields
//   }
//   if(remotes && remotes.length) {
//     // console.log('remotes\n', remotes,);
//     for(let remote of remotes) {
//       // console.log('remote\n', remote,);
//       const dbRef = db.collection(remote.path);
//       batch.set(dbRef, remote.fields,); // { "population": 1000000 }
//     }    
//   }
//   return batch;
// }

export const actionItem = ( detail, { getActionable, getTransaction, }, ) => // actionable, uid, settings, dashboard, readable, navComponentId,
  (dispatch, getState, { getFirebase, getFirestore, }) => {
    // console.log('detail\n', detail,);
    // console.log('docId\n', docId,);
    // console.log('actionable\n', actionable,);
    // console.log('uid\n', uid,);
    // console.log('settings\n', settings,);
    // console.log('dashboard\n', dashboard,);
    // console.log('readable\n', readable,);
    // const { path, } = readable;
    // const { docId, } = detail;
    
    // // const newData = actionable.updates[0].fields;
    // // console.log('newData\n', newData,);
    // // dispatch({ type: 'ACTION_ITEM_SUCCESS', });
    
    // // const firestore = getFirestore();
    // // firestore
    // //   .collection(path)
    // //   .doc(docId)
    // //   .update( newData // use .update() method: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
    // //     , { merge: true, } ,
    // //   )

    // const db = getFirestore();
    // // ref: https://firebase.google.com/docs/firestore/manage-data/transactions

    // // Get a new write batch
    // const batch = db.batch();

    // // // begin replace this
    // // const assembledBatchWrite = assembleBatchWrite(db, batch, navComponentId, uid, docId, dashboard,);
    // // // console.log('assembledBatchWrite\n', assembledBatchWrite,);
    // // // Commit the batch
    // // // batch.commit().then( () => {
    // // assembledBatchWrite.commit().then( docRef => {
    // //   // console.log('docRef\n', docRef,);
    // // });
    // // // end replace this

    // // replace with:
    // // const batch = db.batch();
    // // const newDocRef = db.collection(path).doc(); // only used with creatable(), not actionable() // .doc() generates autoID
    // // batch.set( newDocRef, newData, ); // only used with creatable(), not actionable() 
    // const batchConfig = getActionable(docId,);
    // batchConfig.map(
    //   ({ collection, doc, data, }) => batch.set(db.collection(collection).doc(doc), data, { merge: true, },)
    // );
    // batch.commit();
    // // end replace with

    const batchConfig = getActionable(detail);
    sendBatchToFirebase( 'action', batchConfig, getFirestore, {}, );
    
    const transactionResult = getTransaction && getTransaction(detail, getFirestore,);
    // returns false if no subsequent action is necessary
    console.log('transactionResult\n', transactionResult,);
}

export const updateItem = ( path, docId, newItem, oldItem, ) => // uid,
  (dispatch, getState, { getFirebase, getFirestore, }) => {
    // ref: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
    // console.log('path\n', path);
    // console.log('docId\n', docId);
    // console.log('getState\n', getState);

    const timestamp = Date.now();
    const newDoc = {
      ...newItem,
      createdAt: oldItem.createdAt,
      updatedAt: timestamp,
      updatedItem: docId,
      deletedAt: 0, // bypass readable filter 
    };

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection(path)
      .add(newDoc) // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    .then( docRef => {
      const newDocId = docRef.id;
      // console.log( 'Document written with ID: ', newDocId, );
      const newData = {
        deletedAt: timestamp, // use deletedAt instead of replacedAt because that's the filter used by LoadAsync.js
        replacedBy: newDocId,
      };
      firestore
        .collection(path)
        .doc(docId)
        // .set(newData // do NOT use .set() method because it overwrites the data
        .update(newData // use .update() method: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
        // , { merge: true, } ,
        )
        .then(() => {
          dispatch({ type: 'UPDATE_ITEM_SUCCESS', });
        }).catch( error => {
          console.log('error\n', error,);
          dispatch({ type: 'UPDATE_ITEM_ERROR', }, error);
        });
    })
    .then(() => {
      dispatch({ type: 'UPDATE_ITEM_SUCCESS', });
    })
    .catch( error => {
      console.log('error\n', error,);
      dispatch({ type: 'UPDATE_ITEM_ERROR', }, error);
    });
  }

// To "delete" a record, we do NOT use the .delete() method described here: https://firebase.google.com/docs/firestore/manage-data/delete-data
// Instead, we will update the record with a field: deletedAt: Date.now()
// https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
// Then, we will query records without a deletedAt field as described here: https://firebase.google.com/docs/firestore/query-data/queries#compound_queries
// example: citiesRef.where("state", "==", "CO").where("deletedAt", "==", false)
export const deleteItem = ( path, docId, uid, dashboard, creatable, ) =>
  (dispatch, getState, { getFirebase, getFirestore, }) => {
    // console.log('path\n', path);
    // console.log('docId\n', docId);
    // console.log('getState\n', getState);

    const timestamp = Date.now();
    const newData = { deletedAt: timestamp, };

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection(path)
      .doc(docId)
      // .set(newData // do NOT use .set() method because it overwrites the data
      .update(newData // use .update() method: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
      // , { merge: true, } ,
      )
    .then( () => {
      // handleEditDashboard( uid, path, dashboard, -1, docId, dispatch, getFirestore, creatable, );
      // TODO: replace above handleEditDashboard() with getDeletable() imported from AppConfig per getCreatable() and getActionable()
      dispatch({ type: 'DELETE_ITEM_SUCCESS', });
    }).catch( error => {
      console.log('error\n', error,);
      dispatch({ type: 'DELETE_ITEM_ERROR', }, error);
    });
  }