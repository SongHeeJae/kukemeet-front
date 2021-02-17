import produce from "immer";

export const initialState = {
  janus: null,
  sfu: null,
  opaqueId: null,
  privateId: null,
  feeds: [],
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

export const CONNECT_FEED_REQUEST = "CONNECT_FEED_REQUEST";
export const CONNECT_FEED_SUCCESS = "CONNECT_FEED_SUCCESS";
export const CONNECT_FEED_FAILURE = "CONNECT_FEED_FAILURE";

export const connectJanus = (payload) => ({
  type: CONNECT_JANUS_REQUEST,
  payload,
});

export const joinRoom = (payload) => ({
  type: JOIN_ROOM_REQUEST,
  payload,
});

export const connectFeed = (payload) => ({
  type: CONNECT_FEED_REQUEST,
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
        draft.janus = action.payload.janus;
        draft.sfu = action.payload.sfu;
        draft.opaqueId = action.payload.opaqueId;
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
        break;
      case JOIN_ROOM_FAILURE:
        draft.joinRoomLoading = false;
        break;
      case CONNECT_FEED_REQUEST:
        break;
      case CONNECT_FEED_SUCCESS:
        break;
      case CONNECT_JANUS_FAILURE:
        break;
      default:
        break;
    }
  });

export default reducer;
