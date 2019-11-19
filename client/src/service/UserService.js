import handleResponse from '../utils/ServiceUtil';

export function logout() {
  localStorage.removeItem('user');
}

export function login(values) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  };

  return fetch('/user/login', requestOptions)
    .then(handleResponse)
    .then(response => {
      // login successful if there's a jwt token in the response
      if (response.user && response.user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      return response;
    });
}

export function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch('/user/register', requestOptions).then(handleResponse);
}
