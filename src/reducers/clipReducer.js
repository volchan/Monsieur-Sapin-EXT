import { FETCH_CLIP } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_CLIP:
      return action.payload || false;
    default:
      return state;
  }
};
