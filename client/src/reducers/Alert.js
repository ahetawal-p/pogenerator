import * as alertTypes from '../actions/AlertTypes';

export default function alert(state = {}, action) {
  switch (action.type) {
    case alertTypes.SUCCESS:
      return { type: 'alert-success', message: action.message };
    case alertTypes.ERROR:
      return { type: 'alert-danger', message: action.message };
    case alertTypes.INFO:
      return { type: 'alert-info', message: action.message };
    case alertTypes.CLEAR:
      return {};
    default:
      return state;
  }
}
