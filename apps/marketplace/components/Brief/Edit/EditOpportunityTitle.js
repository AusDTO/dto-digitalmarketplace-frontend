import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, Form } from 'react-redux-form'
import { Redirect } from 'react-router-dom'

import AUbutton from '@gov.au/buttons/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'

import { required } from 'marketplace/components/validators'
import { rootPath } from 'marketplace/routes'
import formProps from 'shared/form/formPropsSelector'
import Textfield from 'shared/form/Textfield'

import styles from '../../../main.scss'

class EditOpportunityTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToEditsTable: false
    }

    this.handleContinueClick = this.handleContinueClick.bind(this)
  }

  handleContinueClick = data => {
    this.props.setTitle(data.title)
    this.setState({
      redirectToEditsTable: true
    })
  }

  render = () => {
    const { brief, model } = this.props
    const edits = this.props[model]

    if (this.state.redirectToEditsTable) {
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
            defaultValue={edits.title ? edits.title : brief.title}
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
          <AUbutton as="tertiary" link={`${rootPath}/brief/${brief.id}/edit`}>
            Cancel update
          </AUbutton>
        </div>
      </Form>
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

const mapDispatchToProps = (dispatch, props) => ({
  setTitle: title => dispatch(actions.change(`${props.model}.title`, title))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditOpportunityTitle)
