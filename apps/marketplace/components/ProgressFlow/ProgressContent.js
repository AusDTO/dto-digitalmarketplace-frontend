import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class ProgressContent extends Component {
  componentDidMount() {
    this.props.setCurrentStage(this.props.stage)
    this.props.onStageMount(this.props.stage)
  }

  render() {
    const StageComponent = this.props.component
    return (
      <StageComponent
        model={this.props.model}
        saveModel={this.props.saveModel}
        onSubmit={this.props.onSubmit}
        onSubmitFailed={this.props.onSubmitFailed}
        formButtons={this.props.formButtons}
        stagesTodo={this.props.stagesTodo}
      />
    )
  }
}

ProgressContent.defaultProps = {
  setCurrentStage: () => {},
  saveModel: () => {},
  onSubmit: () => {},
  onSubmitFailed: () => {},
  onStageMount: () => {},
  stagesTodo: []
}

ProgressContent.propTypes = {
  model: PropTypes.string.isRequired,
  setCurrentStage: PropTypes.func,
  saveModel: PropTypes.func,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func,
  onStageMount: PropTypes.func,
  stagesTodo: PropTypes.array,
  stage: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  formButtons: PropTypes.node.isRequired
}

export default ProgressContent
