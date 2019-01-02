import React, { Component, Fragment } from 'react';
import PlaylistSaved from '../../PlaylistSaved'
import Step from '../Step'

class PlaylistSavedStep extends Component {
  render() {
    return (
      <Step
        component={PlaylistSaved}
        {...this.props}
      />
    )
  }
}

export default PlaylistSavedStep
