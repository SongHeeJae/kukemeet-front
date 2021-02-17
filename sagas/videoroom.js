import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import { Janus } from "janus-gateway";
import {
  CONNECT_JANUS_FAILURE,
  CONNECT_JANUS_REQUEST,
  CONNECT_JANUS_SUCCESS,
} from "../reducers/videoroom";

function connectJanusAPI(dispatch) {
  let opaqueId = "videoroom-" + Janus.randomString(12);
  Janus.init({
    debug: "all",
    callback: () => {
      let janus = new Janus({
        server: ["http://34.121.167.58:8088/janus", "ws://34.121.167.58:8188/"],
        success: () => {
          janus.attach({
            plugin: "janus.plugin.videoroom",
            opaqueId: opaqueId,
            success: (pluginHandle) => {
              let sfu = pluginHandle;
              dispatch({
                type: CONNECT_JANUS_SUCCESS,
                payload: { janus, sfu, opaqueId },
              });
            },
            error: (cause) => {
              console.log("error", cause);
            },
            consentDialog: (on) => {
              Janus.debug(
                "Consent dialog should be " + (on ? "on" : "off") + " now"
              );
            },
            iceState: (state) => {
              Janus.log("ICE state changed to " + state);
            },
            mediaState: (medium, on) => {
              Janus.log(
                "Janus " +
                  (on ? "started" : "stopped") +
                  " receiving our " +
                  medium
              );
            },
            webrtcState: (on) => {},
            onmessage: (msg, jsep) => {},
            onlocalstream: (stream) => {},
            onremotestream: (stream) => {
              // empty
            },
            ondataopen: (data) => {
              console.log("data channel opened");
            },
            ondata: (data) => {
              // empty
              console.log("내가받은메시지====\n", data);
            },
            oncleanup: () => {
              // 피어커넥션 플러그인 닫혔을 때
            },
          });
        },
      });
    },
    error: (error) => {
      Janus.error(error);
    },
    destroyed: () => {
      console.log("destroyed");
    },
  });
}

function* connectJanus(action) {
  try {
    const dispatch = action.payload;
    yield call(connectJanusAPI, dispatch);
  } catch (err) {
    console.log(err);
    yield put({
      type: CONNECT_JANUS_FAILURE,
    });
  }
}

function* watchConnectJanus() {
  yield takeLatest(CONNECT_JANUS_REQUEST, connectJanus);
}

export default function* videoroomSaga() {
  yield all([fork(watchConnectJanus)]);
}
