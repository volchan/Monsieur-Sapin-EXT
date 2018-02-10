import { combineReducers } from "redux";

import streamReducer from "./streamReducer";

export default combineReducers({
  auth: streamReducer
});
