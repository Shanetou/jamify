export const fetchFromSpotify = (accessToken, urlPart, callback) => (
  fetch(`https://api.spotify.com/v1/${urlPart}`, {
    headers: {'Authorization': 'Bearer ' + accessToken}
  })
    .then(response => response.json())
    .then(response => {
      console.log(`${urlPart} response`, response);
      return response
    })
    .then(callback)
)

export const postToSpotify = (accessToken, urlPart, callback, data) => (
  fetch(`https://api.spotify.com/v1/${urlPart}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(response => {
      console.log(`${urlPart} response`, response);
      return response
    })
    .then(callback)
)

const defaultCallback = () => {}

export const asyncPostToSpotify = async (
  accessToken, 
  urlPart, 
  callback = defaultCallback,
  data,
) => {
  try {
    let result = await fetch(`https://api.spotify.com/v1/${urlPart}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    result = await result.json()
    console.log(`POST ${urlPart} result`, result);    
    
    callback(result)

    return result
  } catch (error) {
    console.log('ASYNC POST REQUEST ERROR:', error)
  }
}

export const asyncFetchFromSpotify = async (
  accessToken, 
  urlPart, 
  callback = defaultCallback
) => {
  try {
    let result = await fetch(`https://api.spotify.com/v1/${urlPart}`, { 
      headers: { 'Authorization': `Bearer ${accessToken}` } 
    })
    result = await result.json()
    console.log(`FETCH ${urlPart} result`, result);    
    
    callback(result)

    return result
  } catch (error) {
    console.log('ASYNC FETCH REQUEST ERROR:', error)
  }
}

const buildUrl = (urlPart) => {
  console.log('urlPart buildUrl:', urlPart)
  return `https://api.spotify.com/v1/${urlPart}`
}

const buildFetchHeader = (accessToken) => {
  return {
    headers: { 'Authorization': `Bearer ${accessToken}` } 
  }
}

const buildPostHeader = (accessToken, data) => {
  console.log('data:', data)
  console.log('JSON.stringify(data):', JSON.stringify(data))
  return {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
}

const call = async (url, header, callback) => {
  console.log('call url:', url)
  console.log('call header:', header)
  console.log('call callback:', callback)
  try {
    let result = await fetch(url, header)
    result = await result.json()
    console.log(`FETCH in _call result`, result);    
    
    callback(result)

    return result
  } catch (error) {
    console.log('ASYNC FETCH REQUEST ERROR:', error)
  }
}

export const get = async (
  accessToken, 
  urlPart, 
  callback = defaultCallback
) => {
  console.log('inside get:', urlPart)
  console.log('Api.buildUrl:', buildUrl)
  const url = buildUrl(urlPart)
  console.log('url:', url)
  const header = buildFetchHeader(accessToken)

  console.log('callback:', callback)
  const callResult = call(url, header, callback)
  console.log('callResult:', callResult)

  return callResult
}

export const post = async (
  accessToken, 
  urlPart, 
  data,
  callback = defaultCallback,
) => {
  console.log('inside post:', urlPart)
  console.log('Api.buildUrl:', buildUrl)
  const url = buildUrl(urlPart)
  console.log('url:', url)
  const header = buildPostHeader(accessToken, data)

  const callResult = call(url, header, callback)
  console.log('callResult:', callResult)

  return callResult
}

export default {
  get,
  post,
}

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
