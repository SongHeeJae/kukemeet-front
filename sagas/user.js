import { all, takeLatest, put, call, fork } from "redux-saga/effects";
import axios from "axios";
import {
  registerSuccess,
  REGISTER_REQUEST,
  registerFailure,
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

function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register);
}

export default function* userSaga() {
  yield all([fork(watchRegister)]);
}
