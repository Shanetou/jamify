import React, { Component, Fragment } from 'react';
import TopArtists from '../../TopArtists'
import Step from '../Step'

class TopArtistsStep extends Component {
  render() {
    // const {  } = this.props

    return (
      <Step
        component={TopArtists}
        nextActions={() => console.log('NEXT: Do this and that')}
        prevActions={() => console.log('PREVIOUS: Do this and that')}
        {...this.props}
      />
    )
  }
}

export default TopArtistsStep