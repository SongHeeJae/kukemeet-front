import {
  all,
  fork,
  put,
  takeLatest,
  call,
  select,
  takeEvery,
} from "redux-saga/effects";
import { Janus } from "janus-gateway";
import hark from "hark";
import {
  JOIN_ROOM_REQUEST,
  PUBLISH_OWN_FEED_REQUEST,
  joinRoomFailure,
  publishOwnFeedFailure,
  SUBSCRIBE_REMOTE_FEED_REQUEST,
  subscribeRemoteFeedSuccess,
  subscribeRemoteFeedFailure,
  LEAVING_REMOTE_FEED_REQUEST,
  leavingRemoteFeedFailure,
  leavingRemoteFeedSuccess,
  SEND_CHAT_REQUEST,
  sendChatSuccess,
  receiveChatMessage,
  sendChatFailure,
  ACTIVE_AUDIO_REQUEST,
  INACTIVE_AUDIO_REQUEST,
  ACTIVE_VIDEO_REQUEST,
  INACTIVE_VIDEO_REQUEST,
  ACTIVE_SPEAKER_DETECTION_REQUEST,
  INACTIVE_SPEAKER_DETECTION_REQUEST,
  ACTIVE_SCREEN_SHARING_REQUEST,
  INACTIVE_SCREEN_SHARING_REQUEST,
  activeAudioFailure,
  activeAudioSuccess,
  inactiveAudioSuccess,
  inactiveAudioFailure,
  activeVideoRequest,
  activeVideoSuccess,
  activeVideoFailure,
  inactiveVideoRequest,
  inactiveVideoSuccess,
  inactiveVideoFailure,
  activeSpeakerDetectionSuccess,
  activeSpeakerDetectionFailure,
  inactiveSpeakerDetectionSuccess,
  inactiveSpeakerDetectionFailure,
  activeScreenSharingSuccess,
  activeScreenSharingFailure,
  inactiveScreenSharingSuccess,
  inactiveScreenSharingFailure,
  inactiveScreenSharingRequest,
  changeMainStreamRequest,
  changeMainStreamSuccess,
  changeMainStreamFailure,
  CHANGE_MAIN_STREAM_REQUEST,
  CREATE_ROOM_REQUEST,
  createRoomFailure,
  joinRoomRequest,
  GET_ROOM_LIST_REQUEST,
  getRoomListSuccess,
  getRoomListFailure,
  createRoomSuccess,
} from "../reducers/videoroom";

function joinRoomAPI({ info, room, username, nickname, password }) {
  const { pluginHandle } = info;
  pluginHandle.send({
    message: {
      request: "join",
      room,
      pin: password,
      ptype: "publisher",
      display: `${nickname}(${username})`,
    },
  });
}

function* joinRoom(action) {
  try {
    yield call(joinRoomAPI, action.payload);
  } catch (err) {
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

// const remoteFeedsPluginHandle = [];

async function subscribeRemoteFeedAPI(
  myFeed,
  room,
  { info, id, display, audio, video, dispatch },
  activeSpeakerDetection
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
        remoteFeed.hark = hark(stream, {}); // 보이스 추적
        if (activeSpeakerDetection) {
          remoteFeed.hark.on("speaking", () => {
            dispatch(
              changeMainStreamRequest({ display: remoteFeed.display, stream })
            );
          });
        }
        // remoteFeedsPluginHandle.push({
        //   id: remoteFeed.id,
        //   pluginHandle: remotePluginHandle,
        // });
        resolve(remoteFeed);
      },
      oncleanup: function () {
        console.log("다른 사용자 나감 ㅇㅇㅇ");
      },
      ondataopen: function () {},
      ondata: function (data) {
        const json = JSON.parse(data);
        const what = json["textroom"];
        if (what === "message") {
          dispatch(
            receiveChatMessage({
              display: json["display"],
              text: json["text"],
            })
          );
        }
      },
    });
  });
}

function* subscribeRemoteFeed(action) {
  try {
    const { myFeed, room, activeSpeakerDetection } = yield select(
      (state) => state.videoroom
    );
    const result = yield call(
      subscribeRemoteFeedAPI,
      myFeed,
      room,
      action.payload,
      activeSpeakerDetection
    );
    yield put(subscribeRemoteFeedSuccess(result));
  } catch (err) {
    yield put(subscribeRemoteFeedFailure());
  }
}

function leavingRemoteAPI(remoteFeeds, id) {
  //   const idx = remoteFeedsPluginHandle.findIndex((v) => v.id === id);
  //   const { pluginHandle } = remoteFeedsPluginHandle[idx];
  //   pluginHandle.detach();
  //   remoteFeedsPluginHandle.splice(idx, 1);
  const remoteFeed = remoteFeeds.find((v) => v.id === id);
  if (remoteFeed.hark) remoteFeed.hark.off("speaking");
}

function* leavingRemoteFeed(action) {
  try {
    const { remoteFeeds } = yield select((state) => state.videoroom);
    yield call(leavingRemoteAPI, remoteFeeds, action.payload.id);
    yield put(leavingRemoteFeedSuccess(action.payload));
  } catch (err) {
    yield put(leavingRemoteFeedFailure());
  }
}

function changeMainStreamAPI(mainStream, { display }) {
  if (mainStream.display === display)
    throw "already registered as the main stream.";
}

function* changeMainStream(action) {
  try {
    const { mainStream } = yield select((state) => state.videoroom);
    yield call(changeMainStreamAPI, mainStream, action.payload);
    yield put(changeMainStreamSuccess(action.payload));
  } catch (err) {
    yield put(changeMainStreamFailure());
  }
}

function sendChatAPI(room, { dispatch, info, display, text }) {
  const { pluginHandle } = info;
  const message = {
    textroom: "message",
    room,
    text,
    display,
  };
  pluginHandle.data({
    text: JSON.stringify(message),
    error: (err) => {
      console.log(err);
    },
    success: () => {
      dispatch(sendChatSuccess({ display, text }));
    },
  });
}

function* sendChat(action) {
  try {
    const room = yield select((state) => state.room);
    yield call(sendChatAPI, room, action.payload);
  } catch (err) {
    yield put(sendChatFailure());
  }
}

function activeAudioAPI({ pluginHandle }) {
  pluginHandle.unmuteAudio();
}

function* activeAudio(action) {
  try {
    yield call(activeAudioAPI, action.payload);
    yield put(activeAudioSuccess());
  } catch (err) {
    yield put(activeAudioFailure());
  }
}

function inactiveAudioAPI({ pluginHandle }) {
  pluginHandle.muteAudio();
}

function* inactiveAudio(action) {
  try {
    yield call(inactiveAudioAPI, action.payload);
    yield put(inactiveAudioSuccess());
  } catch (err) {
    yield put(inactiveAudioFailure());
  }
}

function activeVideoAPI({ pluginHandle }) {
  pluginHandle.unmuteVideo();
}

function* activeVideo(action) {
  try {
    yield call(activeVideoAPI, action.payload);
    yield put(activeVideoSuccess());
  } catch (err) {
    yield put(activeVideoFailure());
  }
}

function inactiveVideoAPI({ pluginHandle }) {
  pluginHandle.muteVideo();
}

function* inactiveVideo(action) {
  try {
    yield call(inactiveVideoAPI, action.payload);
    yield put(inactiveVideoSuccess());
  } catch (err) {
    yield put(inactiveVideoFailure());
  }
}

function activeSpeakerDetectionAPI(remoteFeeds, { dispatch }) {
  remoteFeeds.forEach((v) => {
    if (!v.hark) return;
    v.hark.on("speaking", () => {
      dispatch(
        changeMainStreamRequest({ display: v.display, stream: v.stream })
      );
    });
  });
}

function* activeSpeakerDetection(action) {
  try {
    const { remoteFeeds } = yield select((state) => state.videoroom);
    yield call(activeSpeakerDetectionAPI, remoteFeeds, action.payload);
    yield put(activeSpeakerDetectionSuccess());
  } catch (err) {
    yield put(activeSpeakerDetectionFailure());
  }
}

function inactiveSpeakerDetectionAPI(remoteFeeds) {
  remoteFeeds.forEach((v) => {
    if (!v.hark) return;
    v.hark.off("speaking");
  });
}

function* inactiveSpeakerDetection() {
  try {
    const { remoteFeeds } = yield select((state) => state.videoroom);
    yield call(inactiveSpeakerDetectionAPI, remoteFeeds);
    yield put(inactiveSpeakerDetectionSuccess());
  } catch (err) {
    yield put(inactiveSpeakerDetectionFailure());
  }
}

function activeScreenSharingAPI({ info, dispatch }) {
  const { pluginHandle } = info;
  pluginHandle.createOffer({
    media: {
      video: "screen",
      replaceVideo: true,
    },
    success: function (jsep) {
      pluginHandle.send({ message: { audio: true, video: true }, jsep: jsep });
      dispatch(activeScreenSharingSuccess());
      dispatch(activeVideoRequest());
    },
    error: function (error) {
      dispatch(activeScreenSharingFailure());
      dispatch(inactiveScreenSharingRequest({ info, dispatch }));
    },
  });
}

function* activeScreenSharing(action) {
  try {
    yield call(activeScreenSharingAPI, action.payload);
  } catch (err) {
    yield put(activeScreenSharingFailure());
  }
}

function inactiveScreenSharingAPI({ info, dispatch }) {
  const { pluginHandle } = info;
  pluginHandle.createOffer({
    media: {
      replaceVideo: true,
    },
    success: function (jsep) {
      pluginHandle.send({ message: { audio: true, video: true }, jsep: jsep });
      dispatch(inactiveScreenSharingSuccess());
      dispatch(activeVideoRequest());
    },
    error: function (error) {
      dispatch(inactiveScreenSharingFailure());
    },
  });
}

function* inactiveScreenSharing(action) {
  try {
    yield call(inactiveScreenSharingAPI, action.payload);
  } catch (err) {
    yield put(inactiveScreenSharingFailure());
  }
}

async function createRoomAPI(info, title, password) {
  const { pluginHandle } = info;
  const create = {
    request: "create",
    description: title,
    secret: password,
    pin: password,
  };

  return await new Promise((resolve, reject) => {
    pluginHandle.send({
      message: create,
      success: (data) => {
        resolve(data);
      },
    });
  });
}

function* createRoom(action) {
  try {
    const { info, title, password } = action.payload;
    const { username, nickname } = yield select((state) => state.user);
    const result = yield call(createRoomAPI, info, title, password);
    yield put(createRoomSuccess());
    yield put(
      joinRoomRequest({
        info: info,
        room: result.room,
        nickname,
        username,
        password,
      })
    );
  } catch (err) {
    console.log(err);
    yield put(createRoomFailure());
  }
}

async function getRoomListAPI({ info }) {
  const { pluginHandle } = info;
  const list = {
    request: "list",
  };
  return await new Promise((resolve, reject) => {
    pluginHandle.send({
      message: list,
      success: (data) => {
        resolve(data);
      },
    });
  });
}

function* getRoomList(action) {
  try {
    const result = yield call(getRoomListAPI, action.payload);
    console.log(result);
    yield put(
      getRoomListSuccess({ result }) // 결과 값 처리
    );
  } catch (err) {
    console.log(err);
    yield put(getRoomListFailure());
  }
}

function* watchJoinRoom() {
  yield takeLatest(JOIN_ROOM_REQUEST, joinRoom);
}

function* watchPublishOwnFeed() {
  yield takeLatest(PUBLISH_OWN_FEED_REQUEST, publishOwnFeed);
}

function* watchSubscribeRemoteFeed() {
  yield takeEvery(SUBSCRIBE_REMOTE_FEED_REQUEST, subscribeRemoteFeed);
}

function* watchLeavingRemoteFeed() {
  yield takeEvery(LEAVING_REMOTE_FEED_REQUEST, leavingRemoteFeed);
}

function* watchChangeMainStream() {
  yield takeLatest(CHANGE_MAIN_STREAM_REQUEST, changeMainStream);
}

function* watchSendChat() {
  yield takeEvery(SEND_CHAT_REQUEST, sendChat);
}

function* watchActiveAudio() {
  yield takeEvery(ACTIVE_AUDIO_REQUEST, activeAudio);
}

function* watchInactiveAudio() {
  yield takeEvery(INACTIVE_AUDIO_REQUEST, inactiveAudio);
}

function* watchActiveVideo() {
  yield takeEvery(ACTIVE_VIDEO_REQUEST, activeVideo);
}

function* watchInactiveVideo() {
  yield takeEvery(INACTIVE_VIDEO_REQUEST, inactiveVideo);
}

function* watchActiveSpeakerDetection() {
  yield takeEvery(ACTIVE_SPEAKER_DETECTION_REQUEST, activeSpeakerDetection);
}

function* watchInactiveSpeakerDetection() {
  yield takeEvery(INACTIVE_SPEAKER_DETECTION_REQUEST, inactiveSpeakerDetection);
}

function* watchActiveScreenSharing() {
  yield takeEvery(ACTIVE_SCREEN_SHARING_REQUEST, activeScreenSharing);
}

function* watchInactiveScreenSharing() {
  yield takeEvery(INACTIVE_SCREEN_SHARING_REQUEST, inactiveScreenSharing);
}

function* watchCreateRoom() {
  yield takeLatest(CREATE_ROOM_REQUEST, createRoom);
}

function* watchGetRoomList() {
  yield takeLatest(GET_ROOM_LIST_REQUEST, getRoomList);
}

export default function* videoroomSaga() {
  yield all([
    fork(watchJoinRoom),
    fork(watchPublishOwnFeed),
    fork(watchSubscribeRemoteFeed),
    fork(watchLeavingRemoteFeed),
    fork(watchChangeMainStream),
    fork(watchSendChat),
    fork(watchActiveAudio),
    fork(watchInactiveAudio),
    fork(watchActiveVideo),
    fork(watchInactiveVideo),
    fork(watchActiveSpeakerDetection),
    fork(watchInactiveSpeakerDetection),
    fork(watchActiveScreenSharing),
    fork(watchInactiveScreenSharing),
    fork(watchCreateRoom),
    fork(watchGetRoomList),
  ]);
}
