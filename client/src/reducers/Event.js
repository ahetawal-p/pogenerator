import * as type from '../actions/EventTypes';
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
    case type.EVENT_COUNT_REQUEST:
      return {};
    case type.EVENT_COUNT_SUCCESS:
      return { ...state, eventCount: action.response.eventCount };
    case type.EVENT_COUNT_FAILURE:
      return initialState;
    case type.ALL_EVENTS_REQUEST:
      return { ...state, allEventsLoading: true };
    case type.ALL_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: action.response.allEvents,
        allEventsLoading: false
      };
    case type.ALL_EVENTS_FAILURE:
      return { ...state, allEventsLoading: false };
    case type.EDIT_ADMIN_EVENT:
      return { ...state, editEvent: action.editEvent };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
