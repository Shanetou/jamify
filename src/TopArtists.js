import React, { Component, Fragment } from 'react';
import { Button, Clearfix, Grid, Row, Col, Image, Well } from 'react-bootstrap';

import { chunk } from './utils'

const UseArtistsAction = (props) => {
  const { selectedArtistIds, onClick } = props
  const isDisabled = selectedArtistIds.length < 1

  return (
    <div>
      <div className='pull-right' style={{ display: 'inline-block' }}>
        <div>
          Selected {selectedArtistIds.length}/5
        </div>
        <Button
          disabled={isDisabled}
          onClick={onClick}
          style={{ display: 'inline-block' }}
        >
          Create Playlist
        </Button>
      </div>
      <Clearfix />
    </div>
  )
}

const ArtistImage = (props) => {
  const { artist } = props
  const images = artist.images

  if (images.length > 0) {
    let src = images[0].url
    if (images[2]) {
      src = images[2].url
    }
    if (images[1]) {
      src = images[1].url
    }

    return (
      <Image
        responsive
        rounded
        className='artist-image'
        src={src}
        alt={artist.name}
      />
    )
  }
}

const ArtistListItem = (props) => {
  const { artist, handleArtistClick, selectedArtistIds } = props
  const isSelected = selectedArtistIds.includes(artist.id)
  const isDisabled = (selectedArtistIds.length >= 5) && !isSelected

  let containerClasses = `artist-image-container ${isSelected ? 'selected' : ''}`
  containerClasses += isDisabled ? 'disabled' : ''

  return (
    <Col sm={3} xs={6} key={artist.name} onClick={handleArtistClick(artist.id)}>
      <div className={containerClasses}>
        <h3 className='text-center'>{artist.name}</h3>
        <ArtistImage artist={artist} />
      </div>
    </Col>
  )
}

const TopArtists = (props) => {
  const { artists, handleArtistClick, selectedArtistIds, handleSubmitClick } = props
  const artistGroups = chunk(artists, 4)

  return (
    <div>
      <Grid>
        <UseArtistsAction selectedArtistIds={selectedArtistIds} onClick={handleSubmitClick} />
        {artistGroups.map((artistGroup, idx) => (
          <Row key={idx} className='artist-images-row'>
            {artistGroup.map(artist => (
              <ArtistListItem artist={artist} key={artist.name} {...props} />
              ))}
          </Row>
        ))}
      </Grid>
    </div>
  )
}

export default TopArtists