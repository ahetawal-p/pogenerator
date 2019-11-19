import * as types from './UserActionTypes';
import * as userService from '../service/UserService';
import * as alertActions from './AlertAction';
import * as eventActions from './EventAction';

import { history } from '../helpers';

export function login(values) {
  return dispatch => {
    dispatch({
      types: [types.LOGIN_REQUEST, types.LOGIN_SUCCESS, types.LOGIN_FAILURE],
      callAPI: userService.login(values)
    })
      .then(() => {
        history.push('/');
        dispatch(eventActions.getEventCount());
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function logout() {
  return dispatch => {
    userService.logout();
    history.push('/');
    dispatch({ type: types.LOGOUT });
  };
}

export function register(values) {
  return dispatch => {
    dispatch({
      types: [
        types.REGISTER_REQUEST,
        types.REGISTER_SUCCESS,
        types.REGISTER_FAILURE
      ],
      callAPI: userService.register(values)
    })
      .then(() => {
        history.push('/login');
        dispatch(alertActions.success('Registration successful'));
      })
      .catch(error => {
        console.error(error);
      });
  };
}
