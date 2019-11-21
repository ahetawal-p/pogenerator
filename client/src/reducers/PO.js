import * as type from '../actions/POTypes';
import { LOGOUT } from '../actions/UserActionTypes';

const initialState = {
  allPOs: {},
  allPOsLoading: true,
  creatingPO: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case type.CREATE_UPDATE_REQUEST:
      return { ...state, creatingPO: true };
    case type.CREATE_UPDATE_SUCCESS:
      return {
        ...state,
        creatingPO: false,
        allPOs: action.response.allPOs
      };
    case type.CREATE_UPDATE_FAILURE:
      return {};
    case type.ALL_POS_REQUEST:
      return { ...state, allPOsLoading: true };
    case type.ALL_POS_SUCCESS:
      return {
        ...state,
        allPOs: action.response.allPOs,
        allPOsLoading: false
      };
    case type.ALL_POS_FAILURE:
      return { ...state, allPOsLoading: false };
    case type.DELETE_PO_SUCCESS:
      return {
        ...state,
        allPOs: action.response.allPOs
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
