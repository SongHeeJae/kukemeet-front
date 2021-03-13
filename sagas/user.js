import {
  all,
  takeLatest,
  put,
  call,
  fork,
  select,
  takeEvery,
  take,
} from "redux-saga/effects";
import axios from "axios";
import {
  registerSuccess,
  REGISTER_REQUEST,
  registerFailure,
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
  REFRESH_TOKEN_REQUEST,
  refreshTokenSuccess,
  refreshTokenFailure,
  refreshTokenRequest,
  LOAD_ME_REQUEST,
  loadMeSuccess,
  loadMeFailure,
  LOAD_USER_BY_NICKNAME_REQUEST,
  loadUserByNicknameSuccess,
  loadUserByNicknameFailure,
  ADD_FRIEND_REQUEST,
  addFriendFailure,
  addFriendSuccess,
  SEND_MESSAGE_REQUEST,
  sendMessageSuccess,
  sendMessageFailure,
  LOGOUT_REQUEST,
  logoutFailure,
  logoutSuccess,
  LOAD_RECEIVED_MESSAGES_REQUEST,
  LOAD_SENT_MESSAGES_REQUEST,
  loadReceivedMessagesSuccess,
  loadReceivedMessagesFailure,
  loadSentMessagesSuccess,
  loadSentMessagesFailure,
  DELETE_RECEIVED_MESSAGE_REQUEST,
  DELETE_SENT_MESSAGE_REQUEST,
  deleteReceivedMessageFailure,
  deleteReceivedMessageSuccess,
  deleteSentMessageSuccess,
  deleteSentMessageFailure,
  LOAD_MY_FRIENDS_REQUEST,
  loadMyFriendsSuccess,
  loadMyFriendsFailure,
  DELETE_FRIEND_REQUEST,
  deleteFriendSuccess,
  deleteFriendFailure,
  LOAD_USERS_REQUEST,
  loadUsersSuccess,
  loadUsersFailure,
  HANDLE_ERROR,
  handleError,
  REFRESH_TOKEN_BY_CLIENT_REQUEST,
  refreshTokenByClientRequest,
  REFRESH_TOKEN_SUCCESS,
  DELETE_USER_REQUEST,
  deleteUserSuccess,
  deleteUserFailure,
  UPDATE_USER_INFO_REQUEST,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  UPDATE_USER_PASSWORD_REQUEST,
  updateUserPasswordSuccess,
  updateUserPasswordFailure,
} from "../reducers/user";

function registerAPI(data) {
  return axios.post("/api/sign/register", data);
}

function* register(action) {
  try {
    yield call(registerAPI, action.payload);
    yield put(registerSuccess());
  } catch (err) {
    yield put(registerFailure({ msg: err.response.data.msg }));
  }
}

function loginAPI(data) {
  return axios.post("/api/sign/login", data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.payload);
    const { accessToken, refreshToken, info } = result.data.data;
    yield put(loginSuccess({ accessToken, refreshToken, info }));
  } catch (err) {
    yield put(loginFailure({ msg: err.response.data.msg }));
  }
}

function refreshTokenAPI({ refreshToken }) {
  return axios.post(
    "/api/sign/refresh-token",
    {},
    {
      headers: {
        Authorization: refreshToken,
      },
    }
  );
}

function* refreshToken(action) {
  try {
    const result = yield call(refreshTokenAPI, action.payload);
    const { accessToken, refreshToken, info } = result.data.data;
    const setCookie = result.headers["set-cookie"];
    yield put(
      refreshTokenSuccess({ accessToken, refreshToken, info, setCookie })
    );
  } catch (err) {
    yield put(refreshTokenFailure());
  }
}

function* refreshTokenByClient(action) {
  try {
    const { task } = action.payload;
    const user = yield select((state) => state.user);
    const result = yield call(refreshTokenAPI, user);
    const { accessToken, refreshToken, info } = result.data.data;
    yield put(refreshTokenSuccess({ accessToken, refreshToken, info }));
    yield put(task);
  } catch (err) {
    yield put(refreshTokenFailure());
  }
}

function loadMeAPI({ accessToken }) {
  return axios.get("/api/users/me", {
    headers: {
      Authorization: accessToken,
    },
  });
}

function* loadMe(action) {
  try {
    const result = yield call(loadMeAPI, action.payload);
    const info = result.data.data;
    yield put(loadMeSuccess({ info }));
  } catch (err) {
    yield put(loadMeFailure());
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function loadUserByNicknameAPI({ nickname }) {
  return axios.get(`/api/users/nickname/${nickname}`);
}

function* loadUserByNickname(action) {
  try {
    const result = yield call(loadUserByNicknameAPI, action.payload);
    const info = result.data.data;
    yield put(loadUserByNicknameSuccess({ info }));
  } catch (err) {
    yield put(loadUserByNicknameFailure());
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function addFriendAPI(accessToken, { id }) {
  return axios.post(
    "/api/friends",
    { toId: id },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
}

function* addFriend(action) {
  try {
    const { accessToken } = yield select((state) => state.user);
    const result = yield call(addFriendAPI, accessToken, action.payload);
    const info = result.data.data;
    yield put(addFriendSuccess({ info }));
  } catch (err) {
    yield put(addFriendFailure({ msg: err.response.data.msg }));
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function sendMessageAPI(accessToken, { id, message }) {
  return axios.post(
    "/api/messages",
    { receiverId: id, msg: message },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
}

function* sendMessage(action) {
  try {
    const { accessToken } = yield select((state) => state.user);
    yield call(sendMessageAPI, accessToken, action.payload);
    yield put(sendMessageSuccess());
  } catch (err) {
    yield put(sendMessageFailure({ msg: err.response.data.msg }));
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function logoutAPI(accessToken) {
  return axios.post(
    "/api/sign/logout",
    {},
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
}

function* logout(action) {
  try {
    const { accessToken } = yield select((state) => state.user);
    yield call(logoutAPI, accessToken);
    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutFailure());
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function loadReceivedMessagesAPI(accessToken, receivedMessages) {
  const length = receivedMessages.length;
  const lastMessageId = length !== 0 && receivedMessages[length - 1].id;
  return axios.get(
    `/api/messages/received?lastMessageId=${lastMessageId || ""}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
}

function* loadReceivedMessages(action) {
  try {
    const { accessToken, receivedMessages } = yield select(
      (state) => state.user
    );
    const result = yield call(
      loadReceivedMessagesAPI,
      accessToken,
      receivedMessages
    );
    yield put(
      loadReceivedMessagesSuccess({
        messages: result.data.data,
        hasNext: result.data.hasNext,
      })
    );
  } catch (err) {
    yield put(loadReceivedMessagesFailure());
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function loadSentMessagesAPI(accessToken, sentMessages) {
  const length = sentMessages.length;
  const lastMessageId = length !== 0 && sentMessages[length - 1].id;
  return axios.get(`/api/messages/sent?lastMessageId=${lastMessageId || ""}`, {
    headers: {
      Authorization: accessToken,
    },
  });
}

function* loadSentMessages(action) {
  try {
    const { accessToken, sentMessages } = yield select((state) => state.user);
    const result = yield call(loadSentMessagesAPI, accessToken, sentMessages);
    yield put(
      loadSentMessagesSuccess({
        messages: result.data.data,
        hasNext: result.data.hasNext,
      })
    );
  } catch (err) {
    yield put(loadSentMessagesFailure());
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function deleteReceivedMessageAPI(accessToken, id) {
  return axios.delete(`/api/messages/received/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });
}

function* deleteReceivedMessage(action) {
  try {
    const { accessToken } = yield select((state) => state.user);
    const { id } = action.payload;
    yield call(deleteReceivedMessageAPI, accessToken, id);
    yield put(
      deleteReceivedMessageSuccess({
        id,
      })
    );
  } catch (err) {
    yield put(deleteReceivedMessageFailure({ msg: err.response.data.msg }));
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function deleteSentMessageAPI(accessToken, id) {
  return axios.delete(`/api/messages/sent/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });
}

function* deleteSentMessage(action) {
  try {
    const { accessToken } = yield select((state) => state.user);
    const { id } = action.payload;
    yield call(deleteSentMessageAPI, accessToken, id);
    yield put(
      deleteSentMessageSuccess({
        id,
      })
    );
  } catch (err) {
    yield put(deleteSentMessageFailure({ msg: err.response.data.msg }));
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function loadMyFriendsAPI(accessToken) {
  return axios.get(`/api/friends/me`, {
    headers: {
      Authorization: accessToken,
    },
  });
}

function* loadMyFriends(action) {
  try {
    const { accessToken } = yield select((state) => state.user);
    const result = yield call(loadMyFriendsAPI, accessToken);
    yield put(
      loadMyFriendsSuccess({
        myFriends: result.data.data,
      })
    );
  } catch (err) {
    yield put(loadMyFriendsFailure());
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function deleteFriendAPI(accessToken, id) {
  return axios.delete(`/api/friends/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });
}

function* deleteFriend(action) {
  try {
    const { accessToken } = yield select((state) => state.user);
    const { id } = action.payload;
    yield call(deleteFriendAPI, accessToken, id);
    yield put(deleteFriendSuccess({ id }));
  } catch (err) {
    yield put(deleteFriendFailure({ msg: err.response.data.msg }));
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function loadUsersAPI(conditions) {
  const { uid, nickname, username } = conditions;
  return axios.get(
    `/api/users?uid=${uid || ""}&nickname=${nickname || ""}&username=${
      username || ""
    }`
  );
}

function* loadUsers(action) {
  try {
    const result = yield call(loadUsersAPI, action.payload);
    yield put(loadUsersSuccess({ users: result.data.data }));
  } catch (err) {
    yield put(loadUsersFailure({ msg: err.response.data.msg }));
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function deleteUserAPI(id, accessToken) {
  return axios.delete(`/api/users/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });
}

function* deleteUser() {
  try {
    const { accessToken, id } = yield select((state) => state.user);
    yield call(deleteUserAPI, id, accessToken);
    yield put(deleteUserSuccess());
  } catch (err) {
    yield put(deleteUserFailure());
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function updateUserInfoAPI(id, accessToken, data) {
  return axios.put(`/api/users/${id}`, data, {
    headers: {
      Authorization: accessToken,
    },
  });
}

function* updateUserInfo(action) {
  try {
    const { accessToken, id } = yield select((state) => state.user);
    yield call(updateUserInfoAPI, id, accessToken, action.payload);
    yield put(updateUserInfoSuccess());
  } catch (err) {
    yield put(updateUserInfoFailure({ msg: err.response.data.msg }));
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function updateUserPasswordAPI(accessToken, data) {
  return axios.put(`/api/sign/change-password`, data, {
    headers: {
      Authorization: accessToken,
    },
  });
}

function* updateUserPassword(action) {
  try {
    const { accessToken } = yield select((state) => state.user);
    yield call(updateUserPasswordAPI, accessToken, action.payload);
    yield put(updateUserPasswordSuccess());
  } catch (err) {
    yield put(updateUserPasswordFailure({ msg: err.response.data.msg }));
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

function* errorHandling(action) {
  const { refreshTokenLoading } = yield select((state) => state.user);
  const { result, task } = action.payload;
  const { code } = result;
  if (code === -1001 || code === -1002) {
    if (refreshTokenLoading) {
      yield take(REFRESH_TOKEN_SUCCESS);
      yield put(task);
    } else {
      yield put(refreshTokenByClientRequest({ task }));
    }
  }
}

function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register);
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function* watchRefreshToken() {
  yield takeLatest(REFRESH_TOKEN_REQUEST, refreshToken);
}

function* watchRefreshTokenByClient() {
  yield takeEvery(REFRESH_TOKEN_BY_CLIENT_REQUEST, refreshTokenByClient);
}

function* watchLoadMe() {
  yield takeLatest(LOAD_ME_REQUEST, loadMe);
}

function* watchLoadUserByNickname() {
  yield takeLatest(LOAD_USER_BY_NICKNAME_REQUEST, loadUserByNickname);
}

function* watchAddFriend() {
  yield takeLatest(ADD_FRIEND_REQUEST, addFriend);
}

function* watchSendMessage() {
  yield takeLatest(SEND_MESSAGE_REQUEST, sendMessage);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchLoadReceivedMessages() {
  yield takeLatest(LOAD_RECEIVED_MESSAGES_REQUEST, loadReceivedMessages);
}

function* watchLoadSentMessages() {
  yield takeLatest(LOAD_SENT_MESSAGES_REQUEST, loadSentMessages);
}

function* watchDeleteReceivedMessage() {
  yield takeLatest(DELETE_RECEIVED_MESSAGE_REQUEST, deleteReceivedMessage);
}

function* watchDeleteSentMessage() {
  yield takeLatest(DELETE_SENT_MESSAGE_REQUEST, deleteSentMessage);
}

function* watchLoadMyFriends() {
  yield takeLatest(LOAD_MY_FRIENDS_REQUEST, loadMyFriends);
}

function* watchDeleteFriend() {
  yield takeLatest(DELETE_FRIEND_REQUEST, deleteFriend);
}

function* watchLoadUsers() {
  yield takeLatest(LOAD_USERS_REQUEST, loadUsers);
}

function* watchDeleteUser() {
  yield takeLatest(DELETE_USER_REQUEST, deleteUser);
}

function* watchUpdateUserInfo() {
  yield takeLatest(UPDATE_USER_INFO_REQUEST, updateUserInfo);
}

function* watchUpdateUserPassword() {
  yield takeLatest(UPDATE_USER_PASSWORD_REQUEST, updateUserPassword);
}

function* watchHandleError() {
  yield takeEvery(HANDLE_ERROR, errorHandling);
}

export default function* userSaga() {
  yield all([
    fork(watchRegister),
    fork(watchLogin),
    fork(watchRefreshToken),
    fork(watchRefreshTokenByClient),
    fork(watchLoadMe),
    fork(watchLoadUserByNickname),
    fork(watchAddFriend),
    fork(watchSendMessage),
    fork(watchLogout),
    fork(watchLoadReceivedMessages),
    fork(watchLoadSentMessages),
    fork(watchDeleteReceivedMessage),
    fork(watchDeleteSentMessage),
    fork(watchLoadMyFriends),
    fork(watchDeleteFriend),
    fork(watchLoadUsers),
    fork(watchHandleError),
    fork(watchDeleteUser),
    fork(watchUpdateUserInfo),
    fork(watchUpdateUserPassword),
  ]);
}
