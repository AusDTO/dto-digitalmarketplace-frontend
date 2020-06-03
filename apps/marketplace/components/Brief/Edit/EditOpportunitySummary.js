import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import { limitWords, required } from 'marketplace/components/validators'
import formProps from 'shared/form/formPropsSelector'
import Textarea from 'shared/form/Textarea'

import styles from '../../../main.scss'

class EditOpportunitySummary extends Component {
  constructor(props) {
    super(props)
    window.scrollTo(0, 0)

    this.state = {
      initialSummary: props[props.model].summary ? props[props.model].summary : props.brief.summary,
      redirectToEditsTable: false
    }

    // This reset clears any invalid state from the parent form which prevents submit events from this component.
    props.resetValidity(props.model)

    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleContinueClick = this.handleContinueClick.bind(this)
  }

  handleCancelClick = () => {
    const { initialSummary } = this.state

    this.props.setSummary(initialSummary)
    this.setState({
      redirectToEditsTable: true
    })
  }

  handleContinueClick = data => {
    this.props.setSummary(data.summary)
    this.props.setOnlySellersEdited(false)
    this.setState({
      redirectToEditsTable: true
    })
  }

  render = () => {
    const { brief, model } = this.props
    const { initialSummary, redirectToEditsTable } = this.state

    let label = 'Summary of work to be done'
    let requiredMessage = 'You must add a summary of work to be done'
    let controlProps = {
      limit: 200,
      rows: '10'
    }

    if (brief.lot === 'specialist') {
      label = 'What will the specialist do?'
      requiredMessage = 'You must answer "What will the specialist do?".'
      controlProps = {
        limit: 1000,
        rows: '10'
      }
    }

    const limitWordsMessage = `Your summary has exceeded the ${controlProps.limit} word limit`

    if (redirectToEditsTable) {
      return <Redirect to="/" />
    }

    return (
      <Form
        model={model}
        onSubmit={this.handleContinueClick}
        onSubmitFailed={() => {}}
        validateOn="submit"
        validators={{
          '': {
            required,
            limitWords
          }
        }}
      >
        <div className="row">
          <AUheading level="1" size="xl">
            Edit summary
          </AUheading>
        </div>
        <div className="row">
          <Textarea
            model={`${model}.summary`}
            label={label}
            name="summary"
            id="summary"
            htmlFor="summary"
            defaultValue={initialSummary}
            controlProps={controlProps}
            validators={{
              required,
              limitWords
            }}
            messages={{
              required: requiredMessage,
              limitWords: limitWordsMessage
            }}
          />
        </div>
        <div className={`row ${styles.marginTop2}`}>
          <AUbutton type="submit">Continue</AUbutton>
          <AUbutton as="tertiary" onClick={this.handleCancelClick}>
            Cancel update
          </AUbutton>
        </div>
      </Form>
    )
  }
}

EditOpportunitySummary.defaultProps = {
  brief: {
    lot: '',
    summary: ''
  },
  model: ''
}

EditOpportunitySummary.propTypes = {
  brief: PropTypes.shape({
    lot: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired
  }),
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  resetValidity: model => dispatch(actions.setValidity(model, true)),
  setOnlySellersEdited: onlySellersEdited =>
    dispatch(actions.change(`${props.model}.onlySellersEdited`, onlySellersEdited)),
  setSummary: summary => dispatch(actions.change(`${props.model}.summary`, summary))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOpportunitySummary)
