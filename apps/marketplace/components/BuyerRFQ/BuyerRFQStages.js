import { validDate } from 'marketplace/components/validators'
import BuyerRFQIntroductionStage from './BuyerRFQIntroductionStage'
import BuyerRFQAboutStage from './BuyerRFQAboutStage'
import BuyerRFQSelectStage from './BuyerRFQSelectStage'
import BuyerRFQRequirementsStage from './BuyerRFQRequirementsStage'
import BuyerRFQReviewStage from './BuyerRFQReviewStage'
import BuyerRFQMarketApproachStage from './BuyerRFQMarketApproachStage'
import BuyerRFQResponseFormatsStage from './BuyerRFQResponseFormatsStage'
import BuyerRFQTimeframesAndBudgetStage from './BuyerRFQTimeframesAndBudgetStage'
import BuyerRFQEvaluationCriteriaStage, { weightingsAddUpTo100 } from './BuyerRFQEvaluationCriteriaStage'

const BuyerRFQStages = [
  {
    slug: 'introduction',
    title: 'Introduction',
    component: BuyerRFQIntroductionStage,
    isDone: () => true
  },
  {
    slug: 'about',
    title: 'About',
    component: BuyerRFQAboutStage,
    isDone: formValues =>
      formValues.title.length > 0 &&
      formValues.organisation.length > 0 &&
      formValues.location.length > 0 &&
      formValues.workingArrangements.length > 0
  },
  {
    slug: 'formats',
    title: 'Response formats',
    component: BuyerRFQResponseFormatsStage,
    isDone: formValues =>
      (formValues.evaluationType.length && !formValues.evaluationType.includes('Written proposal')) ||
      formValues.proposalType.length > 0
  },
  {
    slug: 'requirements',
    title: 'Requirements',
    component: BuyerRFQRequirementsStage,
    isDone: formValues =>
      formValues.requirementsDocument.length > 0 &&
      formValues.requirementsDocument.every(val => val) &&
      (!formValues.evaluationType.includes('Response template') ||
        (formValues.responseTemplate.length > 0 && formValues.responseTemplate.every(val => val)))
  },
  {
    slug: 'timeframes',
    title: 'Timeframes and budget',
    component: BuyerRFQTimeframesAndBudgetStage,
    isDone: formValues => formValues.startDate.length > 0 && formValues.contractLength.length > 0
  },
  {
    slug: 'criteria',
    title: 'Evaluation criteria',
    component: BuyerRFQEvaluationCriteriaStage,
    isDone: formValues =>
      formValues.evaluationCriteria.length > 0 &&
      formValues.evaluationCriteria.every(val => val.criteria) &&
      weightingsAddUpTo100(formValues.evaluationCriteria)
  },
  {
    slug: 'select',
    title: 'Select sellers',
    component: BuyerRFQSelectStage,
    isDone: formValues => Object.keys(formValues.sellers).length > 0
  },
  {
    slug: 'approach',
    title: 'Market approach',
    component: BuyerRFQMarketApproachStage,
    isDone: formValues => validDate(formValues.closedAt)
  },
  {
    slug: 'review',
    title: 'Review and publish',
    component: BuyerRFQReviewStage
  }
]

export default BuyerRFQStages
