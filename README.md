# Jamify

*Use Spotify recommendations to create your perfect playlist.*

An app built with react, redux, redux-saga, and material-ui, leveraging the Spotify API. 

### Features
- Log in to your Spotify account to create your own playlists with Spotify recommendations
- Get recommended tracks by selecting among from your favorite artists, searching for any artist or genre, and modifying song attributes (energy, popularity, danceability, etc)
- Mouseover recommended tracks to hear 30-second previews
- Add your new playlist to your Spotify with the click of a button

### Try it now at:
https://jamifynow.herokuapp.com/

### To run locally: 
1. Clone this repo
2. Add these environment variables: `NODE_PATH=src` and `REACT_APP_AUTH_URI=http://localhost:8888/login`
3. Run `yarn install && yarn start`
4. Set up [the backend auth server](https://github.com/Shanetou/jamify-backend)

---

Improvements:

- [ ] Rename generated playlist names
- [ ] Remove avatar from genre chips
- [ ] Add BPM attribute (capture three std deviations from the avg BPM but bias higher)
- [ ] Use native accelerometer to capture real-time steps / minute to translate to BPM attribute 
