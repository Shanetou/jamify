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
