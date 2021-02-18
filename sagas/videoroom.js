import { all, fork, put, takeLatest, call, select } from "redux-saga/effects";
import { Janus } from "janus-gateway";
import {
  JOIN_ROOM_REQUEST,
  PUBLISH_OWN_FEED_REQUEST,
  joinRoomFailure,
  publishOwnFeedFailure,
  SUBSCRIBE_REMOTE_FEED_REQUEST,
  subscribeRemoteFeedSuccess,
  subscribeRemoteFeedFailure,
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
      if (useAudio) {
        publishOwnFeedAPI(pluginHandle, { info, useAudio: false }); // 오디오 꺼서 다시 요청
      } else {
        throw err;
      }
    },
  });
}

function* publishOwnFeed(action) {
  try {
    yield call(publishOwnFeedAPI, action.payload);
  } catch (err) {
    yield put(publishOwnFeedFailure());
  }
}

async function subscribeRemoteFeedAPI(
  myFeed,
  room,
  { info, id, display, audio, video, dispatch }
) {
  return await new Promise((resolve, reject) => {
    const { janus, opaqueId } = info;
    let remotePluginHandle = null;
    const remoteFeed = {};
    janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: opaqueId,
      success: function (pluginHandle) {
        remotePluginHandle = pluginHandle;
        remotePluginHandle.simulcastStarted = false;
        let subscribe = {
          request: "join",
          room: room,
          ptype: "subscriber",
          feed: id,
          private_id: myFeed.mypvtid,
        };
        remotePluginHandle.videoCodec = video;
        remotePluginHandle.send({ message: subscribe });
      },
      error: function (error) {
        Janus.error("  -- Error attaching plugin...", error);
      },
      onmessage: function (msg, jsep) {
        var event = msg["videoroom"];
        if (msg["error"]) {
          console.log(msg["error"]);
        } else if (event) {
          if (event === "attached") {
            remoteFeed.id = msg["id"];
            remoteFeed.display = msg["display"];
          } else if (event === "event") {
          } else {
            // What has just happened?
          }
        }
        if (jsep) {
          remotePluginHandle.createAnswer({
            jsep: jsep,
            media: { data: true, audioSend: false, videoSend: false }, // We want recvonly audio/video
            success: function (jsep) {
              var body = { request: "start", room: room };
              remotePluginHandle.send({ message: body, jsep: jsep });
            },
            error: function (error) {
              Janus.error("WebRTC error:", error);
            },
          });
        }
      },
      iceState: function (state) {},
      webrtcState: function (on) {},
      onlocalstream: function (stream) {},
      onremotestream: function (stream) {
        remoteFeed.stream = stream;
        resolve(remoteFeed);
      },
      oncleanup: function () {
        console.log("다른 사용자 나감 ㅇㅇㅇ");
      },
      ondataopen: function () {},
      ondata: function (data) {},
    });
  });
}

function* subscribeRemoteFeed(action) {
  try {
    const { myFeed, room } = yield select((state) => state.videoroom);
    const result = yield call(
      subscribeRemoteFeedAPI,
      myFeed,
      room,
      action.payload
    );
    yield put(subscribeRemoteFeedSuccess(result));
  } catch (err) {
    console.log(err);
    yield put(subscribeRemoteFeedFailure());
  }
}

function* watchJoinRoom() {
  yield takeLatest(JOIN_ROOM_REQUEST, joinRoom);
}

function* watchPublishOwnFeed() {
  yield takeLatest(PUBLISH_OWN_FEED_REQUEST, publishOwnFeed);
}

function* watchSubscribeRemoteFeed() {
  yield takeLatest(SUBSCRIBE_REMOTE_FEED_REQUEST, subscribeRemoteFeed);
}

export default function* videoroomSaga() {
  yield all([
    fork(watchJoinRoom),
    fork(watchPublishOwnFeed),
    fork(watchSubscribeRemoteFeed),
  ]);
}
