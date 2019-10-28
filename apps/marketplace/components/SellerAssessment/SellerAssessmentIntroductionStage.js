import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-redux-form'
import AUheadings from '@gov.au/headings/lib/js/react.js'
import styles from './SellerAssessmentIntroductionStage.scss'

const SellerAssessmentIntroductionStage = props => (
  <Form model={props.model} onSubmit={props.onSubmit}>
    <AUheadings level="1" size="xl">
      {props.meta.domain.name} assessment
    </AUheadings>
    <p>
      You must be assessed as offering value for money before you can respond to opportunities published on the Digital
      Marketplace. The information you submit will only be visible to the assessment team.
    </p>
    <p>
      <strong>Please note:</strong> The time we take to assess your criteria is dependent on volume, seasonal peaks,
      complex cases and incomplete submissions. We will endeavour to assess your criteria in a reasonable timeframe.
    </p>
    <AUheadings level="2" size="lg">
      You will be asked for
    </AUheadings>
    <ul>
      <li>
        your maximum daily rate for your services in {props.meta.domain.name}. Use{' '}
        <div className={styles.icon}>
        <a href="https://www.sfia-online.org/en/framework/sfia-7/busskills/level-5" rel="external">SFIA level 5</a>
          {' '}
        and the{' '}
        <a
          href="https://marketplace1.zendesk.com/hc/en-gb/articles/360000556476"
          rel="noopener noreferrer"
          target="_blank"
        >
          panel categories and rates
        </a>{' '}
        as a guide.
        </div>  
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
