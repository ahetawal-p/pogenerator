import * as type from '../actions/UserActionTypes';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case type.LOGIN_REQUEST:
      return { loggingIn: true };
    case type.LOGIN_SUCCESS:
      return { loggedIn: true, user: action.response.user };
    case type.LOGIN_FAILURE:
      return { loggedIn: false };
    case type.LOGOUT:
      return {};
    case type.REGISTER_REQUEST:
      return { registering: true };
    case type.REGISTER_SUCCESS:
      return { registering: false };
    case type.REGISTER_FAILURE:
      return { registering: false };
    default:
      return state;
  }
}
