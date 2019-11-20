import * as type from '../actions/POTypes';
import { LOGOUT } from '../actions/UserActionTypes';

const initialState = {
  eventCount: 0,
  creatingEvent: false,
  allEvents: {},
  allEventsLoading: false,
  editEvent: undefined
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case type.CREATE_UPDATE_REQUEST:
      return { ...state, creatingEvent: true };
    case type.CREATE_UPDATE_SUCCESS:
      return {
        ...state,
        creatingEvent: false,
        eventCount: action.response.eventCount,
        editEvent: undefined
      };
    case type.CREATE_UPDATE_FAILURE:
      return {};
    case type.ALL_POS_REQUEST:
      return { ...state, allEventsLoading: true };
    case type.ALL_POS_SUCCESS:
      return {
        ...state,
        allEvents: action.response.allEvents,
        allEventsLoading: false
      };
    case type.ALL_POS_FAILURE:
      return { ...state, allEventsLoading: false };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
