import React, { Component } from 'react';
import { Button, Clearfix, Grid, Row, Col } from 'react-bootstrap';

class Step extends Component {
  render() {
    const {
      isActive,
      displayPrevious,
      displayNext,
      displaySubmit,
      component,
      children,
      ...rest
    } = this.props;
    console.log('component', component);
    console.log('this.props', this.props);

    if (isActive === false) {
      return <div />
    }

    return (
      <div>
        <div style={{ margin: '4rem 0' }}>
          <Previous
            isActive={displayPrevious}
            goToPreviousStep={() => this.props.goToPreviousStep()}
          />
          <Next
            isActive={displayNext}
            goToNextStep={() => this.props.goToNextStep()}
          />
          <Clearfix />
          <Submit isActive={displaySubmit} />
        </div>

        {component ? React.createElement(component, this.props) : children}
      </div>
    );
  }
}

class Previous extends React.Component {

  render() {
    const { isActive } = this.props;
    console.log('isActive', isActive);
    if (isActive === false) return null;

    return (
      <Button onClick={() => this.props.goToPreviousStep()}>
        Previous
      </Button>
    );
  }
}

class Next extends React.Component {

  render() {
    const { isActive } = this.props;
    console.log('isActive', isActive);
    if (isActive === false) return null;

    return (
      <Button className='pull-right' onClick={() => this.props.goToNextStep()}>
        Next
      </Button>
    );
  }
}

class Submit extends React.Component {

  render() {
    const { isActive } = this.props;
    if (isActive === false) return null;

    return (
      <Button type="submit">
        Submit
      </Button>
    );

  }
}

export default Step