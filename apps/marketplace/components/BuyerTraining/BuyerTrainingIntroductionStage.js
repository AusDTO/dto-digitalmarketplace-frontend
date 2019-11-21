import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheading from '@gov.au/headings/lib/js/react.js'

const BuyerTrainingIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    <AUheading level="1" size="xl">
      Get training to build digital skills
    </AUheading>
    <AUheading level="2" size="sm">
      Use this service to:
    </AUheading>
    <p>Request proposals from specific sellers to build digital skills and expertise.</p>
    <AUheading level="2" size="sm">
      What you get:
    </AUheading>
    <p>Proposals or a completed response template used by your agency.</p>
    <AUheading level="2" size="sm">
      Before you start:
    </AUheading>
    <ul>
      <li>
        The{' '}
        <a href="/api/2/r/learning-design-standards" rel="noopener noreferrer" target="_blank">
          Learning Design Standards
        </a>{' '}
        can be used to help structure your training approach.
      </li>
      <li>
        View the{' '}
        <a href="/api/2/r/training-support-article" rel="noopener noreferrer" target="_blank">
          support article
        </a>{' '}
        to see recommended questions and find appropriate sellers to approach.
      </li>
      <li>
        Download the{' '}
        <a href="/api/2/r/training-draft-questions" rel="noopener noreferrer" target="_blank">
          draft questions
        </a>{' '}
        and{' '}
        <a href="/api/2/r/training-requirement-documents" rel="noopener noreferrer" target="_blank">
          requirement documents
        </a>{' '}
        to prepare your request offline before publishing.
      </li>
    </ul>
    <p>All fields are mandatory unless marked optional.</p>
    {props.formButtons}
  </Form>
)

BuyerTrainingIntroductionStage.defaultProps = {
  onSubmit: () => {}
}

BuyerTrainingIntroductionStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
}

export default BuyerTrainingIntroductionStage
