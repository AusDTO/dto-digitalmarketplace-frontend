import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import AUbutton from '@gov.au/buttons/lib/js/react.js'

export class ProgressButtons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: ''
    }
  }

  render() {
    return this.state.redirect ? (
      <Redirect to={`/${this.state.redirect}`} />
    ) : (
      <p>
        {this.props.nextStage ? (
          <AUbutton
            onClick={() => {
              this.props.onStageContinueClick()
              if (this.props.nextStage) {
                this.setState({
                  redirect: this.props.nextStage
                })
              }
            }}
          >
            {this.props.continueText}
          </AUbutton>
        ) : (
          <AUbutton>{this.props.submitText}</AUbutton>
        )}
        <AUbutton as="tertiary">{this.props.returnText}</AUbutton>
      </p>
    )
  }
}

ProgressButtons.defaultProps = {
  continueText: 'Continue',
  submitText: 'Submit',
  returnText: 'Return to overview',
  onStageContinueClick: () => {}
}

ProgressButtons.propTypes = {
  continueText: PropTypes.string,
  submitText: PropTypes.string,
  returnText: PropTypes.string,
  nextStage: PropTypes.string.isRequired,
  onStageContinueClick: PropTypes.func
}

export default ProgressButtons
