import { combineReducers } from 'redux';
import shopDetailsReducer from "./shopDetailsReducer";

const reducer = combineReducers({
  shopDetails : shopDetailsReducer,
});

export default reducer