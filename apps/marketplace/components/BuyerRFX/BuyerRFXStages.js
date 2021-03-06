import BuyerRFXIntroductionStage from './BuyerRFXIntroductionStage'
import BuyerRFXAboutStage from './BuyerRFXAboutStage'
import BuyerRFXSelectStage from './BuyerRFXSelectStage'
import BuyerRFXRequirementsStage from './BuyerRFXRequirementsStage'
import BuyerRFXReviewStage from './BuyerRFXReviewStage'
import BuyerRFXAdditionalInformationStage, { done as additionalDone } from './BuyerRFXAdditionalInformationStage'
import BuyerRFXResponseFormatsStage, { done as responseFormatDone } from './BuyerRFXResponseFormatsStage'
import BuyerRFXTimeframesAndBudgetStage from './BuyerRFXTimeframesAndBudgetStage'
import BuyerEvaluationCriteriaStage, { done as evaluationDone } from '../BuyerBriefFlow/BuyerEvaluationCriteriaStage'

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
    slug: 'criteria',
    title: 'Evaluation criteria',
    component: BuyerEvaluationCriteriaStage,
    isDone: evaluationDone
  },
  {
    slug: 'formats',
    title: 'Response formats',
    component: BuyerRFXResponseFormatsStage,
    isDone: responseFormatDone
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
    slug: 'additional',
    title: 'Additional information',
    component: BuyerRFXAdditionalInformationStage,
    isDone: additionalDone
  },
  {
    slug: 'review',
    title: 'Review and publish',
    component: BuyerRFXReviewStage
  }
]

export default BuyerRFXStages
