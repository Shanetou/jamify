import React, { Component, Fragment } from 'react';
import TempoSelector from '../../TempoSelector'
import Step from '../Step'

class TempoSelectorStep extends Component {
  render() {
    // const {  } = this.props

    return (
      <Step
        component={TempoSelector}
        {...this.props}
      />
    )
  }
}

export default TempoSelectorStep