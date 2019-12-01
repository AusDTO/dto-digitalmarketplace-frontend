import SellerAssessmentIntroductionStage from './SellerAssessmentIntroductionStage'
import SellerAssessmentRateStage, { done as ratesDone } from './SellerAssessmentRateStage'
import SellerAssessmentReviewStage from './SellerAssessmentReviewStage'
import SellerAssessmentCriteriaStage, { done as criteriaDone } from './SellerAssessmentCriteriaStage'
import SellerAssessmentEvidenceStage, { done as evidenceDone } from './SellerAssessmentEvidenceStage'

const SellerAssessmentStages = [
  {
    slug: 'introduction',
    title: 'Introduction',
    component: SellerAssessmentIntroductionStage,
    isDone: () => true
  },
  {
    slug: 'rate',
    title: 'Rate',
    component: SellerAssessmentRateStage,
    isDone: ratesDone
  },
  {
    slug: 'criteria',
    title: 'Criteria',
    component: SellerAssessmentCriteriaStage,
    isDone: criteriaDone
  },
  {
    slug: 'evidence',
    title: 'Evidence',
    component: SellerAssessmentEvidenceStage,
    isDone: evidenceDone
  },
  {
    slug: 'review',
    title: 'Review',
    component: SellerAssessmentReviewStage
  }
]

export default SellerAssessmentStages
