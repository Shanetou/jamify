import { BASE_SPOTIFY_URL } from './paths';

export const fetchFromSpotify = (accessToken, urlPart, callback) =>
  fetch(`${BASE_SPOTIFY_URL}${urlPart}`, {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .then(callback);

export const postToSpotify = (accessToken, urlPart, callback, data) =>
  fetch(`${BASE_SPOTIFY_URL}${urlPart}`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .then(callback);

const defaultCallback = () => {};

export const asyncPostToSpotify = async (
  accessToken,
  urlPart,
  callback = defaultCallback,
  data
) => {
  try {
    let result = await fetch(`${BASE_SPOTIFY_URL}${urlPart}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    result = await result.json();

    callback(result);

    return result;
  } catch (error) {
    console.log('ASYNC POST REQUEST ERROR:', error);
  }
};

export const asyncFetchFromSpotify = async (
  accessToken,
  urlPart,
  callback = defaultCallback
) => {
  try {
    let result = await fetch(`${BASE_SPOTIFY_URL}${urlPart}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    result = await result.json();

    callback(result);

    return result;
  } catch (error) {
    console.log('ASYNC FETCH REQUEST ERROR:', error);
  }
};

const buildUrl = urlPart => {
  return `${BASE_SPOTIFY_URL}${urlPart}`;
};

const buildFetchHeader = accessToken => {
  return {
    headers: { Authorization: `Bearer ${accessToken}` }
  };
};

const buildPostHeader = (accessToken, data) => {
  return {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
};

const call = async (url, header, callback) => {
  try {
    let result = await fetch(url, header);
    result = await result.json();

    callback(result);

    return result;
  } catch (error) {
    console.log('ASYNC FETCH REQUEST ERROR:', error);
  }
};

export const get = async (accessToken, urlPart, callback = defaultCallback) => {
  const url = buildUrl(urlPart);
  const header = buildFetchHeader(accessToken);

  const callResult = call(url, header, callback);

  return callResult;
};

export const post = async (
  accessToken,
  urlPart,
  data,
  callback = defaultCallback
) => {
  const url = buildUrl(urlPart);
  const header = buildPostHeader(accessToken, data);

  const callResult = call(url, header, callback);

  return callResult;
};

export default {
  get,
  post
};

// NAMESPACE MODULES LIKE BELOW:

// // headline.js file
// export {Headline, Primary}
// class Headline {}
// class Primary {}

// // In another module...

// import * as Headline from "headline";

// let h = new Headline.Headline();
// let hp = new Headline.Primary();

// Example calls
// fetch: Api.fetch()
// post:  Api.post()

// async function fetchUser({ name, id }) {
//   try {
//     let user = await fetch(`https://api.github.com/users/${name}`);
//     user = await user.json();
//     store.dispatch({ type: 'FETCH_USER_SUCCESS', user, id });
//   } catch (error) {
//     store.dispatch({ type: 'FETCH_USER_ERROR', error, id });
//   }
// }
