import React from 'react'
import PropTypes from 'prop-types'
import AUheading from '@gov.au/headings/lib/js/react.js'
import AUdirectionLink from '@gov.au/direction-links/lib/js/react.js'
import { rootPath } from 'marketplace/routes'
import SellerAssessmentCaseStudiesPage from '../../pages/SellerAssessmentCaseStudiesPage'

const SellerAssessmentCaseStudies = props => (
  <div>
    <AUdirectionLink link={`${rootPath}/seller-dashboard/categories`} text="back to dashboard" direction="left" />

    <AUheading level="1" size="xl">
      Case Studies
    </AUheading>
  </div>
)

SellerAssessmentCaseStudies.propTypes = {
  domain: PropTypes.object.isRequired
}

export default SellerAssessmentCaseStudies
