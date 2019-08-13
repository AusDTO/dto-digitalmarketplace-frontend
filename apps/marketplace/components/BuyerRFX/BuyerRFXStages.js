import { validPhoneNumber, dateIs2DaysInFuture } from 'marketplace/components/validators'
import BuyerRFXIntroductionStage from './BuyerRFXIntroductionStage'
import BuyerRFXAboutStage from './BuyerRFXAboutStage'
import BuyerRFXSelectStage from './BuyerRFXSelectStage'
import BuyerRFXRequirementsStage from './BuyerRFXRequirementsStage'
import BuyerRFXReviewStage from './BuyerRFXReviewStage'
import BuyerRFXClosingStage from './BuyerRFXAdditionalInformationStage'
import BuyerRFXResponseFormatsStage, { atleastOneFormat, atleastOneProposal } from './BuyerRFXResponseFormatsStage'
import BuyerRFXTimeframesAndBudgetStage from './BuyerRFXTimeframesAndBudgetStage'
import BuyerRFXEvaluationCriteriaStage, {
  weightingsAddUpTo100,
  noEmptyWeightings,
  noEmptyCriteria
} from './BuyerRFXEvaluationCriteriaStage'

const BuyerRFXStages = [
  {
    slug: 'introduction',
    title: 'Introduction',
    component: BuyerRFXIntroductionStage,
    isDone: () => true
  },
  {
    slug: 'select',
    title: 'Who can respond?',
    component: BuyerRFXSelectStage,
    isDone: formValues => Object.keys(formValues.sellers).length > 0 && formValues.sellerCategory
  },
  {
    slug: 'about',
    title: 'About',
    component: BuyerRFXAboutStage,
    isDone: formValues =>
      formValues.title.length > 0 &&
      formValues.organisation.length > 0 &&
      formValues.summary.length > 0 &&
      formValues.location.length > 0 &&
      formValues.workingArrangements.length > 0
  },
  {
    slug: 'formats',
    title: 'Response formats',
    component: BuyerRFXResponseFormatsStage,
    isDone: formValues => atleastOneFormat(formValues) && atleastOneProposal(formValues)
  },
  {
    slug: 'requirements',
    title: 'Requirements',
    component: BuyerRFXRequirementsStage,
    isDone: formValues =>
      formValues.requirementsDocument.length > 0 &&
      formValues.requirementsDocument.every(val => val) &&
      (!formValues.evaluationType.includes('Response template') ||
        (formValues.responseTemplate.length > 0 && formValues.responseTemplate.every(val => val)))
  },
  {
    slug: 'timeframes',
    title: 'Timeframes and budget',
    component: BuyerRFXTimeframesAndBudgetStage,
    isDone: formValues => formValues.startDate.length > 0 && formValues.contractLength.length > 0
  },
  {
    slug: 'criteria',
    title: 'Evaluation criteria',
    component: BuyerRFXEvaluationCriteriaStage,
    isDone: formValues =>
      formValues.evaluationCriteria.length > 0 &&
      noEmptyCriteria(formValues) &&
      noEmptyWeightings(formValues) &&
      weightingsAddUpTo100(formValues)
  },
  {
    slug: 'additional',
    title: 'Additional information',
    component: BuyerRFXClosingStage,
    isDone: formValues =>
      dateIs2DaysInFuture(formValues.closedAt) && formValues.contactNumber && validPhoneNumber(formValues.contactNumber)
  },
  {
    slug: 'review',
    title: 'Review and publish',
    component: BuyerRFXReviewStage
  }
]

export default BuyerRFXStages
