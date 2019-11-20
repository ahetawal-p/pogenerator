import handleResponse, { objToQueryString } from '../utils/ServiceUtil';
import { authHeader } from '../helpers';

export function createPO(poEntry) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(poEntry)
  };

  return fetch('/po', requestOptions).then(handleResponse);
}

export function getAllPos(paginateParams) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  const queryString = objToQueryString(paginateParams);
  return fetch(`/po${queryString}`, requestOptions).then(handleResponse);
}
