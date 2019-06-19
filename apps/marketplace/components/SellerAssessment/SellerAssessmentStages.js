import SellerAssessmentIntroductionStage from './SellerAssessmentIntroductionStage'
import SellerAssessmentRateStage, {
  greaterThanZero,
  lessThanLimit,
  validWholeNumber
} from './SellerAssessmentRateStage'
import SellerAssessmentReviewStage from './SellerAssessmentReviewStage'
import SellerAssessmentCriteriaStage, { getCriteriaNeeded } from './SellerAssessmentCriteriaStage'
import SellerAssessmentEvidenceStage, {
  requiredClient,
  requiredRefereeName,
  requiredRefereeNumber,
  requiredBackground,
  requiredStartDate,
  requiredEndDate,
  validDates,
  requiredEvidence
} from './SellerAssessmentEvidenceStage'

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
    isDone: formValues =>
      formValues.maxDailyRate &&
      greaterThanZero(formValues) &&
      lessThanLimit(formValues) &&
      validWholeNumber(formValues)
  },
  {
    slug: 'criteria',
    title: 'Criteria',
    component: SellerAssessmentCriteriaStage,
    isDone: (formValues, meta) =>
      formValues.criteria &&
      meta.criteriaNeeded &&
      formValues.criteria.length >= getCriteriaNeeded(meta.criteriaNeeded, meta.priceMaximum, formValues.maxDailyRate)
  },
  {
    slug: 'evidence',
    title: 'Evidence',
    component: SellerAssessmentEvidenceStage,
    isDone: formValues =>
      requiredClient(formValues) &&
      requiredRefereeName(formValues) &&
      requiredRefereeNumber(formValues) &&
      requiredBackground(formValues) &&
      requiredStartDate(formValues) &&
      requiredEndDate(formValues) &&
      validDates(formValues) &&
      requiredEvidence(formValues)
  },
  {
    slug: 'review',
    title: 'Review',
    component: SellerAssessmentReviewStage
  }
]

export default SellerAssessmentStages
