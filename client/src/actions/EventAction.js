/* eslint-disable no-underscore-dangle */
import { reset } from 'redux-form';
import * as types from './EventTypes';
import * as eventService from '../service/EventService';
import * as alertActions from './AlertAction';
import { history } from '../helpers';

export function createEvent(values) {
  return dispatch => {
    dispatch({
      types: [
        types.CREATE_UPDATE_REQUEST,
        types.CREATE_UPDATE_SUCCESS,
        types.CREATE_UPDATE_FAILURE
      ],
      callAPI: eventService.createEvent(values)
    })
      .then(() => {
        history.push('/');
        dispatch(reset('event'));
        if (values._id) {
          dispatch(alertActions.info('Event upated !!'));
        } else {
          dispatch(alertActions.success('Event created successfully !'));
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export function getEventCount() {
  return dispatch => {
    dispatch({
      types: [
        types.EVENT_COUNT_REQUEST,
        types.EVENT_COUNT_SUCCESS,
        types.EVENT_COUNT_FAILURE
      ],
      callAPI: eventService.getEventCount()
    }).catch(error => {
      console.error(error);
    });
  };
}

export function getAllEvents(params) {
  return dispatch => {
    dispatch({
      types: [
        types.ALL_EVENTS_REQUEST,
        types.ALL_EVENTS_SUCCESS,
        types.ALL_EVENTS_FAILURE
      ],
      callAPI: eventService.getAllEvents(params)
    }).catch(error => {
      console.error(error);
    });
  };
}

export function adminEditEvent(editEvent) {
  return dispatch => {
    dispatch({ type: types.EDIT_ADMIN_EVENT, editEvent });
    history.push('/');
  };
}

export function updateEvent(values) {
  return dispatch => {
    dispatch({ type: types.CREATE_UPDATE_REQUEST });
    eventService.updateEvent(values).then(
      event => {
        dispatch({ type: types.CREATE_UPDATE_SUCCESS, event });
        history.push('/');
      },
      error => {
        dispatch({ type: types.CREATE_UPDATE_FAILURE, error });
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}
