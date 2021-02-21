import { all, takeLatest, put, call, fork } from "redux-saga/effects";
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
    yield put(task);
  } catch (err) {
    console.log("에러는", err);
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

export default function* userSaga() {
  yield all([
    fork(watchRegister),
    fork(watchLogin),
    fork(watchRefreshToken),
    fork(watchLoadMe),
  ]);
}
