import SellerAssessmentIntroductionStage from './SellerAssessmentIntroductionStage'
import SellerAssessmentMaximumRate, { done as maximumRatesDone } from './SellerAssessmentMaximumRate'
import SellerAssessmentCandidatePool, { done as candidatePoolDone } from './SellerAssessmentCandidatePool'
import SellerAssessmentReviewStage from './SellerAssessmentReviewStage'
import SellerAssessmentHybridCriteriaStage, { done as hybridcriteriaDone } from './SellerAssessmentHybridCriteriaStage'
import SellerAssessmentHybridEvidenceStage, { done as hyridevidenceDone } from './SellerAssessmentHybridEvidenceStage'

const SellerAssessmentRecruiterStages = [
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
    isDone: maximumRatesDone
  },
  {
    slug: 'candidatePool',
    title: 'Candidate Pool',
    component: SellerAssessmentCandidatePool,
    isDone: candidatePoolDone
  },
  {
    slug: 'criteria',
    title: 'Criteria',
    component: SellerAssessmentHybridCriteriaStage,
    isDone: hybridcriteriaDone
  },
  {
    slug: 'evidence',
    title: 'Evidence',
    component: SellerAssessmentHybridEvidenceStage,
    isDone: hyridevidenceDone
  },
  {
    slug: 'review',
    title: 'Review',
    component: SellerAssessmentReviewStage
  }
]

export default SellerAssessmentRecruiterStages