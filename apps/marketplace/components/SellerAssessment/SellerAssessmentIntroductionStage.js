import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'

const SellerAssessmentIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    <AUpageAlert as="error">
      <p>
        Requests for category assessments are closed. You can apply on{' '}
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a href="https://www.buyict.gov.au" rel="external" target="_blank">
          BuyICT
        </a>{' '}
        <strong>from 30 May</strong>.
      </p>
    </AUpageAlert>
    <AUheadings level="1" size="xl">
      {props.meta.domain.name} assessment
    </AUheadings>
    <p>
      You must be assessed as offering value for money before you can respond to opportunities published on the Digital
      Marketplace. The information you submit will only be visible to the assessment team.
    </p>
    <p>
      <strong>How long does assessment take?</strong>
      <br />
      The time we take to assess your criteria is dependent on volume, seasonal peaks, complex cases and incomplete
      submissions. We will endeavour to assess your criteria in a reasonable timeframe.
      <br />
      <br />
      If you submit your request for assessment within 2 days of the closing date, we cannot guarantee that you will be
      assessed in time to respond.
    </p>
    <AUheadings level="2" size="lg">
      You will be asked for
    </AUheadings>
    <ul>
      <li>
        your maximum daily rate for your services in {props.meta.domain.name}. Use{' '}
        <a
          href="https://www.sfia-online.org/en/framework/sfia-7/busskills/level-5"
          target="_blank"
          rel="external noopener noreferrer"
        >
          SFIA level 5
        </a>{' '}
        and the{' '}
        <a
          href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000556476"
          rel="noopener noreferrer"
          target="_blank"
        >
          panel categories and rates
        </a>{' '}
        as a guide.
      </li>
      <li>which criteria you are requesting assessment in.</li>
      <li>evidence of your expertise in the criteria.</li>
    </ul>
    {props.formButtons}
  </Form>
)

SellerAssessmentIntroductionStage.defaultProps = {
  onSubmit: () => {}
}

SellerAssessmentIntroductionStage.propTypes = {
  model: PropTypes.string.isRequired,
  formButtons: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
}

export default SellerAssessmentIntroductionStage
