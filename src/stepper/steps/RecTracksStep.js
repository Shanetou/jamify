import React, { Component } from 'react';
import RecTracks from '../../RecTracks'
import Step from '../Step'

class RecTracksStep extends Component {
  render() {
    const { handleAddClick, ...otherProps } = this.props

    return (
      <Step
        component={RecTracks}
        nextActions={handleAddClick}
        nextBtnLabel={'Save to Spotify'}
        {...otherProps}
      />
    )
  }
}

export default RecTracksStep