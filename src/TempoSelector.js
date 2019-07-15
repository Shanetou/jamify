import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";

import { selectTempo } from "redux/actions";
import { selectedTempoSelector } from "selectors";
import { TEMPO_OPTIONS } from "./constants";

export class TempoSelector extends Component {
  render() {
    const { selectTempo, selectedTempo } = this.props;

    const tempos = Object.values(TEMPO_OPTIONS);
    const isSelected = bpm => bpm === TEMPO_OPTIONS[selectedTempo].bpm;

    return (
      <div className="text-center">
        <h3 style={{ marginBottom: "5rem" }}>
          Choose your desired guard experience.
        </h3>
        <ButtonGroup bsSize="large">
          {tempos.map(tempo => (
            <Button
              key={tempo.bpm}
              active={isSelected(tempo.bpm)}
              onClick={() => selectTempo(tempo.id)}
            >
              {tempo.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    selectedTempo: selectedTempoSelector(state)
  };
};

const mapDispatchToProps = {
  selectTempo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TempoSelector);
