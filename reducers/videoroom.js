import produce from "immer";

export const initialState = {
  room: -1,
  myFeed: {},
  remoteFeeds: [],
  activeVideo: true,
  activeAudio: true,
  activeSpeakerDetection: false,
  activeScreenSharing: false,
  chatData: [
    {
      display: "테스트유저1",
      text: "안녕하세요~~",
    },
    {
      display: "테스트유저2",
      text: "ㅎㅎ 안녕하세요~~",
    },
  ],
  connectJanusLoading: false,
  connectJanusDone: false,
  joinRoomLoading: false,
  joinRoomDone: false,
  openDataChannelDone: false,
  mainStream: { stream: null, display: null },
};

export const CONNECT_JANUS_REQUEST = "CONNECT_JANUS_REQUEST";
export const CONNECT_JANUS_SUCCESS = "CONNECT_JANUS_SUCCESS";
export const CONNECT_JANUS_FAILURE = "CONNECT_JANUS_FAILURE";

export const JOIN_ROOM_REQUEST = "JOIN_ROOM_REQUEST";
export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS";
export const JOIN_ROOM_FAILURE = "JOIN_ROOM_FAILURE";

export const PUBLISH_OWN_FEED_REQUEST = "PUBLISH_OWN_FEED_REQUEST";
export const PUBLISH_OWN_FEED_SUCCESS = "PUBLISH_OWN_FEED_SUCCESS";
export const PUBLISH_OWN_FEED_FAILURE = "PUBLISH_OWN_FEED_FAILURE";

export const SUBSCRIBE_REMOTE_FEED_REQUEST = "SUBSCRIBE_REMOTE_FEED_REQUEST";
export const SUBSCRIBE_REMOTE_FEED_SUCCESS = "SUBSCRIBE_REMOTE_FEED_SUCCESS";
export const SUBSCRIBE_REMOTE_FEED_FAILURE = "SUBSCRIBE_REMOTE_FEED_FAILURE";

export const OPEN_DATA_CHANNEL_SUCCESS = "OPEN_DATA_CHANNEL_SUCCESS";

export const LEAVING_REMOTE_FEED_REQUEST = "LEAVING_REMOTE_FEED_REQUEST";
export const LEAVING_REMOTE_FEED_SUCCESS = "LEAVING_REMOTE_FEED_SUCCESS";
export const LEAVING_REMOTE_FEED_FAILURE = "LEAVING_REMOTE_FEED_FAILURE";

export const CHANGE_MAIN_STREAM = "CHANGE_MAIN_STREAM";

export const SEND_CHAT_REQUEST = "SEND_CHAT_REQUEST";
export const SEND_CHAT_SUCCESS = "SEND_CHAT_SUCCESS";
export const SEND_CHAT_FAILURE = "SEND_CHAT_FAILURE";

export const RECEIVE_CHAT_MESSAGE = "RECEIVE_CHAT_MESSAGE";

export const connectJanusRequest = () => ({
  type: CONNECT_JANUS_REQUEST,
});

export const connectJanusSuccess = () => ({
  type: CONNECT_JANUS_SUCCESS,
});

export const connectJanusFailure = () => ({
  type: CONNECT_JANUS_FAILURE,
});

export const joinRoomRequest = (payload) => ({
  type: JOIN_ROOM_REQUEST,
  payload,
});

export const joinRoomSuccess = (payload) => ({
  type: JOIN_ROOM_SUCCESS,
  payload,
});

export const joinRoomFailure = () => ({
  type: JOIN_ROOM_FAILURE,
});

export const publishOwnFeedRequest = (payload) => ({
  type: PUBLISH_OWN_FEED_REQUEST,
  payload,
});

export const publishOwnFeedSuccess = (payload) => ({
  type: PUBLISH_OWN_FEED_SUCCESS,
  payload,
});

export const publishOwnFeedFailure = () => ({
  type: PUBLISH_OWN_FEED_FAILURE,
});

export const subscribeRemoteFeedRequest = (payload) => ({
  type: SUBSCRIBE_REMOTE_FEED_REQUEST,
  payload,
});

export const subscribeRemoteFeedSuccess = (payload) => ({
  type: SUBSCRIBE_REMOTE_FEED_SUCCESS,
  payload,
});

export const subscribeRemoteFeedFailure = () => ({
  type: SUBSCRIBE_REMOTE_FEED_FAILURE,
});

export const openDataChannelSuccess = () => ({
  type: OPEN_DATA_CHANNEL_SUCCESS,
});

export const leavingRemoteFeedRequest = (payload) => ({
  type: LEAVING_REMOTE_FEED_REQUEST,
  payload,
});

export const leavingRemoteFeedSuccess = (payload) => ({
  type: LEAVING_REMOTE_FEED_SUCCESS,
  payload,
});

export const leavingRemoteFeedFailure = () => ({
  type: LEAVING_REMOTE_FEED_FAILURE,
});

export const changeMainStream = (payload) => ({
  type: CHANGE_MAIN_STREAM,
  payload,
});

export const sendChatRequest = (payload) => ({
  type: SEND_CHAT_REQUEST,
  payload,
});

export const sendChatSuccess = (payload) => ({
  type: SEND_CHAT_SUCCESS,
  payload,
});

export const sendChatFailure = () => ({
  type: SEND_CHAT_FAILURE,
});

export const receiveChatMessage = (payload) => ({
  type: RECEIVE_CHAT_MESSAGE,
  payload,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONNECT_JANUS_REQUEST:
        draft.connectJanusLoading = true;
        break;
      case CONNECT_JANUS_SUCCESS:
        draft.connectJanusLoading = false;
        draft.connectJanusDone = true;
        break;
      case CONNECT_JANUS_FAILURE:
        draft.connectJanusLoading = false;
        break;
      case JOIN_ROOM_REQUEST:
        draft.joinRoomLoading = true;
        break;
      case JOIN_ROOM_SUCCESS:
        draft.joinRoomLoading = false;
        draft.joinRoomDone = true;
        draft.myFeed.id = action.payload.id;
        draft.myFeed.privateId = action.payload.privateId;
        draft.room = action.payload.room;
        break;
      case JOIN_ROOM_FAILURE:
        draft.joinRoomLoading = false;
        break;
      case PUBLISH_OWN_FEED_REQUEST:
        break;
      case PUBLISH_OWN_FEED_SUCCESS:
        draft.myFeed.stream = action.payload.stream;
        break;
      case PUBLISH_OWN_FEED_FAILURE:
        break;
      case SUBSCRIBE_REMOTE_FEED_REQUEST:
        break;
      case SUBSCRIBE_REMOTE_FEED_SUCCESS:
        draft.remoteFeeds.push({
          id: action.payload.id,
          display: action.payload.display,
          stream: action.payload.stream,
        });
        break;
      case SUBSCRIBE_REMOTE_FEED_FAILURE:
        break;
      case OPEN_DATA_CHANNEL_SUCCESS:
        draft.openDataChannelDone = true;
      case LEAVING_REMOTE_FEED_REQUEST:
        break;
      case LEAVING_REMOTE_FEED_SUCCESS:
        draft.remoteFeeds = state.remoteFeeds.filter(
          (v) => v.id !== action.payload.id
        );
        break;
      case LEAVING_REMOTE_FEED_FAILURE:
        break;
      case CHANGE_MAIN_STREAM:
        draft.mainStream.stream = action.payload.stream;
        draft.mainStream.display = action.payload.display;
        break;
      case SEND_CHAT_REQUEST:
        break;
      case SEND_CHAT_SUCCESS:
        draft.chatData.push({
          display: action.payload.display,
          text: action.payload.text,
        });
        break;
      case SEND_CHAT_FAILURE:
        break;
      case RECEIVE_CHAT_MESSAGE:
        draft.chatData.push({
          display: action.payload.display,
          text: action.payload.text,
        });
      default:
        break;
    }
  });

export default reducer;
