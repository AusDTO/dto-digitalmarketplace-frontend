import React from 'react'
import PropTypes from 'prop-types'
import AUpageAlert from '@gov.au/page-alerts/lib/js/react.js'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUdirectionLink from '@gov.au/direction-links/lib/js/react.js'
import formProps from 'shared/form/formPropsSelector'
import { rootPath } from 'marketplace/routes'
import { getCriteriaName } from '/Users/reshmaabraham/code/dto-digitalmarketplace-frontend/apps/marketplace/components/SellerAssessment/SellerAssessmentEvidenceStage'

const SellerAssessmentCompleted = props => (
  <div>
    <AUdirectionLink link={`${rootPath}/seller-dashboard`} text="back to dashboard" direction="left" />

    <AUheading level="2" size="lg">
      Assessment View of
    </AUheading>
    <p>
      Here you can view your assessment. Please be aware that the dev's code is crap and is still trying to figure it
      out
    </p>

    <AUheading level="2" size="lg">
      Maximum daily rate
    </AUheading>
    <p> {props.maxDailyRate}</p>

    <AUheading level="2" size="lg">
      Evidence
    </AUheading>

    {/* <p className>{getCriteriaName(criteriaId, props.meta.domain.criteria)}</p> */}
    

    {/* {props[props.model].criteria.map(criteriaId => (
          <React.Fragment key={criteriaId}>

          </React.Fragment>
    ))} */}
    <AUheading level="2" size="md">
      Criteria
    </AUheading>
    {/* <p className={styles.reviewText}>{getCriteriaName(criteriaId, props.meta.domain.criteria)}</p> */}
    <AUheading level="2" size="md">
      Client
    </AUheading>
    {/* <p className={styles.reviewText}>{props[props.model].evidence[criteriaId].client}</p> */}
    <AUheading level="2" size="md">
      Referee&apos;s name and number
    </AUheading>
    <AUheading level="2" size="md">
      Project date
    </AUheading>
    <AUheading level="2" size="md">
      Background
    </AUheading>
    <AUheading level="2" size="md">
      Evidence of meeting the criteria
    </AUheading>
  </div>
)

SellerAssessmentCompleted.propTypes = {
  contactEmail: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  //   model: PropTypes.string.isRequired,
}

// const mapStateToProps = (state, props) => ({
//     ...formProps(state, props.model)
//   })

export default SellerAssessmentCompleted
