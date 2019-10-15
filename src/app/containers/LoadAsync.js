// import React, { Component } from 'react';
// import React from 'react';

// firebase
// import firebase from '@firebase/app';
// import '@firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
// const db = firebase.firestore();
// const path = 'leads';

const BATCH_SIZE = 15; // 20

// ref: https://medium.freecodecamp.org/how-to-master-async-await-with-this-real-world-example-19107e7558ad

// export const loadAsyncData = () => {
//   let timeout;
//   const promise = new Promise((resolve, reject) => {
//     timeout = setTimeout(
//       () =>
//         resolve({
//           example: "value",
//           random: Math.random()
//         }),
//       1000
//     );
//   });
//   promise.cancel = () => clearTimeout(timeout);
//   return promise;
// };

export const loadUserData = async path => {
  // path: string: example: 'users/myUserID/settings' | 'users/myUserID/dashboard'
  // console.log('path\n', path);
  const out = await getUserData(path);
  // console.log('out\n', out,);
  return out;

  // const promise = new Promise((resolve, reject) => {
  //   resolve(out);
  // });
  // promise.cancel = () => {};
  // return promise;
};

// // deprecated
// // old data structure: subcollections
// const getUserData = async path => {
//   // console.log('path\n', path);

//   // fix bug:
//   // Unhandled Rejection (FirebaseError): Invalid path (users//dashboard). Paths must not contain // in them.
//   // duplicated at: src/app/store/actions/my-actions/userDataActions.js

//   const ready1 = !path.includes('//');
//   // console.log('ready1', ready1,);
//   if(!ready1) return;
  
//   const pathArray = path.split('/');
//   const pathArrayLength = pathArray.length;
//   // // old data structure: subcollections
//   // const ready2 = (pathArrayLength === 3);
//   // new data sructure: root-level collections
//   const ready2 = !!pathArrayLength;
//   if(!ready2) return null; 
//   // console.log('pathArray\n', pathArray,);
//   // console.log('pathArray[1]\n', pathArray[1],);
//   // console.log('pathArrayLength\n', pathArrayLength,);
  
//   // debugger;
//   const a = [];
//   const db = firebase.firestore();
//   const ready3 = db;
//   if(!ready3) return;

//   const out = await db.collection(path)
//     // .where( 'deletedAt', '==', 0, ) // filters out deleted documents
//     // .where( 'name', '==', 'alpha', )
//     .orderBy( 'createdAt', 'desc', ) // throws error: "firebase error: the query requires an index"
//     .limit(1)
//     .get()
//     .then(documentSnapshots => {
//       documentSnapshots.forEach(doc => {
//         // doc.data() is always defined for query doc snapshots
//         // console.log(doc.id, '\n', doc.data());
//         // console.log('createdAt: ', doc.createdAt()); // throws error // must define createdAt, then save it
//         // console.log('createdAt: ', doc.get('createdAt')); // undefined
//         // console.log('id: ', doc.id); // works
//         // console.log('data\n', doc.data()); // works
//         a.push({
//           ...doc.data(), // !important, this line is FIRST, otherwise docId will be overwritten
//           docId: doc.id, // !important, this line is LAST
//         });
//         // console.log('a\n', a);
//         // this.setState(a);
//       });
//       // console.log('a\n', a);
//       return a;
//     })
//     .then(result => {
//       // always set state inside promise!
//       // otherwise, function returns before data loads!
//       // console.log('result', result);
//       // debugger;
//       // return result;
//       return result[0];
//     })
//     // .then(() => {
//     //   this.unsubscribe(path);
//     //   return path;
//     // })
//     .catch(error => {
//       console.error('Error getting documents: \n', error);
//       throw new Error(`Unable to get items from: ${path}\nError:\n${error}`);
//     });
//   // console.log('out\n', out); // returns before promise settles; therefore, returns empty array
//   // always set state inside promise!
//   // otherwise, function returns before data loads!
//   return out;
//   // const newState = { items: out };
//   // this.setState(newState);
//   // }
// };

// new data structure: root-level collections
// inspired by: https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
const getUserData = async path => {
  // console.log('path\n', path,);
  const db = firebase.firestore();
  
  // const docRef = db.collection("cities").doc("SF");
  const docRef = db.doc(path);
  // console.log('docRef\n', docRef,);

  const out = await docRef.get().then( doc => {
    if (doc.exists) {
      const data = doc.data();
      // console.log("Document data:", data,);
      return data;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  }).catch( error => {
    console.log("Error getting document:", error);
  });

  // console.log('out\n', out,);
  return out;
}

export const loadAsyncData = async ( readable, batchSize, lastVisible, searchFilterSortModel, ) => {
  // console.log('readable\n', readable);
  const batch = batchSize || BATCH_SIZE;
  const out = await getAsyncItems( readable, batch, lastVisible, searchFilterSortModel, );
  // console.log('out\n', out);

  const promise = new Promise((resolve, reject,) => {
    resolve(out);
  });
  promise.cancel = () => {};
  return promise;
};

const addWhereContraintsToQuery = (startingQuery, whereArray,) => {
  // console.log('startingQuery\n', startingQuery,);
  // console.log('whereArray\n', whereArray,);

  let out = startingQuery;

  const ready1 = startingQuery && whereArray && whereArray.length;
  if(!ready1) return out;

  // whereArray.forEach( async (constraint) => {
  for(let constraint of whereArray) {
    // console.log('constraint\n', constraint,);
    // const ready2 = /*await*/ (!!constraint[0] && !!constraint[1] && !!constraint[2]);

    const constraint2type = typeof constraint[2];
    // console.log('constraint2type\n', constraint2type,);
    const ready2 = constraint2type !== 'undefined';
    // console.log('ready2\n', ready2,); 
    if(!ready2) {
      out = undefined; // throw new Error('Encountered falsey constraint');
      break;
    }
    try {
      out = out.where( constraint[0], constraint[1], constraint[2], );
    } catch(error) {
      console.error(`Error adding "where" constraints to ${constraint}`, error,);
      return out;
    }
  };
  // console.log('queryWhere\n', out,);
  return out;
}

const getAsyncItems = async ( readable, batchSize = BATCH_SIZE, lastVisible, searchFilterSortModel = {}, ) => {
  // used for reading CRUD objects
  
  const ready1 = readable;
  if(!ready1) return;

  const { path, where, } = readable;

  const ready2 = path;
  if(!ready2) return;

  // console.log('path\n', path);
  // console.log('where\n', where);
  // console.log('searchFilterSortModel\n', searchFilterSortModel);
  // console.log('state\n', this.state);
  // this.setState({isLoading: true});
  
  const { searchString, searchBy, filterBy = {}, sortBy, sortDirectionIsDescending, } = searchFilterSortModel;

  const batch = batchSize || BATCH_SIZE;
  
  // debugger;
  const data = [];
  const db = firebase.firestore();
  const ready3 = db;
  if(!ready3) return;

  let lastShown;

  const queryInit = await db.collection(path)
    .where( 'deletedAt', '==', 0, ) // filters out deleted documents // deletedAt also used by updateItem (not replacedAt)
    // .where( 'name', '==', 'alpha', )
    .orderBy( 'createdAt', 'desc', ); // throws error: "firebase error: the query requires an index"

  const queryWhere = addWhereContraintsToQuery(queryInit, where,);
  // console.log('queryWhere\n', queryWhere,);
  const queryWhereType = typeof queryWhere;
  // console.log('queryWhereType\n', queryWhereType,);
  const ready4 = queryWhereType !== 'undefined';
  // console.log('ready4\n', ready4,); 
  if(!ready4) return undefined;

  // augment queryWhere with searchString, searchBy, filterBy, sortBy, sortDirectionIsDescending,

  // // start compound query in series
  // // note: limited support for compound queries in firestore and need for indexing
  // // requires us to suspend development of this feature and only support simple queries
  // // with limited need for individual indices until this feature is more fully supported
  // // by firesotre

  // const getSearchedQuery = ( query, searchString, searchBy, ) => {
  //   const ready1 = searchString && searchString.length;
  //   if(!ready1) return query;
  //   const ready2 = searchBy && searchBy.length;
  //   if(!ready2) return query;
  //   const out = query.where( searchBy, '==', searchString, );
  //   return out;
  // }
  
  // const getFilteredQuery = ( query, filterBy, ) => {
  //   // example: filterBy = [ 'All', 'Starred', 'Unstarred', 'Won', ... ]
  //   // example: filterBy = [ {field: 'deletedAt', operator: '==', value: 0,}, ... ]
  //   const ready1 = filterBy && filterBy.length;
  //   if(!ready1) return query;
  //   const out = filterBy.map( filter => query.where(filter.field, filter.operator, filter.value,));
  //   return out;
  // }
  
  // const getSortedQuery = ( query, sortBy, sortDirectionIsDescending, ) => {
  //   const ready1 = sortBy && sortBy.length;
  //   if(!ready1) return query;
  //   const out = query.orderBy( sortBy, (sortDirectionIsDescending ? 'desc' : null), );
  //   return out;
  // }

  // const searchedQuery = await getSearchedQuery( queryWhere, searchString, searchBy, );
  // const filteredQuery = await getFilteredQuery( searchedQuery, filterBy, );
  // const sortedQuery = await getSortedQuery( filteredQuery, sortBy, sortDirectionIsDescending, );
  // const qualifiedQuery = await sortedQuery;
  // // end compound query in series

  // begin simple query

  const getSearchedQuery = ( searchString, searchBy, ) => {
    // console.log('searchString\n', searchString,);
    // console.log('searchBy\n', searchBy,);
    const ready1 = searchString && searchString.length;
    if(!ready1) return null;
    const ready2 = searchBy && searchBy.length;
    if(!ready2) return null;
    const out = queryWhere.where( searchBy, '==', searchString, );
    return out;
  }
  
  const getFilteredQuery = ({ field, operator, value, }) => {
    // example: filterBy = [ 'All', 'Starred', 'Unstarred', 'Won', ... ]
    // example: filterBy = [ {field: 'deletedAt', operator: '==', value: 0,}, ... ]
    const ready1 = field && field.length;
    if(!ready1) return null;
    const ready2 = operator && operator.length;
    if(!ready2) return null;
    const ready3 = value && value.length;
    if(!ready3) return null;
    const out = queryWhere.where(field, operator, value,);
    return out;
  }
  
  const getSortedQuery = ( sortBy, sortDirectionIsDescending, ) => {
    const ready1 = sortBy && sortBy.length;
    if(!ready1) return null;
    const out = queryWhere.orderBy( sortBy, (sortDirectionIsDescending ? 'desc' : null), );
    return out;
  }

  const qualifiedQuery =
    getSearchedQuery( searchString, searchBy, )
    ||
    getFilteredQuery( filterBy, )
    ||
    getSortedQuery( sortBy, sortDirectionIsDescending, )
    ||
    queryWhere;

  // end simple query

  // paginate query
  // ref: docs: https://firebase.google.com/docs/firestore/query-data/query-cursors
  // ref: youtube: https://www.youtube.com/watch?v=poqTHxtDXwU
  // use trinary operator to makes query robust to cases where there is no lastVisible value
  const queryPage = lastVisible ? qualifiedQuery.startAfter(lastVisible) : qualifiedQuery;

  const out = queryPage    
    // .limit(10)
    .limit(batch)
    .get()
    .then(documentSnapshots => {
      documentSnapshots.forEach(doc => {
        // doc.data() is always defined for query doc snapshots
        // console.log(doc.id, '\n', doc.data(),);
        // console.log('createdAt: ', doc.createdAt(),); // throws error // must define createdAt, then save it
        // console.log('createdAt: ', doc.get('createdAt'),); // undefined
        // console.log('id: ', doc.id,); // works
        // console.log('data\n', doc.data(),); // works
        // console.log('doc\n', doc,);
        data.push({
          docId: doc.id,
          ...doc.data(),
        });
        // console.log('a\n', a);
        // this.setState(a);
        lastShown = doc;
      });
      // console.log('a\n', a); // {data: arrayOfObjects, lastShown: docSnapshot,}  (same as below two returns)
      return { data, lastShown, };
    })
    .then(result => {
      // always set state inside promise!
      // otherwise, function returns before data loads!
      // console.log('result', result); // {data: arrayOfObjects, lastShown: docSnapshot,} (same as returns above and below)
      // debugger;
      return result;
    })
    // .then(() => {
    //   this.unsubscribe(path);
    //   return path;
    // })
    .catch(error => {
      console.error('Error getting documents: \n', error);
      throw new Error(`Unable to get items from: ${path}\nError:\n${error}`);
    });
    // if not contained within a promise,
    // then this step returns before promise settles;
    // therefore, it returns an empty array
    // therefore, always set state inside promise!
    // otherwise, function returns before data loads!
    // console.log('out\n', out); // {data: arrayOfObjects, lastShown: docSnapshot,} (same as above two returns)
    return out;
    // const newState = { items: out };
    // this.setState(newState);
    // }
};