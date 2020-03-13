import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUdirectionLink from '@gov.au/direction-links/lib/js/react.js'
import formProps from 'shared/form/formPropsSelector'
import { rootPath } from 'marketplace/routes'
import styles from './SellerAssessmentReviewStage.scss'
import { connect } from 'react-redux'
import { getCriteriaName } from '/Users/reshmaabraham/code/dto-digitalmarketplace-frontend/apps/marketplace/components/SellerAssessment/SellerAssessmentEvidenceStage'

const SellerAssessmentView = props => (

  
  <div>
    <AUdirectionLink link={`${rootPath}/seller-dashboard`} text="back to dashboard" direction="left" />

    <AUheading level="1" size="xl">
      {props.meta.domain.name} Assessment {props[props.model].maxDailyRate}
    </AUheading>

    {/* Approved */}
    <p>
      You cannot edit your request for approved categories. If you want to change your rate, please contact the Digital
      Marketplace.
    </p>
    {/* Rejected */}
    <p>If your assessment was not approved, you can view the feedback and submit another request.</p>

    {/* Submitted */}
    <p>You cannot edit your request once you've submitted the request for assessment. </p>

    <AUheading level="2" size="lg">
      Maximum daily rate
    </AUheading>
    <p>${props[props.model].maxDailyRate} (including GST)</p>
    <div className={styles.spacer} />
    {props[props.model].criteria.map(criteriaId => (
      <React.Fragment key={criteriaId}>
        <AUheading level="2" size="md">
          Criteria
        </AUheading>
        <p className={styles.reviewText}>{getCriteriaName(criteriaId, props.meta.domain.criteria)}</p>
        <AUheading level="2" size="md">
          Client
        </AUheading>
        <p className={styles.reviewText}>{props[props.model].evidence[criteriaId].client}</p>
        <AUheading level="2" size="md">
          Referee&apos;s name and number
        </AUheading>
        <p className={styles.reviewText}>
          {props[props.model].evidence[criteriaId].refereeName}: {props[props.model].evidence[criteriaId].refereeNumber}
        </p>
        <AUheading level="2" size="md">
          Project date
        </AUheading>
        <p className={styles.reviewText}>
          {props[props.model].evidence[criteriaId].startDate} - {props[props.model].evidence[criteriaId].endDate}
        </p>
        <AUheading level="2" size="md">
          Background
        </AUheading>
        <p className={styles.reviewText}>{props[props.model].evidence[criteriaId].background}</p>
        <AUheading level="2" size="md">
          Evidence of meeting the criteria
        </AUheading>
        <p className={styles.reviewText}>{props[props.model].evidence[criteriaId].response}</p>
        {props[props.model].criteria.indexOf(criteriaId) !== props[props.model].criteria.length - 1 && (
          <div className={styles.spacer} />
        )}
      </React.Fragment>
    ))}
  </div>
)

SellerAssessmentView.propTypes = {
  meta: PropTypes.object.isRequired,
  model: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...formProps(state, props.model)
})

export default connect(mapStateToProps)(SellerAssessmentView)
