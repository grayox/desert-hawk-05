import React, { Component } from 'react';

// import Inbox from '../../layouts/inbox/Inbox';
import Inbox from 'app/views/app/inbox/Inbox';

// firebase
// import firebase from '@firebase/app';
// import '@firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore();
const path = 'leads';

class InboxContainer extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    this.getItems(path);
  }

  getItems(path) {
    const out = [];
    db.collection(path)
      // .orderBy('added_at', 'desc')
      // .orderBy('createdAt', 'desc')
      .orderBy('createdAt', 'desc')
      // .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => 
          // doc.data() is always defined for query doc snapshots
          // console.log(doc.id, '\n', doc.data());
          // console.log('createdAt: ', doc.createdAt()); // throws error // must define createdAt, then save it
          // console.log('createdAt: ', doc.get('createdAt')); // undefined
          // console.log('id: ', doc.id); // works
          // console.log('data\n', doc.data()); // works
          out.push(doc.data())
          // console.log('out\n', out);
          // this.setState(out);
          // return out;
        );
        return out;
      })
      .then(result => {
          // always set state inside promise!
          // otherwise, function returns before data loads!
          // console.log('result', result);
          const newState = { items: result };
          this.setState(newState);
        })
      .catch(error => {
        console.log('Error getting documents: \n', error);
      });
    // console.log('out\n', out); // returns before promise settles; therefore, returns empty array
    // always set state inside promise!
    // otherwise, function returns before data loads!
    // return out;
    // const newState = { items: out };
    // this.setState(newState);
  };
  render() {
    const { items } = this.state;
    return (
      <Inbox items={items} />
    );
  }
}

export default InboxContainer;