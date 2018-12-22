import React, { Component } from 'react';
import { Button, Clearfix, Grid, Row, Col } from 'react-bootstrap';

class Step extends Component {

  handleNextClick = () => {
    const { goToNextStep, nextActions } = this.props

    if (nextActions) {
      nextActions()
    }

    goToNextStep()
  }

  handlePrevClick = () => {
    const { goToPreviousStep, prevActions } = this.props

    if (prevActions) {
      prevActions()
    }

    goToPreviousStep()
  }

  render() {
    const {
      isActive,
      displayPrevious,
      displayNext,
      displaySubmit,

      goToPreviousStep,
      goToNextStep,

      component,
      children,

      prevBtnLabel,
      nextBtnLabel,
      ...rest
    } = this.props;
    console.log('component', component);
    console.log('this.props', this.props);

    if (isActive === false) {
      return null
    }

    return (
      <div>
        <div style={{ margin: '4rem 0' }}>
          <Previous
            label={prevBtnLabel}
            isActive={displayPrevious}
            goToPreviousStep={this.handlePrevClick}
          />
          <Next
            label={nextBtnLabel}
            isActive={displayNext}
            goToNextStep={this.handleNextClick}
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
    const { label, isActive, goToPreviousStep } = this.props;
    console.log('isActive', isActive);
    if (isActive === false) return null;

    return (
      <Button onClick={goToPreviousStep}>
        Previous
      </Button>
    );
  }
}

class Next extends React.Component {

  render() {
    const { label, isActive, goToNextStep } = this.props;
    console.log('isActive', isActive);
    if (isActive === false) return null;

    return (
      <Button className='pull-right' onClick={goToNextStep}>
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