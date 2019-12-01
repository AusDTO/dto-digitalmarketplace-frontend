import SellerAssessmentIntroductionStage from './SellerAssessmentIntroductionStage'
import SellerAssessmentMaximumRate, { done as maximumratesDone } from './SellerAssessmentMaximumRate'
import SellerAssessmentRateStage, { done as ratesDone } from './SellerAssessmentRateStage'
import SellerAssessmentReviewStage from './SellerAssessmentReviewStage'
import SellerAssessmentCriteriaStage, { done as criteriaDone } from './SellerAssessmentCriteriaStage'
import SellerAssessmentEvidenceStage, { done as evidenceDone } from './SellerAssessmentEvidenceStage'

const SellerAssessmentStagesHybrid = [
  {
    slug: 'introduction',
    title: 'Introduction',
    component: SellerAssessmentIntroductionStage,
    isDone: () => true
  },
  {
    slug: 'maximumRate',
    title: 'Rate',
    component: SellerAssessmentMaximumRate,
    isDone: maximumratesDone
  },
  {
    slug: 'candidatePool',
    title: 'Candidate pool',
    component: SellerAssessmentMaximumRate,
    isDone: candidatePoolDone
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

export default SellerAssessmentStagesHybrid
