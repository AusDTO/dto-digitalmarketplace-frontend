import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import AUtextInput from '@gov.au/text-inputs/lib/js/react.js'

export class BuyerRFQAboutStage extends Component {
  constructor(props) {
    super(props)

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleOrganisationChange = this.handleOrganisationChange.bind(this)
  }

  componentDidUpdate() {
    if (this.props.model.title && this.props.model.organisation && !this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, true)
    } else if ((!this.props.model.title || !this.props.model.organisation) && this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, false)
    }
  }

  handleTitleChange(e) {
    const newState = { ...this.props.model }
    newState.title = e.target.value
    this.props.updateModel(newState)
  }

  handleOrganisationChange(e) {
    const newState = { ...this.props.model }
    newState.organisation = e.target.value
    this.props.updateModel(newState)
  }

  render() {
    return (
      <div>
        <AUheadings level="1" size="xl">
          About
        </AUheadings>
        <p>
          <label htmlFor="brief-title">Title</label>
          <AUtextInput
            id="brief-title"
            required
            block
            value={this.props.model.title}
            onChange={this.handleTitleChange}
          />
        </p>
        <p>
          <label htmlFor="brief-organisation">Organisation</label>
          <AUtextInput
            id="brief-organisation"
            required
            block
            value={this.props.model.organisation}
            onChange={this.handleOrganisationChange}
          />
        </p>
      </div>
    )
  }
}

BuyerRFQAboutStage.propTypes = {
  model: PropTypes.object.isRequired,
  stage: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  updateModel: PropTypes.func.isRequired,
  setStageDoneStatus: PropTypes.func.isRequired
}

export default BuyerRFQAboutStage
