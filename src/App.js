import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Grid, Row, Col } from 'react-bootstrap';

import queryString from 'query-string'

import { fetchFromSpotify, postToSpotify } from './fetchFromSpotify'
import { Stepper } from './stepper'
import { RecTracksStep, TempoSelectorStep, TopArtistsStep, PlaylistSavedStep } from './stepper/steps'

import { TARGET_ENERGY, TARGET_DANCEABILITY, TEMPO_OPTIONS } from './constants'
import { selectTempo, selectArtist } from './redux/actions'
import { accessTokenSelector, userSelector } from 'selectors'

import './App.css';

const Login = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <Button
        className="login-button"
        onClick={() => window.location = 'http://localhost:8888/login'}
      >
        LOG IN TO SPOTIFY
      </Button>
    </div>
  )
}

class App extends Component {

  state = {
    topArtists: [],
    recGenres: [],
    recTracks: [],
  }

  selectTempo = (tempo) => () => {
    const { selectTempo } = this.props

    selectTempo(tempo.id)
  }

  fetchTopArtists = () => {
    return fetchFromSpotify(
      this.props.accessToken,
      'me/top/artists?limit=12',
      data => this.setState({ topArtists: data.items })
    )
  }

  fetchRecGenres = () => {
    fetchFromSpotify(
      this.props.accessToken,
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
    const { selectedTempo } = this.props
    const tempo = TEMPO_OPTIONS[selectedTempo]

    return postToSpotify(
      this.props.accessToken,
      `users/${this.props.user.id}/playlists`,
      data => data,
      { name: `Reel Jams: ${tempo.bpm} BPM` },
    )
  }

  addTracksToPlaylist = (playlistId, trackURIs) => {
    postToSpotify(
      this.props.accessToken,
      `playlists/${playlistId}/tracks`,
      data => data,
      { uris: trackURIs },
    )
  }

  fetchRecTracksForArtists = () => {
    const { selectedTempo, selectedArtists } = this.props
    const tempo = TEMPO_OPTIONS[selectedTempo]
    const artistIdList = selectedArtists.join(',')


    const seedParams = queryString.stringify({
      seed_artists: artistIdList,
      target_energy: TARGET_ENERGY,
      target_danceability: TARGET_DANCEABILITY,
      target_tempo: tempo.bpm,
    })

    fetchFromSpotify(
      this.props.accessToken,
      `recommendations?${seedParams}`,
      data => this.setState({ recTracks: data.tracks })
    )
  }

  handleArtistClick = (artistId) => () => {
    const { selectArtist } = this.props

    selectArtist(artistId)
  }

  // componentDidMount = () => {
  //   const accessToken = new URLSearchParams(window.location.search).get('access_token')

  //   const fetchData = () => {
  //     // this.fetchSongFeatures()
  //     this.fetchUser()
  //     this.fetchTopArtists()
  //   }

  //   if (!accessToken) {
  //     return
  //   } else {
  //     this.setState({
  //       accessToken,
  //     }, fetchData)
  //   }
  // }

  render() {
    const { topArtists, recTracks } = this.state
    const { accessToken, selectedTempo, selectedArtists } = this.props

    return (
      <div className='App'>
        <Grid>
          <Row>
            <Col>
              <header className='App-header'>
                <h1>Spotify BPM</h1>
              </header>

              <div className='App-body'>
                {!accessToken ? (
                  <Login />
                ) : (
                  <Stepper>
                    <TempoSelectorStep
                      selectedTempo={selectedTempo}
                      handleTempoClick={this.selectTempo}
                    />
                    <TopArtistsStep
                      artists={topArtists}
                      selectedArtists={selectedArtists}
                      handleArtistClick={this.handleArtistClick}
                      handleSubmitClick={this.fetchRecTracksForArtists}
                    />
                    <RecTracksStep
                      tracks={recTracks}
                      handleAddClick={this.createPlaylistWithTracks}
                    />
                    <PlaylistSavedStep />
                  </Stepper>
                )}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log('state:', state)
  const { tempos, artists, user } = state

  return {
    accessToken: accessTokenSelector(state),
    selectedArtists: artists.selected,
    selectedTempo: tempos.selected,
    user: userSelector(state)
  }
}

const mapDispatchToProps = {
  selectTempo,
  selectArtist,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
