import {
  createStore,
  combineReducers
} from "../../../../../../../Library/Caches/typescript/2.9/node_modules/redux";
import { reducer as reduxFormReducer } from "../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/redux-form";

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

export default store;
