import { all, takeLatest, put, call, fork } from "redux-saga/effects";
import axios from "axios";
import {
  registerSuccess,
  REGISTER_REQUEST,
  registerFailure,
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
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
    console.log("데이터 ", result.data.data);
    const { acessToken, refreshToken, info } = result.data.data;
    console.log(info);
    yield put(loginSuccess({ info }));
  } catch (err) {
    console.log(err);
    yield put(loginFailure({ msg: err.response.data.msg }));
  }
}

function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register);
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

export default function* userSaga() {
  yield all([fork(watchRegister), fork(watchLogin)]);
}
