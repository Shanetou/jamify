import React, { Component } from 'react'

import { Button, ButtonGroup } from 'react-bootstrap';
import { TEMPO_OPTIONS } from './constants'

export default class TempoSelector extends Component {
  render() {
    const { selectedTempo, handleTempoClick } = this.props
    const tempos = Object.values(TEMPO_OPTIONS)

    const isSelected = (bpm) => bpm === selectedTempo.bpm

    return (
      <div className='text-center'>
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
