import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import queryString from 'query-string'

import { TARGET_ENERGY, TARGET_DANCEABILITY, TEMPO_OPTIONS } from './constants'
import { selectArtist } from 'redux/actions'
import { selectedArtistsSelector, accessTokenSelector, userSelector, selectedTempoSelector } from 'selectors'

import { fetchFromSpotify, postToSpotify } from 'api/fetchFromSpotify'
import { Stepper } from './stepper'
import { RecTracksStep, TempoSelectorStep, TopArtistsStep, PlaylistSavedStep } from './stepper/steps'
import { Login } from './Login';
import './App.css';

// this.fetchSongFeatures()

class App extends Component {
  state = {
    recGenres: [],
    recTracks: [],
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

  // handleArtistClick = (artistId) => () => {
  //   const { selectArtist } = this.props

  //   selectArtist(artistId)
  // }

  render() {
    const { recTracks } = this.state
    const { accessToken, selectedArtists } = this.props

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
                    <TempoSelectorStep />
                    <TopArtistsStep
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

  return {
    accessToken: accessTokenSelector(state),
    selectedArtists: selectedArtistsSelector(state),
    selectedTempo: selectedTempoSelector(state),
    user: userSelector(state)
  }
}

const mapDispatchToProps = {
  selectArtist,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
