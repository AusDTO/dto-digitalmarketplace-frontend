import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class ProgressContent extends Component {
  componentDidMount() {
    this.props.setCurrentStage(this.props.stage)
  }

  render() {
    const StageComponent = this.props.component
    return <StageComponent model={this.props.model} saveModel={this.props.saveModel} />
  }
}

ProgressContent.defaultProps = {
  setCurrentStage: () => {},
  saveModel: () => {}
}

ProgressContent.propTypes = {
  model: PropTypes.string.isRequired,
  setCurrentStage: PropTypes.func,
  saveModel: PropTypes.func,
  stage: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
}

export default ProgressContent
