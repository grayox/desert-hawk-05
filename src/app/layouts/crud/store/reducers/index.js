// inspired by: src/app/components/forms/store/reducers/index.js

import {combineReducers} from 'redux';
// import item from './item.reducer';
import crud from './crud.reducer';

const reducer = combineReducers({
  crud,
});

export default reducer;