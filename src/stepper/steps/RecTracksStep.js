import React, { Component, Fragment } from 'react';
import RecTracks from '../../RecTracks'
import Step from '../Step'

class RecTracksStep extends Component {
  render() {
    // const {  } = this.props

    return (
      <Step
        component={RecTracks}
        {...this.props}
      />
    )
  }
}

export default RecTracksStep