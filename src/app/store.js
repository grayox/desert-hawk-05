// https://www.youtube.com/watch?v=Ke90Tje7VS0 - react
// https://www.youtube.com/watch?v=wa1NaL_WWpI - react - provider pass state to components
// https://www.youtube.com/watch?v=kJeXr1K3nyg - redux
// https://www.youtube.com/watch?v=PFmuCDHHpwk - object-oriented programming

import { createStore } from 'redux';

const initialState = {
  category  : 'Redux Category'  ,
  geoNation : 'Redux geoNation' ,
  geoRegion : 'Redux geoRegion' ,
  geoLocal  : 'Redux geoLocal'  ,
}

const reducer = ( state = initialState, action, ) => {
  // console.log('action\n', action);
  return state;
}

const store = createStore(reducer);

export default store;