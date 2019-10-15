import * as Actions from '../../actions/fuse/index';
import _ from '@lodash';
import { FuseDefaultSettings, FuseLayouts } from '@fuse';

const initialState = {
  defaults: _.merge({}, FuseDefaultSettings),
  current: _.merge({}, FuseDefaultSettings)
};

const settings = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_SETTINGS:
      {
        return {
          ...state,
          current: _.merge({}, state.current, action.value && action.value.layout && action.value.layout.style ? { layout: { config: FuseLayouts[action.value.layout.style].defaults } } : {}, action.value)
        };
      }
    case Actions.SET_DEFAULT_SETTINGS:
      {
        return {
          ...state,
          defaults: _.merge({}, state.defaults, action.value),
          current: _.merge({}, state.defaults, action.value && action.value.layout && action.value.layout.style ? { layout: { config: FuseLayouts[action.value.layout.style].defaults } } : {}, action.value)
        };
      }
    case Actions.RESET_DEFAULT_SETTINGS:
      {
        return {
          ...state,
          defaults: _.merge({}, state.defaults),
          current: _.merge({}, state.defaults)
        };
      }
    default:
      {
        return state;
      }
  }
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'EDIT_NAME_SUCCESS':
      console.log('edit name success');
      return state;
    case 'EDIT_NAME_ERROR':
      console.log('edit name error');
      return state;
    default:
      return state;
  }
};

export default settings;