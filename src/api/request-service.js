const API_URL = `http://localhost:3000/`;

const request = (url, options) => {
  return fetch(`${API_URL}${url}`, options)
    .then(response => {
      if (!response.ok) {
        // eslint-disable-next-line no-throw-literal
        throw `${response.status} - ${response.statusText}`;
      }
      // console.log(`${API_URL}${url}`, response);
      return response.json();
    })
    .catch(error => console.log(error));
};

/**
 * Get data from server
 * @param url
 * @returns {Promise<() => Promise<any>>}
 */
const get = (url) => request(url);

const post = (url, data) => {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(data),
  });
};

const patch = (url, data) => {
  return request(url, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(data),
  });
};

const remove = (url) => request(url, {method: 'DELETE'});

const removeForFew = async (url) => await fetch(`${API_URL}${url}`, {method: 'DELETE'});

export {get, post, patch, remove, removeForFew};
