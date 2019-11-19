import { logout } from '../actions/UserAction';
import { error as alertError } from '../actions/AlertAction';

export default ({ dispatch, getState }) => next => action => {
  const { callAPI } = action;
  if (typeof action.callAPI === 'undefined') {
    return next(action);
  }

  const [requestType, successType, errorType] = action.types;
  next({
    type: requestType
  });

  return callAPI.then(
    response => {
      next({
        response,
        type: successType
      });
      return Promise.resolve(getState());
    },
    error => {
      if (error.message === 'unauthorized') {
        dispatch(logout());
      }

      next({
        error: error.message || 'Unknown API call error',
        type: errorType
      });
      dispatch(alertError(error.toString()));
      return Promise.reject(error);
    }
  );
};
