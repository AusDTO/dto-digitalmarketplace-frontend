import { validPhoneNumber, dateIs2DaysInFuture } from 'marketplace/components/validators'
import BuyerTrainingIntroductionStage from './BuyerTrainingIntroductionStage'
import BuyerTrainingAboutStage from './BuyerTrainingAboutStage'
import BuyerTrainingSelectStage from './BuyerTrainingSelectStage'
import BuyerTrainingRequirementsStage from './BuyerTrainingRequirementsStage'
import BuyerTrainingReviewStage from './BuyerTrainingReviewStage'
import BuyerTrainingClosingStage from './BuyerTrainingClosingStage'
import BuyerTrainingResponseFormatsStage, {
  atleastOneFormat,
  atleastOneProposal
} from './BuyerTrainingResponseFormatsStage'
import BuyerTrainingTimeframesAndBudgetStage from './BuyerTrainingTimeframesAndBudgetStage'
import BuyerEvaluationCriteriaStage, { done as evaluationDone } from '../BuyerBriefFlow/BuyerEvaluationCriteriaStage'

const BuyerTrainingStages = [
  {
    slug: 'introduction',
    title: 'Introduction',
    component: BuyerTrainingIntroductionStage,
    isDone: () => true
  },
  {
    slug: 'select',
    title: 'Who can respond?',
    component: BuyerTrainingSelectStage,
    isDone: formValues => Object.keys(formValues.sellers).length > 0 && formValues.sellerCategory
  },
  {
    slug: 'about',
    title: 'About',
    component: BuyerTrainingAboutStage,
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
    component: BuyerTrainingResponseFormatsStage,
    isDone: formValues => atleastOneFormat(formValues) && atleastOneProposal(formValues)
  },
  {
    slug: 'requirements',
    title: 'Requirements',
    component: BuyerTrainingRequirementsStage,
    isDone: formValues =>
      formValues.requirementsDocument.length > 0 &&
      formValues.requirementsDocument.every(val => val) &&
      (!formValues.evaluationType.includes('Response template') ||
        (formValues.responseTemplate.length > 0 && formValues.responseTemplate.every(val => val)))
  },
  {
    slug: 'timeframes',
    title: 'Timeframes and budget',
    component: BuyerTrainingTimeframesAndBudgetStage,
    isDone: formValues => formValues.startDate.length > 0 && formValues.contractLength.length > 0
  },
  {
    slug: 'criteria',
    title: 'Evaluation criteria',
    component: BuyerEvaluationCriteriaStage,
    isDone: evaluationDone
  },
  {
    slug: 'closing',
    title: 'Closing date',
    component: BuyerTrainingClosingStage,
    isDone: formValues =>
      dateIs2DaysInFuture(formValues.closedAt) && formValues.contactNumber && validPhoneNumber(formValues.contactNumber)
  },
  {
    slug: 'review',
    title: 'Review and publish',
    component: BuyerTrainingReviewStage
  }
]

export default BuyerTrainingStages
