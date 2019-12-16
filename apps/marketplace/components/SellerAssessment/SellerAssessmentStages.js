import SellerAssessmentIntroductionStage from './SellerAssessmentIntroductionStage'
import SellerAssessmentRateStage, { done as ratesDone } from './SellerAssessmentRateStage'
import SellerAssessmentReviewStage from './SellerAssessmentReviewStage'
import SellerAssessmentCriteriaStage, { done as criteriaDone } from './SellerAssessmentCriteriaStage'
import SellerAssessmentEvidenceStage, { done as evidenceDone } from './SellerAssessmentEvidenceStage'
import SellerAssessmentMaximumRate, {
  done as maximumRatesDone
} from '../SellerAssessment/Hybrid/SellerAssessmentMaximumRate'
import SellerAssessmentCandidatePool, {
  done as candidatePoolDone
} from '../SellerAssessment/Hybrid/SellerAssessmentCandidatePool'
import SellerAssessmentHybridCriteriaStage, {
  done as hybridCriteriaDone
} from '../SellerAssessment/Hybrid/SellerAssessmentHybridCriteriaStage'
import SellerAssessmentHybridEvidenceStage, {
  done as hybridEvidenceDone
} from '../SellerAssessment/Hybrid/SellerAssessmentHybridEvidenceStage'

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
  // {
  //   slug: 'maximumRate',
  //   title: 'Rate',
  //   component: SellerAssessmentMaximumRate,
  //   isDone: maximumRatesDone
  // },
  // {
  //   slug: 'candidatePool',
  //   title: 'Candidate Pool',
  //   component: SellerAssessmentCandidatePool,
  //   isDone: candidatePoolDone
  // },
  // {
  //   slug: 'hybridCriteria',
  //   title: 'Hybrid Criteria',
  //   component: SellerAssessmentHybridCriteriaStage,
  //   isDone: hybridCriteriaDone
  // },
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
  // {
  //   slug: 'evidence',
  //   title: 'Hybrid Evidence',
  //   component: SellerAssessmentHybridEvidenceStage,
  //   isDone: hybridEvidenceDone
  // },
  {
    slug: 'review',
    title: 'Review',
    component: SellerAssessmentReviewStage
  }
]

export default SellerAssessmentStages
