import { validPhoneNumber, dateIs2DaysInFuture } from 'marketplace/components/validators'
import BuyerTrainingIntroductionStage from './BuyerTrainingIntroductionStage'
import BuyerTrainingAboutStage, { done as aboutDone } from './BuyerTrainingAboutStage'
import BuyerTrainingSelectStage, { done as selectDone } from './BuyerTrainingSelectStage'
import BuyerTrainingRequirementsStage, { done as requirementsDone } from './BuyerTrainingRequirementsStage'
import BuyerTrainingReviewStage from './BuyerTrainingReviewStage'
import BuyerTrainingAdditionalInformationStage, {
  done as additionalInformationDone
} from './BuyerTrainingAdditionalInformationStage'
import BuyerTrainingResponseFormatsStage, { done as responseFormatDone } from './BuyerTrainingResponseFormatsStage'
import BuyerTrainingTimeframesAndBudgetStage, {
  done as timeframesAndBudgetDone
} from './BuyerTrainingTimeframesAndBudgetStage'
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
    isDone: selectDone
  },
  {
    slug: 'about',
    title: 'About',
    component: BuyerTrainingAboutStage,
    isDone: aboutDone
  },
  {
    slug: 'formats',
    title: 'Response formats',
    component: BuyerTrainingResponseFormatsStage,
    isDone: responseFormatDone
  },
  {
    slug: 'requirements',
    title: 'Requirements',
    component: BuyerTrainingRequirementsStage,
    isDone: requirementsDone
  },
  {
    slug: 'timeframes',
    title: 'Timeframes and budget',
    component: BuyerTrainingTimeframesAndBudgetStage,
    isDone: timeframesAndBudgetDone
  },
  {
    slug: 'criteria',
    title: 'Evaluation criteria',
    component: BuyerEvaluationCriteriaStage,
    isDone: evaluationDone
  },
  {
    slug: 'additional',
    title: 'Additional information',
    component: BuyerTrainingAdditionalInformationStage,
    isDone: additionalInformationDone
  },
  {
    slug: 'review',
    title: 'Review and publish',
    component: BuyerTrainingReviewStage
  }
]

export default BuyerTrainingStages
