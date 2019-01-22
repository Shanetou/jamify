import React, { Component } from 'react'

import { Button, ButtonGroup } from 'react-bootstrap';
import { TEMPO_OPTIONS } from './constants'

export default class TempoSelector extends Component {
  render() {
    const { selectedTempo, handleTempoClick } = this.props
    console.log('selectedTempo:', selectedTempo)
    const tempos = Object.values(TEMPO_OPTIONS)
    const isSelected = (bpm) => bpm === TEMPO_OPTIONS[selectedTempo].bpm

    return (
      <div className='text-center'>
        <h3 style={{ marginBottom: '5rem' }}>
          Choose your desired guard experience.
        </h3>
        <ButtonGroup bsSize='large'>
          {tempos.map((tempo) => (
            <Button
              key={tempo.bpm}
              active={isSelected(tempo.bpm)}
              onClick={handleTempoClick(tempo)}
            >
              {tempo.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    )
  }
}
