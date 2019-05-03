import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheadings from '@gov.au/headings/lib/js/react.js'

const BuyerSpecialistIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    <AUheadings level="1" size="xl">
      Hire a digital specialist
    </AUheadings>
    <AUheadings level="2" size="lg">
      Before you start
    </AUheadings>
    <p>
      Download the{' '}
      <a href="/static/media/documents/Seek-proposals-list-of-questions.xlsx" rel="noopener noreferrer" target="_blank">
        questions template (DOC XXKB)
      </a>{' '}
      to prepare offline before publishing.
    </p>
    <AUheadings level="2" size="lg">
      Getting help
    </AUheadings>
    <p>
      <a
        href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000579716"
        rel="external noopener noreferrer"
        target="_blank"
      >
        View support article
      </a>
      <br />
      <a href="/contact-us" target="_blank">
        Contact us
      </a>
    </p>
    <p>All fields are mandatory unless marked optional.</p>
    {props.formButtons}
  </Form>
)

BuyerSpecialistIntroductionStage.defaultProps = {
  onSubmit: () => {}
}

BuyerSpecialistIntroductionStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  onSubmit: PropTypes.func
}

export default BuyerSpecialistIntroductionStage
