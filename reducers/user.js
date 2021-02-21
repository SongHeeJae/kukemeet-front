import produce from "immer";

export const initialState = {
  id: 0,
  uid: "",
  username: "",
  nickname: "",
  createdAt: "",
  modifiedAt: "",
  accessToken: "",
  refreshToken: "",
  registerLoading: false,
  registerDone: false,
  registerError: "",
  loginLoading: false,
  loginDone: false,
  loginError: "",
  setCookie: [],
};

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const CLEAR_REGISTER_STATE = "CLEAR_REGISTER_STATE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const CLEAR_LOGIN_STATE = "CLEAR_LOGIN_STATE";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILURE = "REFRESH_TOKEN_FAILURE";

export const LOAD_ME_REQUEST = "LOAD_ME_REQUEST";
export const LOAD_ME_SUCCESS = "LOAD_ME_SUCCESS";
export const LOAD_ME_FAILURE = "LOAD_ME_FAILURE";

export const SET_TOKEN = "SET_TOKEN";

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

export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload,
});

export const clearLoginState = () => ({
  type: CLEAR_LOGIN_STATE,
});

export const refreshTokenRequest = (payload) => ({
  type: REFRESH_TOKEN_REQUEST,
  payload,
});

export const refreshTokenSuccess = (payload) => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload,
});

export const refreshTokenFailure = () => ({
  type: REFRESH_TOKEN_FAILURE,
});

export const loadMeRequest = (payload) => ({
  type: LOAD_ME_REQUEST,
  payload,
});

export const loadMeSuccess = (payload) => ({
  type: LOAD_ME_SUCCESS,
  payload,
});

export const loadMeFailure = () => ({
  type: LOAD_ME_FAILURE,
});

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
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
      case LOGIN_REQUEST:
        draft.loginLoading = true;
        draft.loginDone = false;
        break;
      case LOGIN_SUCCESS:
        draft.loginLoading = false;
        draft.loginDone = true;
        draft.id = action.payload.info.id;
        draft.uid = action.payload.info.uid;
        draft.username = action.payload.info.username;
        draft.nickname = action.payload.info.nickname;
        draft.createdAt = action.payload.info.createdAt;
        draft.modifiedAt = action.payload.info.modifiedAt;
        draft.accessToken = action.payload.accessToken;
        draft.refreshToken = action.payload.refreshToken;
        break;
      case LOGIN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = action.payload.msg;
        break;
      case CLEAR_LOGIN_STATE:
        draft.loginLoading = false;
        draft.loginDone = false;
        draft.loginError = "";
        break;
      case REFRESH_TOKEN_REQUEST:
        break;
      case REFRESH_TOKEN_SUCCESS:
        draft.id = action.payload.info.id;
        draft.uid = action.payload.info.uid;
        draft.username = action.payload.info.username;
        draft.nickname = action.payload.info.nickname;
        draft.createdAt = action.payload.info.createdAt;
        draft.modifiedAt = action.payload.info.modifiedAt;
        draft.accessToken = action.payload.accessToken;
        draft.refreshToken = action.payload.refreshToken;
        draft.setCookie = action.payload.setCookie;
        break;
      case REFRESH_TOKEN_FAILURE:
        draft.id = 0;
        draft.uid = "";
        draft.username = "";
        draft.nickname = "";
        draft.createdAt = "";
        draft.modifiedAt = "";
        draft.accessToken = "";
        draft.refreshToken = "";
        break;
      case LOAD_ME_REQUEST:
        break;
      case LOAD_ME_SUCCESS:
        draft.id = action.payload.info.id;
        draft.uid = action.payload.info.uid;
        draft.username = action.payload.info.username;
        draft.nickname = action.payload.info.nickname;
        draft.createdAt = action.payload.info.createdAt;
        draft.modifiedAt = action.payload.info.modifiedAt;
        break;
      case LOAD_ME_FAILURE:
        break;
      case SET_TOKEN:
        draft.accessToken = action.payload.accessToken;
        draft.refreshToken = action.payload.refreshToken;
      default:
        break;
    }
  });

export default reducer;
