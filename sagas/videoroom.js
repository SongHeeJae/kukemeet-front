import { all, fork, put, takeLatest, call, select } from "redux-saga/effects";
import { Janus } from "janus-gateway";
import {
  JOIN_ROOM_REQUEST,
  PUBLISH_OWN_FEED_REQUEST,
  joinRoomFailure,
  publishOwnFeedFailure,
  SUBSCRIBE_REMOTE_FEED_REQUEST,
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

function subscribeRemoteFeedAPI(
  myFeed,
  { info, id, display, audio, video, dispatch }
) {
  console.log("시작ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ함");
  const { janus, opaqueId } = info;
  let remotePluginHandle = null;
  return;
  janus.attach({
    plugin: "janus.plugin.videoroom",
    opaqueId: opaqueId,
    success: function (pluginHandle) {
      remotePluginHandle = pluginHandle;
      remotePluginHandle.simulcastStarted = false;
      let subscribe = {
        request: "join",
        room: myroom,
        ptype: "subscriber",
        feed: id,
        private_id: myFeed.mypvtid,
      };
      remoteFeed.videoCodec = video;
      remoteFeed.send({ message: subscribe });
    },
    error: function (error) {
      Janus.error("  -- Error attaching plugin...", error);
    },
    onmessage: function (msg, jsep) {
      Janus.debug(" ::: Got a message (subscriber) :::", msg);
      var event = msg["videoroom"];
      Janus.debug("Event: " + event);
      if (msg["error"]) {
        console.log(msg["error"]);
      } else if (event) {
        if (event === "attached") {
          remoteFeed.rfid = msg["id"];
          remoteFeed.rfdisplay = msg["display"];
          connectFeed(remoteFeed);
          Janus.log(
            "Successfully attached to feed " +
              remoteFeed.rfid +
              " (" +
              remoteFeed.rfdisplay +
              ") in room " +
              msg["room"]
          );
        } else if (event === "event") {
          var substream = msg["substream"];
          var temporal = msg["temporal"];
          if (
            (substream !== null && substream !== undefined) ||
            (temporal !== null && temporal !== undefined)
          ) {
            if (!remoteFeed.simulcastStarted) {
              remoteFeed.simulcastStarted = true;
              // addSimulcastButtons(remoteFeed.rfindex, remoteFeed.videoCodec === "vp8" || remoteFeed.videoCodec === "h264");
            }
            // updateSimulcastButtons(remoteFeed.rfindex, substream, temporal);
          }
        } else {
          // What has just happened?
        }
      }
      if (jsep) {
        Janus.debug("Handling SDP as well...", jsep);
        // Answer and attach
        remoteFeed.createAnswer({
          jsep: jsep,
          media: { data: true, audioSend: false, videoSend: false }, // We want recvonly audio/video
          success: function (jsep) {
            Janus.debug("Got SDP!", jsep);
            var body = { request: "start", room: myroom };
            remoteFeed.send({ message: body, jsep: jsep });
          },
          error: function (error) {
            Janus.error("WebRTC error:", error);
          },
        });
      }
    },
    iceState: function (state) {
      Janus.log(
        "ICE state of this WebRTC PeerConnection (feed #" +
          remoteFeed.rfid +
          ") changed to " +
          state
      );
    },
    webrtcState: function (on) {
      Janus.log(
        "Janus says this WebRTC PeerConnection (feed #" +
          remoteFeed.rfid +
          ") is " +
          (on ? "up" : "down") +
          " now"
      );
    },
    onlocalstream: function (stream) {},
    onremotestream: function (stream) {
      Janus.debug("Remote feed #" + remoteFeed.rfid + ", stream:", stream);

      setFeeds((prev) => {
        let findIndex = prev.findIndex((f) => f.rfid === remoteFeed.rfid);
        let newFeed = [...prev];
        newFeed[findIndex].stream = stream;
        newFeed[findIndex].hark = createSpeechEvents(stream);
        return newFeed;
      });
      // remoteFeed.stream = stream;
      var videoTracks = stream.getVideoTracks();
      if (!videoTracks || videoTracks.length === 0) {
        // 원격 비디오 없는 경우
      } else {
        // 있는 경우 뭐 별도 버튼처리
      }
    },
    oncleanup: function () {
      // 원격피드 끊기는 경우 처리
      console.log("다른 사용자 나감 ㅇㅇㅇ");
      //   disconnectFeed(remoteFeed);
    },
    ondataopen: function () {
      console.log("remote datachannel opened");
    },
    ondata: function (data) {
      let json = JSON.parse(data);
      let what = json["textroom"];
      if (what === "message") {
        // public message
        setReceiveChat(() => `${json["display"]} : ${json["text"]}`);
      } else if (what === "file") {
        let from = json["display"];
        let filename = json["text"]["filename"];
        let chunk = json["text"]["message"];
        let last = json["text"]["last"];
        if (!receivedFileChunk[from]) receivedFileChunk[from] = {};
        if (!receivedFileChunk[from][filename]) {
          receivedFileChunk[from][filename] = [];
        }
        receivedFileChunk[from][filename].push(chunk);
        if (last) {
          setReceiveFile(() => {
            return {
              data: receivedFileChunk[from][filename].join(""),
              filename: filename,
              from: from,
            };
          });
          delete receivedFileChunk[from][filename];
        }
      }
    },
  });
}

function* subscribeRemoteFeed(action) {
  try {
    const { myFeed } = yield select((state) => state.videoroom);
    yield call(subscribeRemoteFeedAPI, myFeed, action.payload);
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
