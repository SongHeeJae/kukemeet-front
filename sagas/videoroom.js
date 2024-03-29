import {
  all,
  fork,
  put,
  takeLatest,
  call,
  select,
  takeEvery,
  delay,
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
  destroyRoomSuccess,
  destroyRoomFailure,
  DESTROY_ROOM_REQUEST,
  leaveRoomSuccess,
  leaveRoomFailure,
  LEAVE_ROOM_REQUEST,
  addRemoteFeedStream,
  sendFileSuccess,
  sendFileFailure,
  SEND_FILE_REQUEST,
  addReceiveFile,
  getRoomServerSuccess,
  getRoomServerFailure,
  GET_ROOM_SERVER_REQUEST,
  ACTIVE_RECORDING_REQUEST,
  INACTIVE_RECORDING_REQUEST,
  activeRecordingFailure,
  activeRecordingSuccess,
  inactiveRecordingSuccess,
  inactiveRecordingFailure,
} from "../reducers/videoroom";
import { handleError } from "../reducers/user";
import axios from "axios";
import { generateRandomString } from "../utils/utils";
import moment from "moment";

function getRoomServerAPI({ room }) {
  return axios.get(`/api/rooms/db/${room}`);
}

function* getRoomServer(action) {
  try {
    const result = yield call(getRoomServerAPI, action.payload);
    const { server } = result.data.data;
    yield put(getRoomServerSuccess({ server }));
  } catch (err) {
    console.log(err);
    yield put(getRoomServerFailure({ msg: err.response.data.msg }));
  }
}

function joinRoomAPI({ info, room, nickname, pin }) {
  const { pluginHandle } = info;
  pluginHandle.send({
    message: {
      request: "join",
      room: Number(room),
      pin: pin,
      ptype: "publisher",
      display: `${nickname}`,
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

function publishOwnFeedAPI(payload, useVideo, useAudio) {
  const { info, dispatch } = payload;
  const { pluginHandle } = info;

  pluginHandle.createOffer({
    media: {
      data: true,
      audioRecv: false,
      videoRecv: false,
      audioSend: useAudio,
      videoSend: useVideo,
    },
    success: function (jsep) {
      pluginHandle.muteAudio();
      pluginHandle.muteVideo();
      const publish = {
        request: "configure",
        audio: useAudio,
        video: useVideo,
      };
      pluginHandle.send({ message: publish, jsep: jsep });
    },
    error: function (err) {
      // Video ON  Mic ON 	1
      // Video OFF Mic ON 	2
      // Video ON  Mic OFF	3
      // Video OFF Mic OFF	4
      if (useVideo && useAudio) {
        publishOwnFeedAPI(payload, false, true); // 1 -> 2
      } else if (!useVideo && useAudio) {
        publishOwnFeedAPI(payload, true, false); // 2 -> 3
      } else if (useVideo && !useAudio) {
        publishOwnFeedAPI(payload, false, false); // 3 -> 4
      } else {
        throw err;
      }
    },
  });
}

function* publishOwnFeed(action) {
  try {
    yield call(publishOwnFeedAPI, action.payload, true, true);
  } catch (err) {
    console.log(err);
    yield put(publishOwnFeedFailure());
  }
}

// const remoteFeedsPluginHandle = [];

async function subscribeRemoteFeedAPI(
  myFeed,
  room,
  { info, id, display, audio, video, dispatch },
  activeSpeakerDetection,
  pin
) {
  return await new Promise((resolve, reject) => {
    const { janus, opaqueId } = info;
    let remotePluginHandle = null;
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
          pin,
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
            resolve({ id: msg["id"], display: msg["display"] });
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
        const addStream = { id, stream };
        if (stream.getAudioTracks() && stream.getAudioTracks().length > 0) {
          addStream.hark = hark(stream, {});
          if (activeSpeakerDetection) {
            addStream.hark = hark.on("speaking", () => {
              dispatch(changeMainStreamRequest({ display, stream }));
            });
          }
        }
        // remotePluginHandle.send({
        //   message: {
        //     request: "configure",
        //     video: false,
        //   },
        // });
        dispatch(addRemoteFeedStream(addStream));
      },
      oncleanup: function () {
        console.log("remotefeed cleanup");
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
              time: moment().format("HH:mm"),
            })
          );
        } else if (what === "receive_file") {
          dispatch(
            addReceiveFile({
              display: json["display"],
              filename: json["filename"],
              dataUrl: json["dataUrl"],
            })
          );
        }
      },
    });
  });
}

function* subscribeRemoteFeed(action) {
  try {
    const { myFeed, room, activeSpeakerDetection, pin } = yield select(
      (state) => state.videoroom
    );
    yield call(
      subscribeRemoteFeedAPI,
      myFeed,
      room,
      action.payload,
      activeSpeakerDetection,
      pin
    );
    yield put(subscribeRemoteFeedSuccess());
  } catch (err) {
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
    success: () => {
      dispatch(
        sendChatSuccess({ display, text, time: moment().format("HH:mm") })
      );
    },
  });
}

function* sendChat(action) {
  try {
    const room = yield select((state) => state.room);
    yield call(sendChatAPI, room, action.payload);
  } catch (err) {
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
    yield put(inactiveSpeakerDetectionFailure());
  }
}

function activeScreenSharingAPI({ info, dispatch }, useAudio, useVideo) {
  const { pluginHandle } = info;
  pluginHandle.createOffer({
    media: {
      video: "screen",
      audio: useAudio,
      replaceVideo: true,
    },
    success: function (jsep) {
      pluginHandle.send({
        message: {
          request: "configure",
          audio: useAudio,
          video: true,
        },
        jsep,
      });
      dispatch(activeScreenSharingSuccess());
      if (useVideo) dispatch(activeVideoSuccess());
    },
    error: function (error) {
      dispatch(activeScreenSharingFailure());
      dispatch(inactiveScreenSharingRequest({ info, dispatch }));
      throw error;
    },
  });
}

function* activeScreenSharing(action) {
  try {
    const { useAudio, useVideo } = yield select((state) => state.videoroom);
    yield call(activeScreenSharingAPI, action.payload, useAudio, useVideo);
  } catch (err) {
    console.log(err);
    yield put(activeScreenSharingFailure());
  }
}

function inactiveScreenSharingAPI({ info, dispatch }, useAudio, useVideo) {
  const { pluginHandle } = info;

  pluginHandle.createOffer({
    media: {
      video: useVideo,
      audio: useAudio,
      replaceVideo: useVideo,
    },
    success: function (jsep) {
      pluginHandle.send({
        message: {
          request: "configure",
          audio: useAudio,
          video: useVideo,
        },
        jsep: jsep,
      });
      dispatch(inactiveVideoRequest(info));
      dispatch(inactiveScreenSharingSuccess());
    },
    error: function (error) {
      dispatch(inactiveScreenSharingFailure());
      throw error;
    },
  });
}

function* inactiveScreenSharing(action) {
  try {
    const { useAudio, useVideo } = yield select((state) => state.videoroom);
    yield call(inactiveScreenSharingAPI, action.payload, useAudio, useVideo);
  } catch (err) {
    console.log(err);
    yield put(inactiveScreenSharingFailure());
  }
}

function activeRecordingAPI(stream, { dispatch }) {
  const download = (recordedChunks) => {
    const blob = new Blob([recordedChunks], {
      type: "video/mp4",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `KUKE meet - ${moment().format("YYYY-MM-DD HH-mm-ss")}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDataAvailable = (e) => {
    if (e.data.size > 0) {
      download(e.data);
    }
  };

  const handleStop = (dispatch) => {
    dispatch(inactiveRecordingSuccess());
  };

  const options = { mimeType: "video/webm; codecs=vp9" };
  const mediaRecorder = new MediaRecorder(stream, options);
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = () => handleStop(dispatch);
  mediaRecorder.start();
  return mediaRecorder;
}

function* activeRecording(action) {
  try {
    const { mainStream } = yield select((state) => state.videoroom);
    const { stream, display } = mainStream;
    const mediaRecorder = yield call(
      activeRecordingAPI,
      stream,
      action.payload
    );
    yield put(
      activeRecordingSuccess({
        mediaRecorder,
        display,
      })
    );
  } catch (err) {
    console.log(err);
    yield put(activeRecordingFailure());
  }
}

function inactiveRecordingAPI(mediaRecorder) {
  mediaRecorder.stop();
}

function* inactiveRecording() {
  try {
    const { mediaRecorder } = yield select((state) => state.videoroom);
    yield call(inactiveRecordingAPI, mediaRecorder);
  } catch (err) {
    console.log(err);
    yield put(inactiveRecordingFailure());
  }
}

async function createRoomAPI(title, accessToken) {
  return axios.post(
    "/api/rooms",
    { title },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
}

function* createRoom(action) {
  try {
    const { accessToken } = yield select((state) => state.user);
    const { title } = action.payload;
    const result = yield call(createRoomAPI, title, accessToken);
    const { pin, number, server } = result.data.data;
    yield put(
      createRoomSuccess({
        pin,
        number,
        server,
        title,
      })
    );
  } catch (err) {
    console.log(err);
    yield put(createRoomFailure());
    yield put(handleError({ result: err.response.data, task: action }));
  }
}

async function getRoomListAPI() {
  return axios.get(`/api/rooms`);
}

function* getRoomList(action) {
  try {
    const result = yield call(getRoomListAPI, action.payload);
    yield put(
      getRoomListSuccess({ list: result.data.data }) // 결과 값 처리
    );
  } catch (err) {
    yield put(getRoomListFailure());
  }
}

async function destroyRoomAPI(room, accessToken) {
  return null; // api 제거. 서버 내에서만 자동 파괴
  //   return axios.delete(`/api/rooms/${room}`, {
  //     headers: {
  //       Authorization: accessToken,
  //     },
  //   });
}

function* destroyRoom() {
  try {
    const { room } = yield select((state) => state.videoroom);
    const { accessToken } = yield select((state) => state.user);
    yield call(destroyRoomAPI, room, accessToken);
    yield put(destroyRoomSuccess());
  } catch (err) {
    console.log(err);
    yield put(destroyRoomFailure());
  }
}

async function leaveRoomAPI({ info }) {
  const { pluginHandle, janus } = info;
  const leave = {
    request: "leave",
  };
  return await new Promise((resolve, reject) => {
    pluginHandle.send({
      message: leave,
      success: () => {
        pluginHandle.hangup();
        janus.destroy();
        resolve();
      },
    });
  });
}

function* leaveRoom(action) {
  try {
    yield call(leaveRoomAPI, action.payload);
    yield put(leaveRoomSuccess());
  } catch (err) {
    console.log(err);
    yield put(leaveRoomFailure());
  }
}

// function connectFileStomp() {
//   return new Promise((resolve, reject) => {
//     const stompClient = Stomp.over(() => new SockJS(fileWebSocketUrl));
//     stompClient.reconnectDelay = 0; // 재연결 안함
//     stompClient.maxWebSocketChunkSize = 50 * 1024 * 1024;
//     stompClient.onConnect = (frame) => {
//       resolve(stompClient);
//     };
//     stompClient.debug = (str) => {}; // 디버깅 메세지 출력 X
//     stompClient.activate();
//   });
// }

// async function setUpForSendingFile(info, file, nickname, transaction) {
//   const { pluginHandle } = info;

//   const message = {
//     textroom: "ready_file",
//     transaction,
//     display: nickname,
//     filename: file.name,
//   };
//   return await new Promise((resolve) => {
//     pluginHandle.data({
//       text: JSON.stringify(message),
//       success: () => {
//         resolve();
//       },
//     });
//   });
// }

// async function sendFileAPI(file, transaction) {
//   return await new Promise((resolve, reject) => {
//     const chunkLength = 8 * 1024;
//     const onReadAsDataURL = async (event) => {
//       let text = event.target.result;
//       const stompClient = await connectFileStomp(transaction);
//       while (text.length > 0) {
//         const fileChunk = {};
//         if (text.length > chunkLength) {
//           fileChunk.data = text.slice(0, chunkLength); // getting chunk using predefined chunk length
//         } else {
//           fileChunk.data = text;
//           fileChunk.last = true;
//         }

//         stompClient.publish({
//           destination: `/pub/${transaction}`,
//           body: JSON.stringify(fileChunk),
//           skipContentLengthHeader: true,
//         });

//         text = text.slice(fileChunk.data.length);
//       }
//       stompClient.forceDisconnect();
//       resolve({ data: text, transaction });
//     };

//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.addEventListener("load", onReadAsDataURL);
//   });
// }

function uploadFileAPI(file, accessToken, room, transaction) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("transaction", transaction);
  formData.append("room", room);
  return axios.post("/api/files", formData, {
    headers: {
      Authorization: accessToken,
      "Content-Type": "multipart/form-data",
    },
  });
}

async function letOtherPeersKnowUploadFile(info, nickname, dataUrl, filename) {
  const { pluginHandle } = info;

  const message = {
    textroom: "receive_file",
    dataUrl,
    display: nickname,
    filename,
  };
  return await new Promise((resolve) => {
    pluginHandle.data({
      text: JSON.stringify(message),
      success: () => {
        resolve();
      },
    });
  });
}

function* sendFile(action) {
  try {
    const { info, file, transaction } = action.payload;
    const { room } = yield select((state) => state.videoroom);
    const { nickname, accessToken } = yield select((state) => state.user);
    const result = yield uploadFileAPI(file, accessToken, room, transaction);
    const { dataUrl } = result.data.data;
    yield letOtherPeersKnowUploadFile(info, nickname, dataUrl, file.name);
    yield put(sendFileSuccess({ transaction, dataUrl }));
  } catch (err) {
    console.log(err);
    yield put(
      sendFileFailure({
        msg: err.response.data.msg,
        transaction: action.payload.transaction,
      })
    );

    yield put(
      handleError({
        result: err.response.data,
        task: {
          ...action,
          payload: {
            ...action.payload,
            transaction: generateRandomString(12),
          },
        },
      })
    );
  }
}

function* watchGetRoomServer() {
  yield takeLatest(GET_ROOM_SERVER_REQUEST, getRoomServer);
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

function* watchActiveRecording() {
  yield takeEvery(ACTIVE_RECORDING_REQUEST, activeRecording);
}

function* watchInactiveRecording() {
  yield takeEvery(INACTIVE_RECORDING_REQUEST, inactiveRecording);
}

function* watchCreateRoom() {
  yield takeLatest(CREATE_ROOM_REQUEST, createRoom);
}

function* watchGetRoomList() {
  yield takeLatest(GET_ROOM_LIST_REQUEST, getRoomList);
}

function* watchDestroyRoom() {
  yield takeLatest(DESTROY_ROOM_REQUEST, destroyRoom);
}

function* watchLeaveRoom() {
  yield takeLatest(LEAVE_ROOM_REQUEST, leaveRoom);
}

function* watchSendFile() {
  yield takeEvery(SEND_FILE_REQUEST, sendFile);
}

export default function* videoroomSaga() {
  yield all([
    fork(watchGetRoomServer),
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
    fork(watchActiveRecording),
    fork(watchInactiveRecording),
    fork(watchCreateRoom),
    fork(watchGetRoomList),
    fork(watchDestroyRoom),
    fork(watchLeaveRoom),
    fork(watchSendFile),
  ]);
}
