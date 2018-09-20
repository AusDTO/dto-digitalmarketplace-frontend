import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Textfield from 'shared/form/Textfield'
import Textarea from 'shared/form/Textarea'
import formProps from 'shared/form/formPropsSelector'
import { required } from 'marketplace/components/validators'
import AUheadings from '@gov.au/headings/lib/js/react.js'

export class BuyerRFQAboutStage extends Component {
  componentDidUpdate() {
    const { model } = this.props
    if (this.props[model].title && this.props[model].organisation && !this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, true)
    } else if ((!this.props[model].title || !this.props[model].organisation) && this.props.isDone) {
      this.props.setStageDoneStatus(this.props.stage, false)
    }
  }

  render() {
    const { model } = this.props
    return (
      <div>
        <AUheadings level="1" size="xl">
          About
        </AUheadings>
        <Textfield
          model={`${model}.title`}
          label="Title"
          name="title"
          id="title"
          htmlFor="title"
          defaultValue={this.props[model].title}
          maxLength={100}
          validators={{
            required
          }}
          messages={{
            required: 'Enter a title for this brief'
          }}
        />
        <Textfield
          model={`${model}.organisation`}
          label="Organisation"
          name="organisation"
          id="organisation"
          htmlFor="organisation"
          defaultValue={this.props[model].organisation}
          maxLength={100}
          validators={{
            required
          }}
          messages={{
            required: 'Enter the name of your organisation'
          }}
        />
        <Textarea
          model={`${model}.summary`}
          label="Summary"
          name="summary"
          id="summary"
          htmlFor="summary"
          defaultValue={this.props[model].summary}
          controlProps={{ limit: 150 }}
          validators={{
            required
          }}
          messages={{
            required: 'Enter a summary of your brief',
            limitWords: 'Your feedback has exceeded the 150 word limit'
          }}
        />
      </div>
    )
  }
}

BuyerRFQAboutStage.propTypes = {
  model: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  setStageDoneStatus: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(BuyerRFQAboutStage)
