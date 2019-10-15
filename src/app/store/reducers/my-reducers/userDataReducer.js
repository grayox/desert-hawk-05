// inspired by src/store/reducers/fuse/settings.reducer.js

// import * as Actions from '../../actions/fuse/index';

// begin my add
// import * as Actions from '../../actions/my-actions/index';
// import * as Actions from 'app/store/actions/my-actions/settingsActions';
import * as Actions from 'app/store/actions/my-actions';

import { defaultSettings } from 'app/config/AppConfig';
// end my add

import _ from '@lodash';
// import { 
//   FuseDefaultSettings,
//   // FuseLayouts,
// } from '@fuse';

const initialState = {
  // defaults: _.merge( {}, FuseDefaultSettings, ),
  // current: _.merge( {}, FuseDefaultSettings, ),
  settings: _.merge( {}, defaultSettings, ),
  dashboard: _.merge( {}, defaultSettings, ),
};

// function userDataReducer(state = initialState, action) {
const userDataReducer = ( state = initialState, action, ) => {
  // console.log('Hello, world!');
  // console.log('action\n', action,);
  // console.log('Actions\n', Actions,);
  // console.log('Actions.UPDATE_SETTINGS_SUCCESS\n', Actions.UPDATE_SETTINGS_SUCCESS,);
  switch (action.type) {
    // case Actions.SET_SETTINGS:
    //   {
    //     return {
    //       ...state,
    //       current: _.merge({}, state.current, action.value && action.value.layout && action.value.layout.style ? { layout: { config: FuseLayouts[action.value.layout.style].defaults } } : {}, action.value)
    //     };
    //   }
    // case Actions.SET_DEFAULT_SETTINGS:
    //   {
    //     return {
    //       ...state,
    //       defaults: _.merge({}, state.defaults, action.value),
    //       current: _.merge({}, state.defaults, action.value && action.value.layout && action.value.layout.style ? { layout: { config: FuseLayouts[action.value.layout.style].defaults } } : {}, action.value)
    //     };
    //   }
    // case Actions.RESET_DEFAULT_SETTINGS:
    //   {
    //     return {
    //       ...state,
    //       defaults: _.merge({}, state.defaults),
    //       current: _.merge({}, state.defaults)
    //     };
    //   }

    // begin my add
    // case Actions.UPDATE_SETTINGS:
    //   // console.log('stateSettingsReducer\n', state, );
    //   // console.log('action.value\n', action.value, ); //debugger;
    //   return {
    //     ...state,
    //     settings: _.merge( {}, action.value, ),
    //   };
      
    case Actions.UPDATE_SETTINGS_SUCCESS:
      // console.log('stateSettingsReducer\n', state, );
      // console.log('action.value\n', action.value, ); //debugger;
      return {
        ...state,
        settings: _.merge( {}, action.value, ),
      };
      
    case Actions.UPDATE_DASHBOARD_SUCCESS:
      // console.log('stateDashboardReducer\n', state, );
      // console.log('action.value\n', action.value, ); //debugger;
      return {
        ...state,
        dashboard: _.merge( {}, action.value, ),
      };
      
    case Actions.UPDATE_FEEDBACK_RATING:
      // console.log('stateDashboardReducer\n', state, );
      // console.log('action.value\n', action.value, ); //debugger;
      return {
        ...state,
        dashboard: _.merge( {}, action.value, ),
      };
      
    case Actions.UPDATE_FEEDBACK_NOTE:
      // console.log('stateDashboardReducer\n', state, );
      // console.log('action.value\n', action.value, ); //debugger;
      return {
        ...state,
        dashboard: _.merge( {}, action.value, ),
      };
    // end my add

    default:
      return state;
  }
};

// export default settingsReducer;
export default userDataReducer;