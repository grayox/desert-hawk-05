import * as Actions from '../../actions/fuse/index';

const initState = {
  leads: [
    {id: '1', title: 'help me find peach', content: 'blah blah blah'},
    {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
    {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
  ]
}

const leadsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_LEAD_SUCCESS':
      console.log('create project success');
      return state;
    case 'CREATE_LEAD_ERROR':
      console.log('create project error');
      return state;
    default:
      return state;
  }
};

export default leadsReducer;