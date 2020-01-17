import SellerAssessmentIntroductionStage from './SellerAssessmentIntroductionStage'
import SellerAssessmentMaximumRate, { done as maximumRatesDone } from './SellerAssessmentMaximumRate'
import SellerAssessmentCandidatePool, { done as candidatePoolDone } from './SellerAssessmentCandidatePool'
import SellerAssessmentReviewStage from './SellerAssessmentReviewStage'
import SellerAssessmentHybridCriteriaStage, { done as hybridcriteriaDone } from './SellerAssessmentHybridCriteriaStage'
import SellerAssessmentHybridEvidenceStage, { done as hyridevidenceDone } from './SellerAssessmentHybridEvidenceStage'
import SellerAssessmentHybridPlacingCandidatesStage, { hideRateStage as hide} from  './SellerAssessmentHybridPlacingCandidatesStage'
import SellerAssessmentRateStage, { done as ratesDone } from '../SellerAssessmentRateStage'

const SellerAssessmentHybridStages = [
  {
    slug: 'introduction',
    title: 'Introduction',
    component: SellerAssessmentIntroductionStage,
    isDone: () => true
  },
  {
    slug: 'placingCandiates',
    title: 'Placing Candidates',
    component: SellerAssessmentHybridPlacingCandidatesStage,
    isDone: formValues =>
      formValues.placingCandidates === 'recruitment' ||
      formValues.placingCandidates === 'hybird' ||
      formValues.placingCandidates === 'consultants'
  },
  {
    slug: 'rate',
    title: 'Rate',
    component: SellerAssessmentRateStage,
    isDone: ratesDone,
    // isHidden: false
    isHidden: hide
  },
  {
    slug: 'maximumRate',
    title: 'Rate',
    component: SellerAssessmentMaximumRate,
    isDone: maximumRatesDone,
    // isHidden: false
    isHidden: !hide
  },
  // {
  //   slug: 'candidatePool',
  //   title: 'Candidate Pool',
  //   component: SellerAssessmentCandidatePool,
  //   isDone: candidatePoolDone
  // },
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

export default SellerAssessmentHybridStages
