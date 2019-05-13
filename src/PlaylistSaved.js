import React, { Component } from 'react'

import { Button, Glyphicon } from 'react-bootstrap';

export default class PlaylistSaved extends Component {
  render() {

    return (
      <div className='text-center'>
        <h1 style={{ marginBottom: '5rem' }}>
          <Glyphicon glyph='ok' />{' '}
          Playlist Saved!
        </h1>
        
        <Button onClick={() => window.location.reload()}>
          Create Another
        </Button>
      </div>
    )
  }
}
