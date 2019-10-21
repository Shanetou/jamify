import { BASE_SPOTIFY_URL } from "./paths";

const defaultCallback = () => {};

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
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
};

const call = async (url, header, callback) => {
  const result = await fetch(url, header);
  const json = await result.json();

  callback(result);

  if (json.error) {
    throw json;
  }

  return json;
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
