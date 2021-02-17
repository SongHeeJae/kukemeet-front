import produce from "immer";

export const initialState = {
  janus: null,
  sfu: null,
  opaqueId: null,
  feeds: [],
  activeVideo: true,
  activeAudio: true,
  activeSpeakerDetection: false,
  activeScreenSharing: false,
  chatData: [],
  connectJanusLoading: false,
  coonectJanusDone: false,
};

export const CONNECT_JANUS_REQUEST = "CONNECT_JANUS_REQUEST";
export const CONNECT_JANUS_SUCCESS = "CONNECT_JANUS_SUCCESS";
export const CONNECT_JANUS_FAILURE = "CONNECT_JANUS_FAILURE";

export const CONNECT_FEED_REQUEST = "CONNECT_FEED_REQUEST";
export const CONNECT_FEED_SUCCESS = "CONNECT_FEED_SUCCESS";
export const CONNECT_FEED_FAILURE = "CONNECT_FEED_FAILURE";

export const connectJanus = (dispatch) => ({
  type: CONNECT_JANUS_REQUEST,
  payload: dispatch,
});

export const connectFeed = () => ({
  type: CONNECT_FEED_REQUEST,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONNECT_JANUS_REQUEST:
        draft.connectJanusLoading = true;
        break;
      case CONNECT_JANUS_SUCCESS:
        console.log("성공요청");
        draft.connectJanusLoading = false;
        draft.connectJanusDone = true;
        draft.janus = action.payload.janus;
        draft.sfu = action.payload.sfu;
        draft.opaqueId = action.payload.opaqueId;
        break;
      case CONNECT_JANUS_FAILURE:
        draft.connectJanusLoading = false;
        break;

      case CONNECT_FEED_REQUEST:
        break;
      default:
        break;
    }
  });

export default reducer;
