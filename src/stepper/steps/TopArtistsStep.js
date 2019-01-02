import React, { Component } from 'react';
import TopArtists from '../../TopArtists'
import Step from '../Step'

class TopArtistsStep extends Component {
  render() {
    const { handleSubmitClick, ...otherProps } = this.props

    return (
      <Step
        component={TopArtists}
        nextActions={handleSubmitClick}
        nextBtnLabel={'Create Playlist'}
        {...otherProps}
      />
    )
  }
}

export default TopArtistsStep