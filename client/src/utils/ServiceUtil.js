function parseResponse(text) {
  let data = text;
  if (data) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      // console.error(e);
    }
  }
  return data;
}

export default function handleResponse(response) {
  return response.text().then(text => {
    const data = parseResponse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        return Promise.reject(new Error('unauthorized'));
      }

      const error =
        (data && data.error && data.error.message) ||
        response.statusText ||
        data;
      return Promise.reject(new Error(error));
    }

    return data;
  });
}

export function objToQueryString(obj) {
  if (!obj) {
    return '';
  }
  const keyValuePairs = [];
  Object.keys(obj).forEach(key => {
    keyValuePairs.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
    );
  });
  return `?${keyValuePairs.join('&')}`;
}
