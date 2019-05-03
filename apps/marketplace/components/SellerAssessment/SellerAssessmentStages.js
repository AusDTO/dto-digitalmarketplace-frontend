import SellerAssessmentIntroductionStage from './SellerAssessmentIntroductionStage'
import SellerAssessmentRateStage from './SellerAssessmentRateStage'
import SellerAssessmentReviewStage from './SellerAssessmentReviewStage'
import SellerAssessmentCriteriaStage from './SellerAssessmentCriteriaStage'

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
    isDone: formValues => formValues.maxDailyRate && formValues.maxDailyRate > 0
  },
  {
    slug: 'criteria',
    title: 'Criteria',
    component: SellerAssessmentCriteriaStage,
    isDone: (formValues, meta) =>
      formValues.criteria && meta.criteriaNeeded && formValues.criteria.length >= meta.criteriaNeeded
  },
  {
    slug: 'review',
    title: 'Review',
    component: SellerAssessmentReviewStage
  }
]

export default SellerAssessmentStages
