import { all, fork, put, takeLatest, call, select } from "redux-saga/effects";
import { Janus } from "janus-gateway";
import {
  JOIN_ROOM_REQUEST,
  PUBLISH_OWN_FEED_REQUEST,
  joinRoomFailure,
  publishOwnFeedFailure,
} from "../reducers/videoroom";
import produce from "immer";

function joinRoomAPI({ info, room, username, nickname }) {
  const { pluginHandle } = info;
  pluginHandle.send({
    message: {
      request: "join",
      room,
      ptype: "publisher",
      display: `${nickname}(${username})`,
    },
  });
}

function* joinRoom(action) {
  try {
    yield call(joinRoomAPI, action.payload);
  } catch (err) {
    console.log(err);
    yield put(joinRoomFailure());
  }
}

function publishOwnFeedAPI({ info, useAudio }) {
  const { pluginHandle } = info;
  pluginHandle.createOffer({
    media: {
      data: true,
      audioRecv: false,
      videoRecv: false,
      audioSend: useAudio,
      videoSend: true,
    },
    success: function (jsep) {
      var publish = {
        request: "configure",
        audio: useAudio,
        video: true,
      };
      pluginHandle.send({ message: publish, jsep: jsep });
    },
    error: function (err) {
      console.log("err", err);
      if (useAudio) {
        publishOwnFeedAPI(pluginHandle, { info, useAudio: false }); // 오디오 꺼서 다시 요청
      }
    },
  });
}

function* publishOwnFeed(action) {
  try {
    yield call(publishOwnFeedAPI, action.payload);
  } catch (err) {
    console.log(err);
    yield put(publishOwnFeedFailure());
  }
}

function* watchJoinRoom() {
  yield takeLatest(JOIN_ROOM_REQUEST, joinRoom);
}

function* watchPublishOwnFeed() {
  yield takeLatest(PUBLISH_OWN_FEED_REQUEST, publishOwnFeed);
}

export default function* videoroomSaga() {
  yield all([fork(watchJoinRoom), fork(watchPublishOwnFeed)]);
}
