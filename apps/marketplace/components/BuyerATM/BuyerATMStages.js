import { validDate } from 'marketplace/components/validators'
import BuyerATMIntroductionStage from './BuyerATMIntroductionStage'
import BuyerATMAboutStage from './BuyerATMAboutStage'
import BuyerATMSelectStage from './BuyerATMSelectStage'
import BuyerATMObjectivesStage from './BuyerATMObjectivesStage'
import BuyerATMReviewStage from './BuyerATMReviewStage'
import BuyerATMMarketApproachStage from './BuyerATMMarketApproachStage'
import BuyerATMResponseFormatsStage from './BuyerATMResponseFormatsStage'
import BuyerATMTimeframesAndBudgetStage from './BuyerATMTimeframesAndBudgetStage'
import BuyerATMEvaluationCriteriaStage, { weightingsAddUpTo100 } from './BuyerATMEvaluationCriteriaStage'

const BuyerATMStages = [
  {
    slug: 'introduction',
    title: 'Introduction',
    component: BuyerATMIntroductionStage,
    isDone: () => true
  },
  {
    slug: 'select',
    title: 'Select sellers',
    component: BuyerATMSelectStage,
    isDone: formValues =>
      (formValues.sellerSelector.length > 0 && formValues.sellerSelector === 'allSellers') ||
      (formValues.sellerSelector === 'someSellers' && Object.keys(formValues.sellers).length > 0)
  },
  {
    slug: 'about',
    title: 'About',
    component: BuyerATMAboutStage,
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
    component: BuyerATMResponseFormatsStage,
    isDone: formValues =>
      (formValues.evaluationType.length && !formValues.evaluationType.includes('Written proposal')) ||
      formValues.proposalType.length > 0
  },
  {
    slug: 'objectives',
    title: 'Objectives',
    component: BuyerATMObjectivesStage,
    isDone: formValues =>
      formValues.backgroundInformation.length > 0 &&
      formValues.outcome.length > 0 &&
      formValues.endUsers.length > 0 &&
      formValues.workAlreadyDone.length > 0 &&
      (!formValues.evaluationType.includes('Response template') ||
        (formValues.responseTemplate.length > 0 && formValues.responseTemplate.every(val => val)))
  },
  {
    slug: 'timeframes',
    title: 'Timeframes and budget',
    component: BuyerATMTimeframesAndBudgetStage,
    isDone: formValues => formValues.startDate.length > 0 && formValues.contractLength.length > 0
  },
  {
    slug: 'criteria',
    title: 'Evaluation criteria',
    component: BuyerATMEvaluationCriteriaStage,
    isDone: formValues =>
      formValues.evaluationCriteria.length > 0 &&
      formValues.evaluationCriteria.every(val => val.criteria) &&
      weightingsAddUpTo100(formValues.evaluationCriteria)
  },
  {
    slug: 'approach',
    title: 'Briefing and closing date',
    component: BuyerATMMarketApproachStage,
    isDone: formValues => validDate(formValues.closedAt) && formValues.contactNumber.length > 0
  },
  {
    slug: 'review',
    title: 'Review and publish',
    component: BuyerATMReviewStage
  }
]

export default BuyerATMStages
