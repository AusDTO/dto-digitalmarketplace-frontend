import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import { required } from 'marketplace/components/validators'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'

import styles from '../../../main.scss'

class EditOpportunityTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialTitle: props[props.model].title ? props[props.model].title : props.brief.title,
      redirectToEditsTable: false
    }

    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleContinueClick = this.handleContinueClick.bind(this)
  }

  handleCancelClick = () => {
    const { initialTitle } = this.state

    this.props.setTitle(initialTitle)
    this.setState({
      redirectToEditsTable: true
    })
  }

  handleContinueClick = data => {
    this.props.setTitle(data.title)
    this.props.setOnlySellersEdited(false)
    this.setState({
      redirectToEditsTable: true
    })
  }

  render = () => {
    const { model } = this.props
    const { initialTitle, redirectToEditsTable } = this.state

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
            required
          }
        }}
      >
        <div className="row">
          <AUheading level="1" size="xl">
            Edit title
          </AUheading>
        </div>
        <div className="row">
          <Textfield
            model={`${model}.title`}
            label="Opportunity title"
            name="title"
            id="title"
            htmlFor="title"
            defaultValue={initialTitle}
            maxLength={100}
            validators={{
              required
            }}
            messages={{
              required: 'Opportunity title is required'
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

EditOpportunityTitle.defaultProps = {
  brief: {
    title: ''
  },
  model: ''
}

EditOpportunityTitle.propTypes = {
  brief: PropTypes.shape({
    title: PropTypes.string.isRequired
  }),
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  setOnlySellersEdited: onlySellersEdited =>
    dispatch(actions.change(`${props.model}.onlySellersEdited`, onlySellersEdited)),
  setTitle: title => dispatch(actions.change(`${props.model}.title`, title))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOpportunityTitle)
