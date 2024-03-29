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
  refreshTokenLoading: false,
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
  deleteReceivedMessageLoading: false,
  deleteReceivedMessageError: "",
  deleteSentMessageLoading: false,
  deleteSentMessageError: "",
  myFriends: [],
  loadMyFriendsLoading: false,
  deleteFriendLoading: false,
  deleteFriendError: "",
  loadUsers: [],
  loadUsersLoading: false,
  loadUsersError: "",
  deleteUserLoading: false,
  deleteUserDone: false,
  updateUserInfoLoading: false,
  updateUserInfoDone: false,
  updateUserInfoError: "",
  updateUserPasswordLoading: false,
  updateuserPasswordDone: false,
  updateUserPasswordError: "",
  sendCodeEmailLoading: false,
  sendCodeEmailError: "",
  changeForgottenPasswordLoading: false,
  changeForgottenPasswordError: "",
  changeForgottenPasswordDone: false,
};

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const CLEAR_REGISTER_STATE = "CLEAR_REGISTER_STATE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const CLEAR_LOGIN_STATE = "CLEAR_LOGIN_STATE";

export const REFRESH_TOKEN_BY_CLIENT_REQUEST =
  "REFRESH_TOKEN_BY_CLIENT_REQUEST";
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

export const DELETE_RECEIVED_MESSAGE_REQUEST =
  "DELETE_RECEIVED_MESSAGE_REQUEST";
export const DELETE_RECEIVED_MESSAGE_SUCCESS =
  "DELETE_RECEIVED_MESSAGE_SUCCESS";
export const DELETE_RECEIVED_MESSAGE_FAILURE =
  "DELETE_RECEIVED_MESSAGE_FAILURE";
export const CLEAR_DELETE_RECEIVED_MESSAGE_STATE =
  "CLEAR_DELETE_RECEIVED_MESSAGE_STATE";

export const DELETE_SENT_MESSAGE_REQUEST = "DELETE_SENT_MESSAGE_REQUEST";
export const DELETE_SENT_MESSAGE_SUCCESS = "DELETE_SENT_MESSAGE_SUCCESS";
export const DELETE_SENT_MESSAGE_FAILURE = "DELETE_SENT_MESSAGE_FAILURE";
export const CLEAR_DELETE_SENT_MESSAGE_STATE =
  "CLEAR_DELETE_SENT_MESSAGE_STATE";

export const LOAD_MY_FRIENDS_REQUEST = "LOAD_MY_FRIENDS_REQUEST";
export const LOAD_MY_FRIENDS_SUCCESS = "LOAD_MY_FRIENDS_SUCCESS";
export const LOAD_MY_FRIENDS_FAILURE = "LOAD_MY_FRIENDS_FAILURE";
export const CLEAR_MY_FRIENDS_STATE = "CLEAR_MY_FRIENDS_STATE";

export const SET_LOAD_USER = "SET_LOAD_USER";

export const DELETE_FRIEND_REQUEST = "DELETE_FRIEND_REQUEST";
export const DELETE_FRIEND_SUCCESS = "DELETE_FRIEND_SUCCESS";
export const DELETE_FRIEND_FAILURE = "DELETE_FRIEND_FAILURE";
export const CLEAR_DELETE_FRIEND_STATE = "CLEAR_DELETE_FRIEND_STATE";

export const LOAD_USERS_REQUEST = "LOAD_USERS_REQUEST";
export const LOAD_USERS_SUCCESS = "LOAD_USERS_SUCCESS";
export const LOAD_USERS_FAILURE = "LOAD_USERS_FAILURE";
export const CLEAR_LOAD_USERS_STATE = "CLEAR_LOAD_USERS_STATE";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const UPDATE_USER_INFO_REQUEST = "UPDATE_USER_INFO_REQUEST";
export const UPDATE_USER_INFO_SUCCESS = "UPDATE_USER_INFO_SUCCESS";
export const UPDATE_USER_INFO_FAILURE = "UPDATE_USER_INFO_FAILURE";
export const CLEAR_UPDATE_USER_INFO_STATE = "CLEAR_UPDATE_USER_INFO_STATE";

export const UPDATE_USER_PASSWORD_REQUEST = "UPDATE_USER_PASSWORD_REQUEST";
export const UPDATE_USER_PASSWORD_SUCCESS = "UPDATE_USER_PASSWORD_SUCCESS";
export const UPDATE_USER_PASSWORD_FAILURE = "UPDATE_USER_PASSWORD_FAILURE";
export const CLEAR_UPDATE_USER_PASSWORD_STATE =
  "CLEAR_UPDATE_USER_PASSWORD_STATE";

export const SEND_CODE_EMAIL_REQUEST = "SEND_CODE_EMAIL_REQUEST";
export const SEND_CODE_EMAIL_SUCCESS = "SEND_CODE_EMAIL_SUCCESS";
export const SEND_CODE_EMAIL_FAILURE = "SEND_CODE_EMAIL_FAILURE";
export const CLEAR_SEND_CODE_EMAIL_STATE = "CLEAR_SEND_CODE_EMAIL_STATE";

export const CHANGE_FORGOTTEN_PASSWORD_REQUEST =
  "CHANGE_FORGOTTEN_PASSWORD_REQUEST";
export const CHANGE_FORGOTTEN_PASSWORD_SUCCESS =
  "CHANGE_FORGOTTEN_PASSWORD_SUCCESS";
export const CHANGE_FORGOTTEN_PASSWORD_FAILURE =
  "CHANGE_FORGOTTEN_PASSWORD_FAILURE";
export const CLEAR_CHANGE_FORGOTTEN_PASSWORD_STATE =
  "CLEAR_CHANGE_FORGOTTEN_PASSWORD_STATE";

export const LOGIN_BY_PROVIDER_REQUEST = "LOGIN_BY_PROVIDER_REQUEST";
export const LOGIN_BY_PROVIDER_SUCCESS = "LOGIN_BY_PROVIDER_SUCCESS";
export const LOGIN_BY_PROVIDER_FAILURE = "LOGIN_BY_PROVIDER_FAILURE";

export const REGISTER_BY_PROVIDER_REQUEST = "REGISTER_BY_PROVIDER_REQUEST";
export const REGISTER_BY_PROVIDER_SUCCESS = "REGISTER_BY_PROVIDER_SUCCESS";
export const REGISTER_BY_PROVIDER_FAILURE = "REGISTER_BY_PROVIDER_FAILURE";

export const HANDLE_ERROR = "HANDLE_ERROR";

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

export const refreshTokenByClientRequest = (payload) => ({
  type: REFRESH_TOKEN_BY_CLIENT_REQUEST,
  payload,
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

export const deleteReceivedMessageRequest = (payload) => ({
  type: DELETE_RECEIVED_MESSAGE_REQUEST,
  payload,
});

export const deleteReceivedMessageSuccess = (payload) => ({
  type: DELETE_RECEIVED_MESSAGE_SUCCESS,
  payload,
});

export const deleteReceivedMessageFailure = (payload) => ({
  type: DELETE_RECEIVED_MESSAGE_FAILURE,
  payload,
});

export const clearDeleteReceivedMessageState = () => ({
  type: CLEAR_DELETE_RECEIVED_MESSAGE_STATE,
});

export const deleteSentMessageRequest = (payload) => ({
  type: DELETE_SENT_MESSAGE_REQUEST,
  payload,
});

export const deleteSentMessageSuccess = (payload) => ({
  type: DELETE_SENT_MESSAGE_SUCCESS,
  payload,
});

export const deleteSentMessageFailure = (payload) => ({
  type: DELETE_SENT_MESSAGE_FAILURE,
  payload,
});

export const clearDeleteSentMessageState = () => ({
  type: CLEAR_DELETE_SENT_MESSAGE_STATE,
});

export const loadMyFriendsRequest = () => ({
  type: LOAD_MY_FRIENDS_REQUEST,
});

export const loadMyFriendsSuccess = (payload) => ({
  type: LOAD_MY_FRIENDS_SUCCESS,
  payload,
});

export const loadMyFriendsFailure = () => ({
  type: LOAD_MY_FRIENDS_FAILURE,
});

export const clearMyFriendsState = () => ({
  type: CLEAR_MY_FRIENDS_STATE,
});

export const setLoadUser = (payload) => ({
  type: SET_LOAD_USER,
  payload,
});

export const deleteFriendRequest = (payload) => ({
  type: DELETE_FRIEND_REQUEST,
  payload,
});

export const deleteFriendSuccess = (payload) => ({
  type: DELETE_FRIEND_SUCCESS,
  payload,
});

export const deleteFriendFailure = (payload) => ({
  type: DELETE_FRIEND_FAILURE,
  payload,
});

export const clearDeleteFriendState = () => ({
  type: CLEAR_DELETE_FRIEND_STATE,
});

export const loadUsersRequest = (payload) => ({
  type: LOAD_USERS_REQUEST,
  payload,
});

export const loadUsersSuccess = (payload) => ({
  type: LOAD_USERS_SUCCESS,
  payload,
});

export const loadUsersFailure = (payload) => ({
  type: LOAD_USERS_FAILURE,
  payload,
});

export const clearLoadUsersState = () => ({
  type: CLEAR_LOAD_USERS_STATE,
});

export const handleError = (payload) => ({
  type: HANDLE_ERROR,
  payload,
});

export const deleteUserRequest = () => ({
  type: DELETE_USER_REQUEST,
});

export const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS,
});

export const deleteUserFailure = () => ({
  type: DELETE_USER_FAILURE,
});

export const updateUserInfoRequest = (payload) => ({
  type: UPDATE_USER_INFO_REQUEST,
  payload,
});

export const updateUserInfoSuccess = () => ({
  type: UPDATE_USER_INFO_SUCCESS,
});

export const updateUserInfoFailure = (payload) => ({
  type: UPDATE_USER_INFO_FAILURE,
  payload,
});

export const clearUpdateUserInfoState = () => ({
  type: CLEAR_UPDATE_USER_INFO_STATE,
});

export const updateUserPasswordRequest = (payload) => ({
  type: UPDATE_USER_PASSWORD_REQUEST,
  payload,
});

export const updateUserPasswordSuccess = () => ({
  type: UPDATE_USER_PASSWORD_SUCCESS,
});

export const updateUserPasswordFailure = (payload) => ({
  type: UPDATE_USER_PASSWORD_FAILURE,
  payload,
});

export const clearUpdateUserPasswordState = () => ({
  type: CLEAR_UPDATE_USER_PASSWORD_STATE,
});

export const sendCodeEmailRequest = (payload) => ({
  type: SEND_CODE_EMAIL_REQUEST,
  payload,
});

export const sendCodeEmailSuccess = () => ({
  type: SEND_CODE_EMAIL_SUCCESS,
});

export const sendCodeEmailFailure = (payload) => ({
  type: SEND_CODE_EMAIL_FAILURE,
  payload,
});

export const clearSendCodeEmailState = () => ({
  type: CLEAR_SEND_CODE_EMAIL_STATE,
});

export const changeForgottenPasswordRequest = (payload) => ({
  type: CHANGE_FORGOTTEN_PASSWORD_REQUEST,
  payload,
});

export const changeForgottenPasswordSuccess = () => ({
  type: CHANGE_FORGOTTEN_PASSWORD_SUCCESS,
});

export const changeForgottenPasswordFailure = (payload) => ({
  type: CHANGE_FORGOTTEN_PASSWORD_FAILURE,
  payload,
});

export const clearChangeForgottenPasswordState = () => ({
  type: CLEAR_CHANGE_FORGOTTEN_PASSWORD_STATE,
});

export const loginByProviderRequest = (payload) => ({
  type: LOGIN_BY_PROVIDER_REQUEST,
  payload,
});

export const loginByProviderSuccess = (payload) => ({
  type: LOGIN_BY_PROVIDER_SUCCESS,
  payload,
});

export const loginByProviderFailure = (payload) => ({
  type: LOGIN_BY_PROVIDER_FAILURE,
  payload,
});

export const registerByProviderRequest = (payload) => ({
  type: REGISTER_BY_PROVIDER_REQUEST,
  payload,
});

export const registerByProviderSuccess = (payload) => ({
  type: REGISTER_BY_PROVIDER_SUCCESS,
  payload,
});

export const registerByProviderFailure = (payload) => ({
  type: REGISTER_BY_PROVIDER_FAILURE,
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
      case REFRESH_TOKEN_BY_CLIENT_REQUEST:
      case REFRESH_TOKEN_REQUEST:
        draft.refreshTokenLoading = true;
        break;
      case REFRESH_TOKEN_SUCCESS:
        draft.refreshTokenLoading = false;
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
        draft.refreshTokenLoading = false;
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
      case DELETE_RECEIVED_MESSAGE_REQUEST:
        draft.deleteReceivedMessageLoading = true;
        break;
      case DELETE_RECEIVED_MESSAGE_SUCCESS:
        draft.deleteReceivedMessageLoading = false;
        draft.receivedMessages = draft.receivedMessages.filter(
          (m) => m.id !== action.payload.id
        );
        break;
      case DELETE_RECEIVED_MESSAGE_FAILURE:
        draft.deleteReceivedMessageLoading = false;
        draft.deleteReceivedMessageError = action.payload.msg;
        break;
      case CLEAR_DELETE_RECEIVED_MESSAGE_STATE:
        draft.deleteReceivedMessageLoading = false;
        draft.deleteReceivedMessageError = "";
        break;
      case DELETE_SENT_MESSAGE_REQUEST:
        draft.deleteSentMessageLoading = true;
        break;
      case DELETE_SENT_MESSAGE_SUCCESS:
        draft.deleteSentMessageLoading = false;
        draft.sentMessages = draft.sentMessages.filter(
          (m) => m.id !== action.payload.id
        );
        break;
      case DELETE_SENT_MESSAGE_FAILURE:
        draft.deleteSentMessageLoading = false;
        draft.deleteSentMessageError = action.payload.msg;
        break;
      case CLEAR_DELETE_SENT_MESSAGE_STATE:
        draft.deleteSentMessageLoading = false;
        draft.deleteSentMessageError = "";
        break;
      case LOAD_MY_FRIENDS_REQUEST:
        draft.loadMyFriendsLoading = true;
        break;
      case LOAD_MY_FRIENDS_SUCCESS:
        draft.loadMyFriendsLoading = false;
        draft.myFriends = action.payload.myFriends;
        break;
      case LOAD_MY_FRIENDS_FAILURE:
        draft.loadMyFriendsLoading = false;
        break;
      case CLEAR_MY_FRIENDS_STATE:
        draft.loadMyFriendsLoading = false;
        draft.myFriends = [];
        break;
      case SET_LOAD_USER:
        draft.loadUser.id = action.payload.info.id;
        draft.loadUser.uid = action.payload.info.uid;
        draft.loadUser.username = action.payload.info.username;
        draft.loadUser.nickname = action.payload.info.nickname;
        draft.loadUser.createdAt = action.payload.info.createdAt;
        draft.loadUser.modifiedAt = action.payload.info.modifiedAt;
        break;
      case DELETE_FRIEND_REQUEST:
        draft.deleteFriendLoading = true;
        break;
      case DELETE_FRIEND_SUCCESS:
        draft.deleteFriendLoading = false;
        draft.myFriends = draft.myFriends.filter(
          (f) => f.id !== action.payload.id
        );
        break;
      case DELETE_FRIEND_FAILURE:
        draft.deleteFriendLoading = false;
        draft.deleteFriendError = action.payload.msg;
        break;
      case CLEAR_DELETE_FRIEND_STATE:
        draft.deleteFriendLoading = false;
        draft.deleteFriendError = "";
        break;
      case LOAD_USERS_REQUEST:
        draft.loadUsers = [];
        draft.loadUsersLoading = true;
        break;
      case LOAD_USERS_SUCCESS:
        draft.loadUsers = action.payload.users;
        draft.loadUsersLoading = false;
        break;
      case LOAD_USERS_FAILURE:
        draft.loadUsersLoading = false;
        draft.loadUsersError = action.payload.msg;
        break;
      case CLEAR_LOAD_USERS_STATE:
        draft.loadUsers = [];
        draft.loadUsersLoading = false;
        draft.loadUsersError = "";
        break;
      case DELETE_USER_REQUEST:
        draft.deleteUserLoading = true;
        break;
      case DELETE_USER_SUCCESS:
        draft.deleteUserLoading = false;
        draft.deleteUserDone = true;
        break;
      case DELETE_USER_FAILURE:
        draft.deleteUserLoading = false;
        break;
      case UPDATE_USER_INFO_REQUEST:
        draft.updateUserInfoLoading = true;
        break;
      case UPDATE_USER_INFO_SUCCESS:
        draft.updateUserInfoDone = true;
        draft.updateUserInfoLoading = false;
        break;
      case UPDATE_USER_INFO_FAILURE:
        draft.updateUserInfoLoading = false;
        draft.updateUserInfoError = action.payload.msg;
        break;
      case CLEAR_UPDATE_USER_INFO_STATE:
        draft.updateUserInfoLoading = false;
        draft.updateUserInfoDone = false;
        draft.updateUserInfoError = "";
        break;
      case UPDATE_USER_PASSWORD_REQUEST:
        draft.updateUserPasswordLoading = true;
        break;
      case UPDATE_USER_PASSWORD_SUCCESS:
        draft.updateUserPasswordDone = true;
        draft.updateUserPasswordLoading = false;
        break;
      case UPDATE_USER_PASSWORD_FAILURE:
        draft.updateUserPasswordLoading = false;
        draft.updateUserPasswordError = action.payload.msg;
        break;
      case CLEAR_UPDATE_USER_PASSWORD_STATE:
        draft.updateUserPasswordLoading = false;
        draft.updateUserPasswordDone = false;
        draft.updateUserPasswordError = "";
        break;
      case SEND_CODE_EMAIL_REQUEST:
        draft.sendCodeEmailLoading = true;
        break;
      case SEND_CODE_EMAIL_SUCCESS:
        draft.sendCodeEmailLoading = false;
        break;
      case SEND_CODE_EMAIL_FAILURE:
        draft.sendCodeEmailLoading = false;
        draft.sendCodeEmailError = action.payload.msg;
        break;
      case CLEAR_SEND_CODE_EMAIL_STATE:
        draft.sendCodeEmailLoading = false;
        draft.sendCodeEmailError = "";
        break;
      case CHANGE_FORGOTTEN_PASSWORD_REQUEST:
        draft.changeForgottenPasswordLoading = true;
        break;
      case CHANGE_FORGOTTEN_PASSWORD_SUCCESS:
        draft.changeForgottenPasswordLoading = false;
        draft.changeForgottenPasswordDone = true;
        break;
      case CHANGE_FORGOTTEN_PASSWORD_FAILURE:
        draft.changeForgottenPasswordLoading = false;
        draft.changeForgottenPasswordError = action.payload.msg;
        break;
      case CLEAR_CHANGE_FORGOTTEN_PASSWORD_STATE:
        draft.changeForgottenPasswordLoading = false;
        draft.changeForgottenPasswordError = "";
        draft.changeForgottenPasswordDone = false;
        break;
      case LOGIN_BY_PROVIDER_REQUEST:
        draft.loginLoading = true;
        break;
      case LOGIN_BY_PROVIDER_SUCCESS:
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
      case LOGIN_BY_PROVIDER_FAILURE:
        draft.loginLoading = false;
        draft.loginError = action.payload.msg;
        break;
      case REGISTER_BY_PROVIDER_REQUEST:
        draft.registerLoading = true;
        break;
      case REGISTER_BY_PROVIDER_SUCCESS:
        draft.registerLoading = false;
        draft.registerDone = true;
        draft.id = action.payload.info.id;
        draft.uid = action.payload.info.uid;
        draft.username = action.payload.info.username;
        draft.nickname = action.payload.info.nickname;
        draft.createdAt = action.payload.info.createdAt;
        draft.modifiedAt = action.payload.info.modifiedAt;
        draft.accessToken = action.payload.accessToken;
        draft.refreshToken = action.payload.refreshToken;
        break;
      case REGISTER_BY_PROVIDER_FAILURE:
        draft.registerLoading = false;
        draft.registerError = action.payload.msg;
        break;
      default:
        break;
    }
  });

export default reducer;
