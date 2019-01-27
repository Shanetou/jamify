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

export const asyncFetchFromSpotify = async (accessToken, urlPart, callback = defaultCallback) => {
  console.log('accessToken:', accessToken)
  console.log('urlPart:', urlPart)
  console.log('callback:', callback)
  try {
    const header = { headers: {'Authorization': 'Bearer ' + accessToken } }
    
    let result = await fetch(
      `https://api.spotify.com/v1/${urlPart}`, 
      header
    ).then(res => res.json())
    console.log(`${urlPart} result`, result);
    
    callback(result)

    return result

  } catch (error) {
    console.log('ASYNC FETCH REQUEST ERROR:', error)
  }
}


// async function fetchUser({ name, id }) {
//   try {
//     let user = await fetch(`https://api.github.com/users/${name}`);
//     user = await user.json();
//     store.dispatch({ type: 'FETCH_USER_SUCCESS', user, id });
//   } catch (error) {
//     store.dispatch({ type: 'FETCH_USER_ERROR', error, id });
//   }
// }