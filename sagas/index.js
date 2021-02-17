import { all, fork } from "redux-saga/effects";

import userSaga from "./user";
import videoroomSaga from "./videoroom";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(videoroomSaga)]); // 배열에 있는 것을 다 실행해줌
}
