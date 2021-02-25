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
  ]);
}
