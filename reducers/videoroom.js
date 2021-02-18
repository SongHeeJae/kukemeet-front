import produce from "immer";

export const initialState = {
  room: -1,
  myFeed: {},
  remoteFeeds: [],
  activeVideo: true,
  activeAudio: true,
  activeSpeakerDetection: false,
  activeScreenSharing: false,
  chatData: [],
  connectJanusLoading: false,
  connectJanusDone: false,
  joinRoomLoading: false,
  joinRoomDone: false,
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
      default:
        break;
    }
  });

export default reducer;
