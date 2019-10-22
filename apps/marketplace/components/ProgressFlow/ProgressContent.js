/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ProgressContent.scss'

export class ProgressContent extends Component {
  constructor(props) {
    super(props)
    this.element = React.createRef()
  }

  componentDidMount() {
    this.props.setCurrentStage(this.props.stage)
    this.props.onStageMount(this.props.stage)
    this.element.current.focus()
    window.scrollTo(0, 0)
  }

  render() {
    const StageComponent = this.props.component
    return (
      <div tabIndex="0" ref={this.element} className={styles.container}>
        <StageComponent
          model={this.props.model}
          meta={this.props.meta}
          saveModel={this.props.saveModel}
          onSubmit={this.props.onSubmit}
          onSubmitFailed={this.props.onSubmitFailed}
          formButtons={this.props.formButtons}
          stagesTodo={this.props.stagesTodo}
        />
      </div>
    )
  }
}

ProgressContent.defaultProps = {
  setCurrentStage: () => {},
  saveModel: () => {},
  onSubmit: () => {},
  onSubmitFailed: () => {},
  onStageMount: () => {},
  stagesTodo: [],
  meta: {}
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
  formButtons: PropTypes.node.isRequired,
  meta: PropTypes.object
}

export default ProgressContent
