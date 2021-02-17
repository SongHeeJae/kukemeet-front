import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import videoroom from "./videoroom";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        videoroom,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
