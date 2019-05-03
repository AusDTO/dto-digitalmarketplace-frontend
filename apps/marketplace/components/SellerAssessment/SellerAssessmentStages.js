import SellerAssessmentIntroductionStage from './SellerAssessmentIntroductionStage'
import SellerAssessmentRateStage from './SellerAssessmentRateStage'
import SellerAssessmentReviewStage from './SellerAssessmentReviewStage'

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
    isDone: formValues => (formValues.maxDailyRate && formValues.maxDailyRate > 0)
  },
  {
    slug: 'review',
    title: 'Review',
    component: SellerAssessmentReviewStage
  }
]

export default SellerAssessmentStages
