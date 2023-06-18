
export const AuthProvider = (params) => {
  const { username, password } = params;
  const oAuthParams = {
    grant_type: "password",
    username,
    password
  };

  const body = Object.keys(oAuthParams).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(oAuthParams[key]);
  }).join('&');

  const request = new Request('https://gitlab.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body
  });

  return fetch(request)
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(( {access_token} ) => {
      localStorage.setItem('token', access_token);
    });

  return Promise.resolve();
};
