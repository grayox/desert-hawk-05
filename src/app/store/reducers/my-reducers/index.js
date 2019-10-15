import { combineReducers, } from 'redux';
// import contacts from './contactsReducer';
// import leads from './leadsReducer';
// import settingsTabsReducer from './settingsTabsReducer';
// import settingsReducer from './settingsReducer';
import userDataReducer from './userDataReducer';

const reducers = combineReducers({
  // contacts,
  // leads,
  // settingsTabsReducer,
  // settingsReducer,
  userDataReducer,
});

export default reducers;