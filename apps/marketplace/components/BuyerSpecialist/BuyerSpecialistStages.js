import BuyerSpecialistIntroductionStage from './BuyerSpecialistIntroductionStage'
import BuyerSpecialistAboutStage, { done as aboutDone } from './BuyerSpecialistAboutStage'
import BuyerSpecialistSelectStage, { done as selectDone } from './BuyerSpecialistSelectStage'
import BuyerSpecialistAdditionalInformationStage, {
  done as additionalDone
} from './BuyerSpecialistAdditionalInformationStage'
import BuyerSpecialistReviewStage from './BuyerSpecialistReviewStage'
import BuyerSpecialistResponseFormatsStage, { done as responseFormatDone } from './BuyerSpecialistResponseFormatsStage'
import BuyerSpecialistTimeframesAndBudgetStage, {
  done as timeframesDone
} from './BuyerSpecialistTimeframesAndBudgetStage'
import BuyerEvaluationCriteriaStage, { done as evaluationDone } from '../BuyerBriefFlow/BuyerEvaluationCriteriaStage'

const BuyerSpecialistStages = [
  {
    slug: 'introduction',
    title: 'Introduction',
    component: BuyerSpecialistIntroductionStage,
    isDone: () => true
  },
  {
    slug: 'about',
    title: 'About',
    component: BuyerSpecialistAboutStage,
    isDone: aboutDone
  },
  {
    slug: 'select',
    title: 'Who can respond?',
    component: BuyerSpecialistSelectStage,
    isDone: selectDone
  },
  {
    slug: 'criteria',
    title: 'Evaluation criteria',
    component: BuyerEvaluationCriteriaStage,
    isDone: evaluationDone
  },
  {
    slug: 'formats',
    title: 'Seller responses',
    component: BuyerSpecialistResponseFormatsStage,
    isDone: responseFormatDone
  },
  {
    slug: 'timeframes',
    title: 'Timeframes',
    component: BuyerSpecialistTimeframesAndBudgetStage,
    isDone: timeframesDone
  },
  {
    slug: 'additional',
    title: 'Additional information',
    component: BuyerSpecialistAdditionalInformationStage,
    isDone: additionalDone
  },
  {
    slug: 'review',
    title: 'Review and publish',
    component: BuyerSpecialistReviewStage
  }
]

export default BuyerSpecialistStages
