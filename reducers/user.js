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
  loadUser: {
    id: 0,
    uid: "",
    username: "",
    nickname: "",
    createdAt: "",
    modifiedAt: "",
  },
  loadUserLoading: false,
  addFriendLoading: false,
  addFriendError: "",
  addFriendDone: false,
  friends: [],
  sendMessageLoading: false,
  sendMessageError: "",
  sendMessageDone: false,
  logoutLoading: false,
  logoutDone: false,
  receivedMessages: [],
  loadReceivedMessagesLoading: false,
  loadReceievdMessagesDone: false,
  loadReceivedMessagesHasNext: true,
  sentMessages: [],
  loadSentMessagesLoading: false,
  loadSentMessagesDone: false,
  loadSentMessagesHasNext: true,
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

export const LOAD_USER_BY_NICKNAME_REQUEST = "LOAD_USER_BY_NICKNAME_REQUEST";
export const LOAD_USER_BY_NICKNAME_SUCCESS = "LOAD_USER_BY_NICKNAME_SUCCESS";
export const LOAD_USER_BY_NICKNAME_FAILURE = "LOAD_USER_BY_NICKNAME_FAILURE";

export const ADD_FRIEND_REQUEST = "ADD_FRIEND_REQUEST";
export const ADD_FRIEND_SUCCESS = "ADD_FRIEND_SUCCESS";
export const ADD_FRIEND_FAILURE = "ADD_FRIEND_FAILURE";
export const CLEAR_ADD_FRIEND_STATE = "CLEAR_ADD_FRIEND_STATE";

export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";
export const CLEAR_SEND_MESSAGE_STATE = "CLEAR_SEND_MESSAGE_STATE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const LOAD_RECEIVED_MESSAGES_REQUEST = "LOAD_RECEIVED_MESSAGES_REQUEST";
export const LOAD_RECEIVED_MESSAGES_SUCCESS = "LOAD_RECEIVED_MESSAGES_SUCCESS";
export const LOAD_RECEIVED_MESSAGES_FAILURE = "LOAD_RECEIVED_MESSAGES_FAILURE";
export const CLEAR_RECEIVED_MESSAGES_STATE = "CLEAR_RECEIVED_MESSAGES_STATE";

export const LOAD_SENT_MESSAGES_REQUEST = "LOAD_SENT_MESSAGES_REQUEST";
export const LOAD_SENT_MESSAGES_SUCCESS = "LOAD_SENT_MESSAGES_SUCCESS";
export const LOAD_SENT_MESSAGES_FAILURE = "LOAD_SENT_MESSAGES_FAILURE";
export const CLEAR_SENT_MESSAGES_STATE = "CLEAR_SENT_MESSAGES_STATE";

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

export const loadUserByNicknameRequest = (payload) => ({
  type: LOAD_USER_BY_NICKNAME_REQUEST,
  payload,
});

export const loadUserByNicknameSuccess = (payload) => ({
  type: LOAD_USER_BY_NICKNAME_SUCCESS,
  payload,
});

export const loadUserByNicknameFailure = (payload) => ({
  type: LOAD_USER_BY_NICKNAME_FAILURE,
  payload,
});

export const addFriendRequest = (payload) => ({
  type: ADD_FRIEND_REQUEST,
  payload,
});

export const addFriendSuccess = (payload) => ({
  type: ADD_FRIEND_SUCCESS,
  payload,
});

export const addFriendFailure = (payload) => ({
  type: ADD_FRIEND_FAILURE,
  payload,
});

export const clearAddFriendState = () => ({
  type: CLEAR_ADD_FRIEND_STATE,
});

export const sendMessageRequest = (payload) => ({
  type: SEND_MESSAGE_REQUEST,
  payload,
});

export const sendMessageSuccess = () => ({
  type: SEND_MESSAGE_SUCCESS,
});

export const sendMessageFailure = (payload) => ({
  type: SEND_MESSAGE_FAILURE,
  payload,
});

export const clearSendMessageState = () => ({
  type: CLEAR_SEND_MESSAGE_STATE,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = () => ({
  type: LOGOUT_FAILURE,
});

export const loadReceivedMessagesRequest = () => ({
  type: LOAD_RECEIVED_MESSAGES_REQUEST,
});

export const loadReceivedMessagesSuccess = (payload) => ({
  type: LOAD_RECEIVED_MESSAGES_SUCCESS,
  payload,
});

export const loadReceivedMessagesFailure = () => ({
  type: LOAD_RECEIVED_MESSAGES_FAILURE,
});

export const clearReceivedMessagesState = () => ({
  type: CLEAR_RECEIVED_MESSAGES_STATE,
});

export const loadSentMessagesRequest = () => ({
  type: LOAD_SENT_MESSAGES_REQUEST,
});

export const loadSentMessagesSuccess = (payload) => ({
  type: LOAD_SENT_MESSAGES_SUCCESS,
  payload,
});

export const loadSentMessagesFailure = () => ({
  type: LOAD_SENT_MESSAGES_FAILURE,
});

export const clearSentMessagesState = () => ({
  type: CLEAR_SENT_MESSAGES_STATE,
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
        break;
      case LOAD_USER_BY_NICKNAME_REQUEST:
        draft.loadUserLoading = true;
        break;
      case LOAD_USER_BY_NICKNAME_SUCCESS:
        draft.loadUserLoading = false;
        draft.loadUser.id = action.payload.info.id;
        draft.loadUser.uid = action.payload.info.uid;
        draft.loadUser.username = action.payload.info.username;
        draft.loadUser.nickname = action.payload.info.nickname;
        draft.loadUser.createdAt = action.payload.info.createdAt;
        draft.loadUser.modifiedAt = action.payload.info.modifiedAt;
        break;
      case LOAD_USER_BY_NICKNAME_FAILURE:
        draft.loadUserLoading = false;
        break;
      case ADD_FRIEND_REQUEST:
        draft.addFriendLoading = true;
        break;
      case ADD_FRIEND_SUCCESS:
        draft.addFriendLoading = false;
        draft.addFriendDone = true;
        break;
      case ADD_FRIEND_FAILURE:
        draft.addFriendLoading = false;
        draft.addFriendError = action.payload.msg;
        break;
      case CLEAR_ADD_FRIEND_STATE:
        draft.addFriendDone = false;
        draft.addFriendLoading = false;
        draft.addFriendError = "";
        break;
      case SEND_MESSAGE_REQUEST:
        draft.sendMessageLoading = true;
        break;
      case SEND_MESSAGE_SUCCESS:
        draft.sendMessageDone = true;
        draft.sendMessageLoading = false;
        break;
      case SEND_MESSAGE_FAILURE:
        draft.sendMessageLoading = false;
        draft.sendMessageError = action.payload.msg;
        break;
      case CLEAR_SEND_MESSAGE_STATE:
        draft.sendMessageDone = false;
        draft.sendMessageLoading = false;
        draft.sendMessageError = "";
        break;
      case LOGOUT_REQUEST:
        draft.logoutLoading = true;
        break;
      case LOGOUT_SUCCESS:
        draft.logoutLoading = false;
        draft.logoutDone = true;
        break;
      case LOGOUT_FAILURE:
        draft.logoutLoading = false;
        break;
      case LOAD_RECEIVED_MESSAGES_REQUEST:
        draft.loadReceivedMessagesLoading = true;
        break;
      case LOAD_RECEIVED_MESSAGES_SUCCESS:
        draft.loadReceivedMessagesLoading = false;
        draft.loadReceivedMessagesDone = true;
        draft.loadReceivedMessagesHasNext = action.payload.hasNext;
        draft.receivedMessages = draft.receivedMessages.concat(
          action.payload.messages
        );
        break;
      case LOAD_RECEIVED_MESSAGES_FAILURE:
        draft.loadReceivedMessagesLoading = false;
        break;
      case CLEAR_RECEIVED_MESSAGES_STATE:
        draft.loadReceivedMessagesLoading = false;
        draft.loadReceivedMessagesDone = false;
        draft.loadReceivedMessagesHasNext = true;
        draft.receivedMessages = [];
        break;
      case LOAD_SENT_MESSAGES_REQUEST:
        draft.loadSentMessagesLoading = true;
        break;
      case LOAD_SENT_MESSAGES_SUCCESS:
        draft.loadSentMessagesLoading = false;
        draft.loadSentMessagesDone = true;
        draft.loadSentMessagesHasNext = action.payload.hasNext;
        draft.sentMessages = draft.sentMessages.concat(action.payload.messages);
        break;
      case LOAD_SENT_MESSAGES_FAILURE:
        draft.loadSentMessagesLoading = false;
        break;
      case CLEAR_SENT_MESSAGES_STATE:
        draft.loadSentMessagesLoading = false;
        draft.loadSentMessagesDone = false;
        draft.loadSentMessagesHasNext = true;
        draft.sentMessages = [];
        break;
      default:
        break;
    }
  });

export default reducer;
