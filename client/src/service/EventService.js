import handleResponse, { objToQueryString } from '../utils/ServiceUtil';
import { authHeader } from '../helpers';

export function createEvent(event) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  };

  return fetch('/event', requestOptions).then(handleResponse);
}

export function getEventCount() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch('/event/count', requestOptions).then(handleResponse);
}

export function getAllEvents(paginateParams) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  const queryString = objToQueryString(paginateParams);
  return fetch(`/event${queryString}`, requestOptions).then(handleResponse);
}

export function updateEvent(event) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  };

  return fetch('/event/:id', requestOptions).then(handleResponse);
}
