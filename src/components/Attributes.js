import React, { Component } from 'react';
import Slider from '@material-ui/lab/Slider';
import { TRACK_ATTRIBUTES_RANGES } from '../constants';
import Typography from '@material-ui/core/Typography';

class SliderField extends React.Component {
  constructor(props) {
    super(props);

    this.range = props.attribute[1];
    this.state = {
      value: (this.range[0] + this.range[1]) / 2,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { attribute } = this.props;
    const [name, range] = attribute;
    const [min, max] = range;
    const { value } = this.state;

    return (
      <div>
        <Typography id='label'>{name}</Typography>
        <Slider
          min={min}
          max={max}
          value={value}
          aria-labelledby='label'
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

class Attributes extends Component {
  constructor(props) {
    super(props);

    this.state = { counter: 0 };
    this.attributes = Object.entries(TRACK_ATTRIBUTES_RANGES);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <h3>Select Attributes</h3>
        {this.attributes.map(attribute => {
          const [name, _] = attribute;
          return <SliderField key={name} attribute={attribute} />;
        })}
      </div>
    );
  }
}

export default Attributes;
