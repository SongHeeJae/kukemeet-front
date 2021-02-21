import produce from "immer";

export const initialState = {
  room: 0,
  title: "",
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
  joinRoomError: "",
  createRoomLoading: false,
  createRoomDone: false,
  openDataChannelDone: false,
  getRoomListLoading: false,
  getRoomListDone: false,
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

export const CHANGE_MAIN_STREAM_REQUEST = "CHANGE_MAIN_STREAM_REQUEST";
export const CHANGE_MAIN_STREAM_SUCCESS = "CHANGE_MAIN_STREAM_SUCCESS";
export const CHANGE_MAIN_STREAM_FAILURE = "CHANGE_MAIN_STREAM_FAILURE";

export const SEND_CHAT_REQUEST = "SEND_CHAT_REQUEST";
export const SEND_CHAT_SUCCESS = "SEND_CHAT_SUCCESS";
export const SEND_CHAT_FAILURE = "SEND_CHAT_FAILURE";

export const RECEIVE_CHAT_MESSAGE = "RECEIVE_CHAT_MESSAGE";

export const ACTIVE_AUDIO_REQUEST = "ACTIVE_AUDIO_REQUEST";
export const ACTIVE_AUDIO_SUCCESS = "ACTIVE_AUDIO_SUCCESS";
export const ACTIVE_AUDIO_FAILURE = "ACTIVE_AUDIO_FAILURE";

export const INACTIVE_AUDIO_REQUEST = "INACTIVE_AUDIO_REQUEST";
export const INACTIVE_AUDIO_SUCCESS = "INACTIVE_AUDIO_SUCCESS";
export const INACTIVE_AUDIO_FAILURE = "INACTIVE_AUDIO_FAILURE";

export const ACTIVE_VIDEO_REQUEST = "ACTIVE_VIDEO_REQUEST";
export const ACTIVE_VIDEO_SUCCESS = "ACTIVE_VIDEO_SUCCESS";
export const ACTIVE_VIDEO_FAILURE = "ACTIVE_VIDEO_FAILURE";

export const INACTIVE_VIDEO_REQUEST = "INACTIVE_VIDEO_REQUEST";
export const INACTIVE_VIDEO_SUCCESS = "INACTIVE_VIDEO_SUCCESS";
export const INACTIVE_VIDEO_FAILURE = "INACTIVE_VIDEO_FAILURE";

export const ACTIVE_SPEAKER_DETECTION_REQUEST =
  "ACTIVE_SPEAKER_DETECTION_REQUEST";
export const ACTIVE_SPEAKER_DETECTION_SUCCESS =
  "ACTIVE_SPEAKER_DETECTION_SUCCESS";
export const ACTIVE_SPEAKER_DETECTION_FAILURE =
  "ACTIVE_SPEAKER_DETECTION_FAILURE";

export const INACTIVE_SPEAKER_DETECTION_REQUEST =
  "INACTIVE_SPEAKER_DETECTION_REQUEST";
export const INACTIVE_SPEAKER_DETECTION_SUCCESS =
  "INACTIVE_SPEAKER_DETECTION_SUCCESS";
export const INACTIVE_SPEAKER_DETECTION_FAILURE =
  "INACTIVE_SPEAKER_DETECTION_FAILURE";

export const ACTIVE_SCREEN_SHARING_REQUEST = "ACTIVE_SCREEN_SHARING_REQUEST";
export const ACTIVE_SCREEN_SHARING_SUCCESS = "ACTIVE_SCREEN_SHARING_SUCCESS";
export const ACTIVE_SCREEN_SHARING_FAILURE = "ACTIVE_SCREEN_SHARING_FAILURE";

export const INACTIVE_SCREEN_SHARING_REQUEST =
  "INACTIVE_SCREEN_SHARING_REQUEST";
export const INACTIVE_SCREEN_SHARING_SUCCESS =
  "INACTIVE_SCREEN_SHARING_SUCCESS";
export const INACTIVE_SCREEN_SHARING_FAILURE =
  "INACTIVE_SCREEN_SHARING_FAILURE";

export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_FAILURE = "CREATE_ROOM_FAILURE";

export const CLEAR_JOIN_ROOM_STATE = "CLEAR_JOIN_ROOM_STATE";

export const GET_ROOM_LIST_REQUEST = "GET_ROOM_LIST_REQUEST";
export const GET_ROOM_LIST_SUCCESS = "GET_ROOM_LIST_SUCCESS";
export const GET_ROOM_LIST_FAILURE = "GET_ROOM_LIST_FAILURE";

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

export const joinRoomFailure = (payload) => ({
  type: JOIN_ROOM_FAILURE,
  payload: payload || "",
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

export const changeMainStreamRequest = (payload) => ({
  type: CHANGE_MAIN_STREAM_REQUEST,
  payload,
});

export const changeMainStreamSuccess = (payload) => ({
  type: CHANGE_MAIN_STREAM_SUCCESS,
  payload,
});

export const changeMainStreamFailure = (payload) => ({
  type: CHANGE_MAIN_STREAM_FAILURE,
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

export const activeAudioRequest = (payload) => ({
  type: ACTIVE_AUDIO_REQUEST,
  payload,
});

export const activeAudioSuccess = () => ({
  type: ACTIVE_AUDIO_SUCCESS,
});

export const activeAudioFailure = () => ({
  type: ACTIVE_AUDIO_FAILURE,
});

export const inactiveAudioRequest = (payload) => ({
  type: INACTIVE_AUDIO_REQUEST,
  payload,
});

export const inactiveAudioSuccess = () => ({
  type: INACTIVE_AUDIO_SUCCESS,
});

export const inactiveAudioFailure = () => ({
  type: INACTIVE_AUDIO_FAILURE,
});

export const activeVideoRequest = (payload) => ({
  type: ACTIVE_VIDEO_REQUEST,
  payload,
});

export const activeVideoSuccess = () => ({
  type: ACTIVE_VIDEO_SUCCESS,
});

export const activeVideoFailure = () => ({
  type: ACTIVE_VIDEO_FAILURE,
});

export const inactiveVideoRequest = (payload) => ({
  type: INACTIVE_VIDEO_REQUEST,
  payload,
});

export const inactiveVideoSuccess = () => ({
  type: INACTIVE_VIDEO_SUCCESS,
});

export const inactiveVideoFailure = () => ({
  type: INACTIVE_VIDEO_FAILURE,
});

export const activeSpeakerDetectionRequest = (payload) => ({
  type: ACTIVE_SPEAKER_DETECTION_REQUEST,
  payload,
});

export const activeSpeakerDetectionSuccess = () => ({
  type: ACTIVE_SPEAKER_DETECTION_SUCCESS,
});

export const activeSpeakerDetectionFailure = () => ({
  type: ACTIVE_SPEAKER_DETECTION_FAILURE,
});

export const inactiveSpeakerDetectionRequest = (payload) => ({
  type: INACTIVE_SPEAKER_DETECTION_REQUEST,
  payload,
});

export const inactiveSpeakerDetectionSuccess = () => ({
  type: INACTIVE_SPEAKER_DETECTION_SUCCESS,
});

export const inactiveSpeakerDetectionFailure = () => ({
  type: INACTIVE_SPEAKER_DETECTION_FAILURE,
});

export const activeScreenSharingRequest = (payload) => ({
  type: ACTIVE_SCREEN_SHARING_REQUEST,
  payload,
});

export const activeScreenSharingSuccess = () => ({
  type: ACTIVE_SCREEN_SHARING_SUCCESS,
});

export const activeScreenSharingFailure = () => ({
  type: ACTIVE_SCREEN_SHARING_FAILURE,
});

export const inactiveScreenSharingRequest = (payload) => ({
  type: INACTIVE_SCREEN_SHARING_REQUEST,
  payload,
});

export const inactiveScreenSharingSuccess = () => ({
  type: INACTIVE_SCREEN_SHARING_SUCCESS,
});

export const inactiveScreenSharingFailure = () => ({
  type: INACTIVE_SCREEN_SHARING_FAILURE,
});

export const createRoomRequest = (payload) => ({
  type: CREATE_ROOM_REQUEST,
  payload,
});

export const createRoomSuccess = (payload) => ({
  type: CREATE_ROOM_SUCCESS,
  payload,
});

export const createRoomFailure = () => ({
  type: CREATE_ROOM_FAILURE,
});

export const clearJoinRoomState = () => ({
  type: CLEAR_JOIN_ROOM_STATE,
});

export const getRoomListRequest = (payload) => ({
  type: GET_ROOM_LIST_REQUEST,
  payload,
});

export const getRoomListSuccess = (payload) => ({
  type: GET_ROOM_LIST_SUCCESS,
  payload,
});

export const getRoomListFailure = () => ({
  type: GET_ROOM_LIST_FAILURE,
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
        draft.title = action.payload.title;
        break;
      case JOIN_ROOM_FAILURE:
        draft.joinRoomLoading = false;
        draft.joinRoomError = action.payload;
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
          hark: action.payload.hark,
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
      case CHANGE_MAIN_STREAM_REQUEST:
        break;
      case CHANGE_MAIN_STREAM_SUCCESS:
        draft.mainStream.stream = action.payload.stream;
        draft.mainStream.display = action.payload.display;
        break;
      case CHANGE_MAIN_STREAM_FAILURE:
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
      case ACTIVE_AUDIO_REQUEST:
        break;
      case ACTIVE_AUDIO_SUCCESS:
        draft.activeAudio = true;
        break;
      case ACTIVE_AUDIO_FAILURE:
        break;
      case INACTIVE_AUDIO_REQUEST:
        break;
      case INACTIVE_AUDIO_SUCCESS:
        draft.activeAudio = false;
        break;
      case INACTIVE_AUDIO_FAILURE:
        break;
      case ACTIVE_VIDEO_REQUEST:
        break;
      case ACTIVE_VIDEO_SUCCESS:
        draft.activeVideo = true;
        break;
      case ACTIVE_VIDEO_FAILURE:
        break;
      case INACTIVE_VIDEO_REQUEST:
        break;
      case INACTIVE_VIDEO_SUCCESS:
        draft.activeVideo = false;
        break;
      case INACTIVE_VIDEO_FAILURE:
        break;
      case ACTIVE_SPEAKER_DETECTION_REQUEST:
        break;
      case ACTIVE_SPEAKER_DETECTION_SUCCESS:
        draft.activeSpeakerDetection = true;
        break;
      case ACTIVE_SPEAKER_DETECTION_FAILURE:
        break;
      case INACTIVE_SPEAKER_DETECTION_REQUEST:
        break;
      case INACTIVE_SPEAKER_DETECTION_SUCCESS:
        draft.activeSpeakerDetection = false;
        break;
      case INACTIVE_SPEAKER_DETECTION_FAILURE:
        break;
      case ACTIVE_SCREEN_SHARING_REQUEST:
        break;
      case ACTIVE_SCREEN_SHARING_SUCCESS:
        draft.activeScreenSharing = true;
        break;
      case ACTIVE_SCREEN_SHARING_FAILURE:
        break;
      case INACTIVE_SCREEN_SHARING_REQUEST:
        break;
      case INACTIVE_SCREEN_SHARING_SUCCESS:
        draft.activeScreenSharing = false;
        break;
      case INACTIVE_SCREEN_SHARING_FAILURE:
        break;
      case CREATE_ROOM_REQUEST:
        draft.createRoomLoading = true;
        break;
      case CREATE_ROOM_SUCCESS:
        draft.createRoomLoading = false;
        draft.createRoomDone = true;
        // draft.room = acton.payload.room;
        break;
      case CREATE_ROOM_FAILURE:
        draft.createRoomLoading = false;
        break;
      case CLEAR_JOIN_ROOM_STATE:
        draft.joinRoomDone = false;
        draft.joinRoomError = "";
        draft.joinRoomLoading = false;
        break;
      case GET_ROOM_LIST_REQUEST:
        draft.getRoomListLoading = true;
        break;
      case GET_ROOM_LIST_SUCCESS:
        draft.getRoomListDone = true;
        draft.getRoomListLoading = false;
        break;
      case GET_ROOM_LIST_FAILURE:
        draft.getRoomListLoading = false;
        break;
      default:
        break;
    }
  });

export default reducer;
