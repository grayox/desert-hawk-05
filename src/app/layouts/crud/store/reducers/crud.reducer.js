// inspired by: src/app/store/reducers/my-reducers/leadsReducer.js
// There is no reducer for firebase actions to save items.
// Because the data is stored to firebase, not to app state

// import * as Actions from '../../actions/fuse/index';
import * as Actions from '../actions';

const initState = {
  items: [
    {id: '1', title: 'help me find peach'    , content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' , } ,
    {id: '2', title: 'collect all the stars' , content: 'Praesent at dapibus orci.'                                , } ,
    {id: '3', title: 'egg hunt with yoshi'   , content: 'Pellentesque molestie sapien ut sagittis cursus.'         , } ,
  ]
}

const itemsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'EDIT_DASHBOARD_SUCCESS':
      console.log('edit dashboard success');
      return state;
      // return {
      //   ...state,
      //   dashboard: _.merge( {}, action.value, ),
      // };
    case 'ACTION_ITEM_SUCCESS':
      console.log('action item success');
      return state;
    case 'CREATE_ITEM_SUCCESS':
      console.log('create item success');
      return state;
    case 'CREATE_ITEM_ERROR':
      console.log('create item error');
      return state;
    case 'DELETE_ITEM_SUCCESS':
      console.log('delete item success');
      return state;
    case 'DELETE_ITEM_ERROR':
      console.log('delete item error');
      return state;
    default:
      return state;
  }
};

export default itemsReducer;