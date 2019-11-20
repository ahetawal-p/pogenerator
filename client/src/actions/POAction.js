/* eslint-disable no-underscore-dangle */
import { reset } from 'redux-form';
import * as types from './POTypes';
import * as poService from '../service/POService';
import * as alertActions from './AlertAction';
import { history } from '../helpers';

export function createPO(values) {
  return dispatch => {
    dispatch({
      types: [
        types.CREATE_UPDATE_REQUEST,
        types.CREATE_UPDATE_SUCCESS,
        types.CREATE_UPDATE_FAILURE
      ],
      callAPI: poService.createPO(values)
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

export function getAllPOs(params) {
  return dispatch => {
    dispatch({
      types: [
        types.ALL_POS_REQUEST,
        types.ALL_POS_SUCCESS,
        types.ALL_POS_FAILURE
      ],
      callAPI: poService.getAllPos(params)
    }).catch(error => {
      console.error(error);
    });
  };
}
