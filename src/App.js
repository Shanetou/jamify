import React, { Component, Fragment } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';

import queryString from 'query-string'

import { fetchFromSpotify, postToSpotify } from './fetchFromSpotify'
import TopArtists from './TopArtists'
import TempoSelector from './TempoSelector'
import RecTracks from './RecTracks'

import { Step, Stepper } from './stepper'

import { TARGET_ENERGY, TARGET_DANCEABILITY, TEMPO_OPTIONS } from './constants'

import './App.css';

const Login = (props) => {
  return (
    <Button
      // disabled
      className="login-button"
      onClick={() => window.location = 'http://localhost:8888/login'}
    >
      LOG IN TO SPOTIFY
    </Button>
  )
}

class App extends Component {

  state = {
    user: null,
    topArtists: [],
    accessToken: null,
    recGenres: [],
    recTracks: [],
    selectedArtistIds: [],
    selectedTempo: TEMPO_OPTIONS[3],
  }

  selectTempo = (tempo) => () => {
    this.setState({
      selectedTempo: tempo,
    })
  }

  fetchTopArtists = () => {
    return fetchFromSpotify(
      this.state.accessToken,
      'me/top/artists?limit=12',
      data => this.setState({ topArtists: data.items })
    )
  }

  fetchUser = () => {
    fetchFromSpotify(
      this.state.accessToken,
      'me',
      data => this.setState({ user: data })
    )
  }

  fetchRecGenres = () => {
    fetchFromSpotify(
      this.state.accessToken,
      'recommendations/available-genre-seeds',
      data => this.setState({ recGenres: data.genres })
    )
  }

  createPlaylistWithTracks = () => {
    this.createPlaylist().then((playlist) => {
      const trackURIs = this.state.recTracks.map(t => t.uri)

      this.addTracksToPlaylist(playlist.id, trackURIs)
    })
  }

  createPlaylist = () => {
    return postToSpotify(
      this.state.accessToken,
      `users/${this.state.user.id}/playlists`,
      data => data,
      { name: `${this.state.selectedTempo.bpm} BPM` },
    )
  }

  addTracksToPlaylist = (playlistId, trackURIs) => {
    postToSpotify(
      this.state.accessToken,
      `playlists/${playlistId}/tracks`,
      data => data,
      { uris: trackURIs },
    )
  }

  fetchRecTracksForArtists = () => {
    const artistIdList = this.state.selectedArtistIds.join(',')
    const tempo = this.state.selectedTempo.bpm

    const seedParams = queryString.stringify({
      seed_artists: artistIdList,
      target_energy: TARGET_ENERGY,
      target_danceability: TARGET_DANCEABILITY,
      target_tempo: tempo,
    })

    fetchFromSpotify(
      this.state.accessToken,
      `recommendations?${seedParams}`,
      data => this.setState({ recTracks: data.tracks })
    )
  }

  handleArtistClick = (artistId) => () => {
    this.setState((prevState, props) => {
      const selected = prevState.selectedArtistIds
      const selectedIdx = selected.indexOf(artistId)

      if (selectedIdx > -1) {
        return ({
          selectedArtistIds: selected.filter((_, i) => i !== selectedIdx),
        })
      }

      if (selected.length < 5){
        return ({
          selectedArtistIds: [...selected, artistId],
        })
      }
    })
  }

  // fetchSongFeatures = () => {
  //   fetchFromSpotify(
  //     this.state.accessToken,
  //     `audio-features/6igEXTKqOFuOEJDIAEUU9F`,
  //     // data => this.setState({ user: data })
  //     () => {}
  //   )
  // }

  componentDidMount = () => {
    const accessToken = new URLSearchParams(window.location.search).get('access_token')

    const fetchData = () => {
      // this.fetchSongFeatures()
      this.fetchUser()
      this.fetchTopArtists()
    }

    if (!accessToken) {
      return
    } else {
      this.setState({
        accessToken,
      }, fetchData)
    }
  }

  render() {
    console.log('this.state', this.state);
    const {
      accessToken, topArtists, selectedArtistIds,
      recTracks, selectedTempo
    } = this.state

    return (
      <div className="App">
        <Grid>
          <Row>
            <Col>
              <header className="App-header">
                <h1>Spotify BPM</h1>
              </header>

              <div className="App-body">
                {!accessToken && (
                  <Login />
                )}
              </div>

              <Stepper>
                <Step
                  component={TempoSelector}
                  selectedTempo={selectedTempo}
                  handleTempoClick={this.selectTempo}
                />
                <Step
                  component={TopArtists}
                  artists={topArtists}
                  selectedArtistIds={selectedArtistIds}
                  handleArtistClick={this.handleArtistClick}
                  handleSubmitClick={this.fetchRecTracksForArtists}
                />
                <Step
                  component={RecTracks}
                  tracks={recTracks}
                  handleAddClick={this.createPlaylistWithTracks}
                />
              </Stepper>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
