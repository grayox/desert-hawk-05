import * as Actions from '../actions';

const initialState = {
  // loggedIn: false, // my add
  role: 'guest',
  data: {
    displayName: 'John Doe',
    // photoURL    : 'assets/images/avatars/Velazquez.jpg',
    photoURL: 'https://randomuser.me/api/portraits/thumb/women/3.jpg',
    // photoURL    : 'https://lh5.googleusercontent.com/-B8JLjDILt9k/AAAAAAAAAAI/AAAAAAAAABc/G75SvMbyb0k/photo.jpg',
    email: 'johndoe@withinpixels.com',
    shortcuts: [
      'calendar',
      'mail',
      'contacts',
      'todo'
    ]
  }
};

const user = function (state = initialState, action) {
  // begin my add
  // console.log('state\n', state);
  // console.log('action\n', action);
  // debugger;
  // end my add
  switch (action.type) {
    case Actions.SET_USER_DATA:
      {
        return {
          ...initialState,
          ...action.payload
        };
      }
    case Actions.REMOVE_USER_DATA:
      {
        return {
          ...initialState
        };
      }
    case Actions.USER_LOGGED_OUT:
      {
        return initialState;
      }
    default:
      {
        return state
      }
  }
};

export default user;
