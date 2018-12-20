export const fetchFromSpotify = (accessToken, urlPart, callback) => {
  fetch(`https://api.spotify.com/v1/${urlPart}`, {
    headers: {'Authorization': 'Bearer ' + accessToken}
  })
    .then(response => response.json())
    .then(response => {
      console.log(`${urlPart} response`, response);
      return response
    })
    .then(callback)
}