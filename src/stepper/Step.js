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

      component,
      children,

      prevBtnLabel,
      nextBtnLabel,
    } = this.props;

    if (isActive === false) {
      return null
    }

    return (
      <div>
        <div style={{ margin: '4rem 0' }}>
          <Grid>
            <Row>
              <Col lgOffset={1} lg={10}>
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
              </Col>
            </Row>
          </Grid>
        </div>

        {component ? React.createElement(component, this.props) : children}
      </div>
    );
  }
}

class Previous extends React.Component {

  render() {
    const { label, isActive, goToPreviousStep } = this.props;
    if (isActive === false) return null;

    return (
      <Button onClick={goToPreviousStep}>
        {label || 'Previous'}
      </Button>
    );
  }
}

class Next extends React.Component {

  render() {
    const { label, isActive, goToNextStep } = this.props;
    if (isActive === false) return null;

    return (
      <Button className='pull-right' onClick={goToNextStep}>
        {label || 'Next'}
      </Button>
    );
  }
}

export default Step