/* eslint-disable no-underscore-dangle */
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
        if (values.poNumber) {
          dispatch(alertActions.info('PO upated !!'));
        } else {
          dispatch(alertActions.success('PO created successfully !'));
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
