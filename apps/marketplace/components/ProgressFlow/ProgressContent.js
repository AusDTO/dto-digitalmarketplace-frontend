import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class ProgressContent extends Component {
  componentDidMount() {
    this.props.setCurrentStage(this.props.stage)
  }

  render() {
    const StageComponent = this.props.component
    return <StageComponent model={this.props.model} saveBrief={this.props.saveBrief} />
  }
}

ProgressContent.defaultProps = {
  setCurrentStage: () => {},
  saveBrief: () => {}
}

ProgressContent.propTypes = {
  model: PropTypes.string.isRequired,
  setCurrentStage: PropTypes.func,
  saveBrief: PropTypes.func,
  stage: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
}

export default ProgressContent
