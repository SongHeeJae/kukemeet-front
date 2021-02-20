import { all, fork } from "redux-saga/effects";
import axios from "axios";
import { backServerUrl } from "../config/config";
import userSaga from "./user";
import videoroomSaga from "./videoroom";

axios.defaults.baseURL = backServerUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(videoroomSaga)]); // 배열에 있는 것을 다 실행해줌
}
