import { combineReducers } from "redux";

import clipReducer from "./clipReducer";

export default combineReducers({
  clips: clipReducer
});
