import { all, takeLatest, put, call, fork, select } from "redux-saga/effects";
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
    const { task } = action.payload;
    const result = yield call(refreshTokenAPI, action.payload);
    const { accessToken, refreshToken, info } = result.data.data;
    const setCookie = result.headers["set-cookie"];
    yield put(
      refreshTokenSuccess({ accessToken, refreshToken, info, setCookie })
    );
    if (task) yield put(task);
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
    console.log(err);
    yield put(loadUserByNicknameFailure());
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

function* logout() {
  try {
    const { accessToken } = yield select((state) => state.user);
    yield call(logoutAPI, accessToken);
    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutFailure());
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

function* loadReceivedMessages() {
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

function* loadSentMessages() {
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
  }
}

function loadMyFriendsAPI(accessToken) {
  return axios.get(`/api/friends`, {
    headers: {
      Authorization: accessToken,
    },
  });
}

function* loadMyFriends() {
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
  }
}

function deleteFriendAPI(accessToken, id) {
  console.log("id", id);
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

export default function* userSaga() {
  yield all([
    fork(watchRegister),
    fork(watchLogin),
    fork(watchRefreshToken),
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
  ]);
}
