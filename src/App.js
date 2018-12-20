import React, { Component } from 'react';
import { Button, Grid, Row, Col, Image, Well } from 'react-bootstrap';

import queryString from 'query-string'

import { fetchFromSpotify } from './fetchFromSpotify'
import { chunk } from './utils'

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

const TopArtistsList = ({ artists }) => {
  const getImageFor = artist => {
    if (artist.images.length > 0) {
      let src = artist.images[0].url

      if (artist.images[2]) {
        src = artist.images[2].url
      }
      if (artist.images[1]) {
        src = artist.images[1].url
      }

      return <Image className='artist-image' responsive rounded src={src} alt={artist.name} />
    }
  }

  const artistGroups = chunk(artists, 4)
  console.log('artistGroups', artistGroups);

  return (
    <Grid>
      {artistGroups.map((artistGroup, idx) => {
        return (
          <Row key={idx} className='artist-images-row'>
            {
              artistGroup.map(artist => (
                <Col sm={3} key={artist.name}>
                  <div className='artist-image-container'>
                    <h3 className='text-center'>{artist.name}</h3>
                    {getImageFor(artist)}
                  </div>
                </Col>
              ))
            }
          </Row>
        )
      })}
    </Grid>
  )
}

class App extends Component {

  state = {
    user: null,
    // tracks: [],
    topArtists: [],
    accessToken: null,
    recGenres: [],
  }

  // fetchSpotify = () => {
  //   console.log('fetchSpotify');
  //   const res = fetchFromSpotify(this.state.accessToken)
  //   console.log('res', res);
  //   return res
  // }

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
    const { accessToken, topArtists } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <div>
            <h1>Spotify BPM</h1>
          </div>
        </header>

        <div className="App-body">
          {!accessToken && (
            <Login />
          )}

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
        </div>

        {topArtists.length > 0 && (
          <TopArtistsList artists={topArtists} />
        )}

      </div>
    );
  }
}

export default App;
