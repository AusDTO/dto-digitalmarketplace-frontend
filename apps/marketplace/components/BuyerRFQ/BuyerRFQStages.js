import BuyerRFQIntroductionStage from './BuyerRFQIntroductionStage'
import BuyerRFQSelectStage from './BuyerRFQSelectStage'
import BuyerRFQReviewStage from './BuyerRFQReviewStage'

const BuyerRFQStages = [
  {
    slug: 'introduction',
    title: 'Introduction',
    component: BuyerRFQIntroductionStage
  },
  {
    slug: 'select',
    title: 'Select sellers',
    component: BuyerRFQSelectStage
  },
  {
    slug: 'review',
    title: 'Review email',
    component: BuyerRFQReviewStage
  }
]

export default BuyerRFQStages
