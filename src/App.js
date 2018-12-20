import React, { Component, Fragment } from 'react';
import { Button, Grid, Row, Col, Image, Well } from 'react-bootstrap';

import queryString from 'query-string'

import { fetchFromSpotify } from './fetchFromSpotify'
import { chunk } from './utils'
import TopArtists from './TopArtists'

import './App.css';
console.log('Col', Col);

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
    selectedArtists: [],
  }

  fetchTopArtists = () => {
    return fetchFromSpotify(
      this.state.accessToken,
      'me/top/artists',
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

  handleArtistClick = (artistId) => () => {
    this.setState((prevState, props) => {
      const selected = prevState.selectedArtists
      const selectedIdx = selected.indexOf(artistId)

      if (selectedIdx > -1) {
        console.log('selectedIdx', selectedIdx);
        return ({
          selectedArtists: selected.filter((_, i) => i !== selectedIdx),
        })
      }

      if (selected.length < 5){
        return ({
          selectedArtists: [...selected, artistId],
        })
      }
    })
  }

  componentDidMount = () => {
    const accessToken = new URLSearchParams(window.location.search).get('access_token')

    if (!accessToken) {
      return
    } else {
      this.setState({
        accessToken,
      })
    }
  }

  render() {
    console.log('this.state', this.state);
    const { accessToken, topArtists, selectedArtists } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <div>
            <h1>Spotify BPM</h1>
          </div>
        </header>

        <div className="App-body">
          {!accessToken ? (
            <Login />
          ) : (
            <Fragment>
              <div>
                <Button onClick={this.fetchTopArtists}>
                  GET TOP ARTISTS
                </Button>
              </div>
              <div>
                <Button onClick={this.fetchUser}>
                  GET USER
                </Button>
              </div>
              <div>
                <Button onClick={this.fetchRecGenres}>
                  GET REC GENRES
                </Button>
              </div>
            </Fragment>
          )}
        </div>

        {topArtists.length > 0 && (
          <TopArtists 
            artists={topArtists} 
            selectedArtists={selectedArtists}
            handleArtistClick={this.handleArtistClick}
          />
        )}

      </div>
    );
  }
}

export default App;
