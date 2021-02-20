import produce from "immer";

export const initialState = {
  id: -1,
  uid: "",
  username: "",
  nickname: "",
  createdAt: "",
  modifiedAt: "",
  registerLoading: false,
  registerDone: false,
  registerError: "",
};

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const CLEAR_REGISTER_STATE = "CLEAR_REGISTER_STATE";

export const registerRequest = (payload) => ({
  type: REGISTER_REQUEST,
  payload,
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFailure = (payload) => ({
  type: REGISTER_FAILURE,
  payload,
});
export const clearRegisterState = () => ({
  type: CLEAR_REGISTER_STATE,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REGISTER_REQUEST:
        draft.registerLoading = true;
        draft.registerDone = false;
        break;
      case REGISTER_SUCCESS:
        draft.registerLoading = false;
        draft.registerDone = true;
        break;
      case REGISTER_FAILURE:
        draft.registerLoading = false;
        draft.registerError = action.payload.msg;
        break;
      case CLEAR_REGISTER_STATE:
        draft.registerLoading = false;
        draft.registerDone = false;
        draft.registerError = "";
        break;
      default:
        break;
    }
  });

export default reducer;
